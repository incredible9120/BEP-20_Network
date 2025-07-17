require('dotenv').config();
const { ethers } = require('ethers');

// HUMToken contract ABI (simplified for verification)
const HUM_TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function treasury() view returns (address)",
  "function feeBasisPoints() view returns (uint256)",
  "function maxWalletSize() view returns (uint256)",
  "function maxTxAmount() view returns (uint256)"
];

async function verifyDeployment() {
  console.log('🔍 Verifying HUMToken deployment...\n');

  // Check environment variables
  if (!process.env.NETWORK_URL) {
    console.error('❌ NETWORK_URL not found in environment variables');
    console.log('Please set NETWORK_URL in your .env file');
    return;
  }

  if (!process.env.HUM_TOKEN_ADDRESS) {
    console.error('❌ HUM_TOKEN_ADDRESS not found in environment variables');
    console.log('Please set HUM_TOKEN_ADDRESS in your .env file');
    return;
  }

  console.log(`🌐 Network URL: ${process.env.NETWORK_URL}`);
  console.log(`📋 Contract Address: ${process.env.HUM_TOKEN_ADDRESS}\n`);

  try {
    // Initialize provider
    const provider = new ethers.JsonRpcProvider(process.env.NETWORK_URL);
    
    // Check network connection
    const network = await provider.getNetwork();
    console.log(`🔗 Connected to network: ${network.name} (Chain ID: ${network.chainId})`);

    // Check if contract address is valid
    if (!ethers.isAddress(process.env.HUM_TOKEN_ADDRESS)) {
      console.error('❌ Invalid contract address format');
      return;
    }

    // Check if contract exists at the address
    const code = await provider.getCode(process.env.HUM_TOKEN_ADDRESS);
    if (code === '0x') {
      console.error('❌ No contract found at the specified address');
      console.log('This could mean:');
      console.log('1. The contract has not been deployed yet');
      console.log('2. The contract address is incorrect');
      console.log('3. You are connected to the wrong network');
      return;
    }

    console.log('✅ Contract found at the specified address');

    // Initialize contract
    const humTokenContract = new ethers.Contract(process.env.HUM_TOKEN_ADDRESS, HUM_TOKEN_ABI, provider);

    // Test contract methods
    console.log('\n🧪 Testing contract methods...\n');

    try {
      const name = await humTokenContract.name();
      console.log(`✅ name(): "${name}"`);
    } catch (error) {
      console.error(`❌ name(): ${error.message}`);
    }

    try {
      const symbol = await humTokenContract.symbol();
      console.log(`✅ symbol(): "${symbol}"`);
    } catch (error) {
      console.error(`❌ symbol(): ${error.message}`);
    }

    try {
      const decimals = await humTokenContract.decimals();
      console.log(`✅ decimals(): ${decimals}`);
    } catch (error) {
      console.error(`❌ decimals(): ${error.message}`);
    }

    try {
      const totalSupply = await humTokenContract.totalSupply();
      console.log(`✅ totalSupply(): ${ethers.formatUnits(totalSupply, 18)} HUM`);
    } catch (error) {
      console.error(`❌ totalSupply(): ${error.message}`);
    }

    try {
      const treasury = await humTokenContract.treasury();
      console.log(`✅ treasury(): ${treasury}`);
    } catch (error) {
      console.error(`❌ treasury(): ${error.message}`);
    }

    try {
      const feeBasisPoints = await humTokenContract.feeBasisPoints();
      console.log(`✅ feeBasisPoints(): ${feeBasisPoints} (${feeBasisPoints / 100}%)`);
    } catch (error) {
      console.error(`❌ feeBasisPoints(): ${error.message}`);
    }

    try {
      const maxWalletSize = await humTokenContract.maxWalletSize();
      console.log(`✅ maxWalletSize(): ${ethers.formatUnits(maxWalletSize, 18)} HUM`);
    } catch (error) {
      console.error(`❌ maxWalletSize(): ${error.message}`);
    }

    try {
      const maxTxAmount = await humTokenContract.maxTxAmount();
      console.log(`✅ maxTxAmount(): ${ethers.formatUnits(maxTxAmount, 18)} HUM`);
    } catch (error) {
      console.error(`❌ maxTxAmount(): ${error.message}`);
    }

    console.log('\n🎉 Deployment verification completed!');

  } catch (error) {
    console.error('❌ Error during verification:', error.message);
    console.log('\nPossible solutions:');
    console.log('1. Check your network URL');
    console.log('2. Ensure the contract is deployed');
    console.log('3. Verify the contract address');
    console.log('4. Check network connectivity');
  }
}

// Run verification
verifyDeployment().catch(console.error); 