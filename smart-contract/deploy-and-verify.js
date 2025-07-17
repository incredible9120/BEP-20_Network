const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('🚀 Starting HUMToken deployment...\n');

  // Get signers
  const [deployer, treasurySigner] = await ethers.getSigners();
  
  console.log('📋 Deployment Configuration:');
  console.log(`Deployer: ${deployer.address}`);
  console.log(`Treasury: ${treasurySigner.address}`);
  console.log(`Network: ${(await ethers.provider.getNetwork()).name}`);
  console.log('');

  // Check deployer balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`💰 Deployer balance: ${ethers.formatEther(balance)} BNB`);

  if (balance < ethers.parseEther('0.01')) {
    console.error('❌ Insufficient balance for deployment. Need at least 0.01 BNB');
    return;
  }

  // Deployment parameters
  const initialSupply = ethers.parseUnits("10000000000", 18); // 10 billion HUM
  const maxWalletSize = initialSupply / 20n; // 5% of supply
  const maxTxAmount = initialSupply / 100n; // 1% of supply

  console.log('\n📊 Token Parameters:');
  console.log(`Initial Supply: ${ethers.formatUnits(initialSupply, 18)} HUM`);
  console.log(`Max Wallet Size: ${ethers.formatUnits(maxWalletSize, 18)} HUM (5% of supply)`);
  console.log(`Max Transaction: ${ethers.formatUnits(maxTxAmount, 18)} HUM (1% of supply)`);
  console.log('');

  try {
    // Deploy contract
    console.log('🔨 Deploying HUMToken contract...');
    const HUMToken = await ethers.getContractFactory("HUMToken");
    const humToken = await HUMToken.deploy(
      treasurySigner.address,
      initialSupply,
      maxWalletSize,
      maxTxAmount
    );

    console.log('⏳ Waiting for deployment confirmation...');
    await humToken.waitForDeployment();

    const contractAddress = await humToken.getAddress();
    console.log(`✅ HUMToken deployed to: ${contractAddress}`);

    // Verify deployment
    console.log('\n🔍 Verifying deployment...');
    const code = await ethers.provider.getCode(contractAddress);
    if (code === '0x') {
      console.error('❌ Contract deployment verification failed');
      return;
    }
    console.log('✅ Contract code verified');

    // Test contract methods
    console.log('\n🧪 Testing contract methods...');
    
    const name = await humToken.name();
    console.log(`✅ name(): "${name}"`);

    const symbol = await humToken.symbol();
    console.log(`✅ symbol(): "${symbol}"`);

    const decimals = await humToken.decimals();
    console.log(`✅ decimals(): ${decimals}`);

    const totalSupply = await humToken.totalSupply();
    console.log(`✅ totalSupply(): ${ethers.formatUnits(totalSupply, 18)} HUM`);

    const treasury = await humToken.treasury();
    console.log(`✅ treasury(): ${treasury}`);

    const feeBasisPoints = await humToken.feeBasisPoints();
    console.log(`✅ feeBasisPoints(): ${feeBasisPoints} (${feeBasisPoints / 100}%)`);

    const maxWallet = await humToken.maxWalletSize();
    console.log(`✅ maxWalletSize(): ${ethers.formatUnits(maxWallet, 18)} HUM`);

    const maxTx = await humToken.maxTxAmount();
    console.log(`✅ maxTxAmount(): ${ethers.formatUnits(maxTx, 18)} HUM`);

    // Get network info
    const network = await ethers.provider.getNetwork();
    const networkName = network.name === 'unknown' ? 'local' : network.name;
    const networkUrl = network.chainId === 56 ? 'https://bsc-dataseed1.binance.org/' :
                      network.chainId === 97 ? 'https://data-seed-prebsc-1-s1.binance.org:8545/' :
                      'http://localhost:8545';

    // Create deployment info
    const deploymentInfo = {
      contractAddress: contractAddress,
      deployer: deployer.address,
      treasury: treasurySigner.address,
      network: {
        name: networkName,
        chainId: network.chainId,
        url: networkUrl
      },
      token: {
        name: name,
        symbol: symbol,
        decimals: decimals,
        totalSupply: totalSupply.toString(),
        feeBasisPoints: feeBasisPoints.toString(),
        maxWalletSize: maxWallet.toString(),
        maxTxAmount: maxTx.toString()
      },
      deploymentTime: new Date().toISOString()
    };

    // Save deployment info
    const deploymentPath = path.join(__dirname, 'deployment-info.json');
    fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
    console.log(`\n💾 Deployment info saved to: ${deploymentPath}`);

    // Create backend .env file
    const backendEnvPath = path.join(__dirname, '..', 'backend', '.env');
    const envContent = `# Network Configuration
NETWORK_URL=${networkUrl}

# HUMToken Contract Address
HUM_TOKEN_ADDRESS=${contractAddress}

# Server Configuration
PORT=3001
`;

    fs.writeFileSync(backendEnvPath, envContent);
    console.log(`\n📝 Backend .env file created: ${backendEnvPath}`);

    // Display next steps
    console.log('\n🎉 Deployment completed successfully!');
    console.log('\n📋 Next Steps:');
    console.log('1. Start the backend server: cd backend && npm start');
    console.log('2. Start the frontend: cd frontend && npm start');
    console.log('3. Test the dashboard functionality');
    console.log('\n🔗 Contract Explorer Links:');
    
    if (network.chainId === 56) {
      console.log(`BSCScan: https://bscscan.com/address/${contractAddress}`);
    } else if (network.chainId === 97) {
      console.log(`BSCScan Testnet: https://testnet.bscscan.com/address/${contractAddress}`);
    }

    console.log('\n📊 Deployment Summary:');
    console.log(`Contract Address: ${contractAddress}`);
    console.log(`Network: ${networkName} (Chain ID: ${network.chainId})`);
    console.log(`Token: ${name} (${symbol})`);
    console.log(`Total Supply: ${ethers.formatUnits(totalSupply, 18)} ${symbol}`);
    console.log(`Treasury: ${treasury}`);

  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    console.log('\nPossible solutions:');
    console.log('1. Check your private key');
    console.log('2. Ensure sufficient BNB balance');
    console.log('3. Verify network configuration');
    console.log('4. Check for compilation errors');
  }
}

main().catch((error) => {
  console.error('❌ Script failed:', error);
  process.exitCode = 1;
}); 