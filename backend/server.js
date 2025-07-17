require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');

const app = express();
app.use(cors());
app.use(express.json());

// HUMToken contract ABI (simplified for basic operations)
const HUM_TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function treasury() view returns (address)",
  "function feeBasisPoints() view returns (uint256)",
  "function maxWalletSize() view returns (uint256)",
  "function maxTxAmount() view returns (uint256)"
];

// Initialize provider and contract
let provider, humTokenContract;

if (process.env.NETWORK_URL && process.env.HUM_TOKEN_ADDRESS) {
  provider = new ethers.JsonRpcProvider(process.env.NETWORK_URL);
  humTokenContract = new ethers.Contract(process.env.HUM_TOKEN_ADDRESS, HUM_TOKEN_ABI, provider);
}

// HUMToken endpoints
app.get('/api/token/info', async (req, res) => {
  try {
    if (!humTokenContract) {
      return res.status(500).json({ error: 'Contract not initialized' });
    }

    const [name, symbol, decimals, totalSupply, treasury, feeBasisPoints, maxWalletSize, maxTxAmount] = await Promise.all([
      humTokenContract.name(),
      humTokenContract.symbol(),
      humTokenContract.decimals(),
      humTokenContract.totalSupply(),
      humTokenContract.treasury(),
      humTokenContract.feeBasisPoints(),
      humTokenContract.maxWalletSize(),
      humTokenContract.maxTxAmount()
    ]);

    res.json({
      name,
      symbol,
      decimals: decimals.toString(),
      totalSupply: totalSupply.toString(),
      treasury,
      feeBasisPoints: feeBasisPoints.toString(),
      maxWalletSize: maxWalletSize.toString(),
      maxTxAmount: maxTxAmount.toString()
    });
  } catch (error) {
    console.error('Error fetching token info:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/token/balance/:address', async (req, res) => {
  try {
    if (!humTokenContract) {
      return res.status(500).json({ error: 'Contract not initialized' });
    }

    const { address } = req.params;
    
    // Validate address format
    if (!address || address.length !== 42 || !address.startsWith('0x')) {
      return res.status(400).json({ 
        error: 'Invalid address format. Please provide a valid Ethereum address (42 characters starting with 0x)',
        hint: 'You might have entered a private key instead of an address. Private keys are 64 characters long.'
      });
    }
    
    // Check if address is valid using ethers
    try {
      ethers.getAddress(address); // This will throw if invalid
    } catch (error) {
      return res.status(400).json({ 
        error: 'Invalid Ethereum address',
        hint: 'Please check the address format and try again.'
      });
    }
    
    const balance = await humTokenContract.balanceOf(address);
    
    res.json({ 
      address, 
      balance: balance.toString() 
    });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/token/allowance/:owner/:spender', async (req, res) => {
  try {
    if (!humTokenContract) {
      return res.status(500).json({ error: 'Contract not initialized' });
    }

    const { owner, spender } = req.params;
    
    // Validate address formats
    const validateAddress = (address, name) => {
      if (!address || address.length !== 42 || !address.startsWith('0x')) {
        throw new Error(`Invalid ${name} address format. Please provide a valid Ethereum address (42 characters starting with 0x)`);
      }
      try {
        ethers.getAddress(address);
      } catch (error) {
        throw new Error(`Invalid ${name} Ethereum address`);
      }
    };
    
    validateAddress(owner, 'owner');
    validateAddress(spender, 'spender');
    
    const allowance = await humTokenContract.allowance(owner, spender);
    
    res.json({ 
      owner, 
      spender, 
      allowance: allowance.toString() 
    });
  } catch (error) {
    console.error('Error fetching allowance:', error);
    res.status(500).json({ error: error.message });
  }
});

// Transfer tokens endpoint
app.post('/api/token/transfer', async (req, res) => {
  try {
    if (!humTokenContract) {
      return res.status(500).json({ error: 'Contract not initialized' });
    }

    const { fromAddress, toAddress, amount, privateKey } = req.body;
    
    // Validate required fields
    if (!fromAddress || !toAddress || !amount || !privateKey) {
      return res.status(400).json({ 
        error: 'Missing required fields: fromAddress, toAddress, amount, privateKey' 
      });
    }
    
    // Validate address formats
    const validateAddress = (address, name) => {
      if (!address || address.length !== 42 || !address.startsWith('0x')) {
        throw new Error(`Invalid ${name} address format`);
      }
      try {
        ethers.getAddress(address);
      } catch (error) {
        throw new Error(`Invalid ${name} Ethereum address`);
      }
    };
    
    validateAddress(fromAddress, 'from');
    validateAddress(toAddress, 'to');
    
    // Validate amount
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      return res.status(400).json({ error: 'Invalid amount. Must be a positive number.' });
    }
    
    // Create wallet from private key
    let wallet;
    try {
      wallet = new ethers.Wallet(privateKey, provider);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid private key' });
    }
    
    // Check if wallet address matches fromAddress
    if (wallet.address.toLowerCase() !== fromAddress.toLowerCase()) {
      return res.status(400).json({ error: 'Private key does not match the from address' });
    }
    
    // Check balance
    const balance = await humTokenContract.balanceOf(fromAddress);
    const amountInWei = ethers.parseUnits(amount.toString(), 18);
    
    if (balance < amountInWei) {
      return res.status(400).json({ 
        error: 'Insufficient balance',
        balance: ethers.formatUnits(balance, 18),
        requested: amount
      });
    }
    
    // Create contract instance with signer
    const contractWithSigner = humTokenContract.connect(wallet);
    
    // Execute transfer
    const tx = await contractWithSigner.transfer(toAddress, amountInWei);
    await tx.wait();
    
    res.json({ 
      success: true,
      transactionHash: tx.hash,
      from: fromAddress,
      to: toAddress,
      amount: amount,
      message: 'Transfer completed successfully!'
    });
    
  } catch (error) {
    console.error('Error transferring tokens:', error);
    res.status(500).json({ 
      error: error.message,
      hint: 'Make sure you have sufficient balance and the addresses are correct.'
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`HUMToken API server running on port ${PORT}`);
  if (humTokenContract) {
    console.log(`Connected to HUMToken at: ${process.env.HUM_TOKEN_ADDRESS}`);
  } else {
    console.log('Warning: HUMToken contract not initialized. Set NETWORK_URL and HUM_TOKEN_ADDRESS in .env');
  }
}); 