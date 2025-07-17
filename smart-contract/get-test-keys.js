const { ethers } = require('hardhat');

async function main() {
  console.log('Hardhat Default Account Private Keys (FOR TESTING ONLY):');
  console.log('=======================================================');
  
  // Hardhat's default private keys
  const privateKeys = [
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
    '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
    '0x7c852118e8d7e3b581f6d8c1c4b0b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b',
    '0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a'
  ];
  
  const addresses = [
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65'
  ];
  
  for (let i = 0; i < 5; i++) {
    console.log(`Account ${i}:`);
    console.log(`  Address: ${addresses[i]}`);
    console.log(`  Private Key: ${privateKeys[i]}`);
    console.log('');
  }
  
  console.log('⚠️  WARNING: These are test private keys for localhost only!');
  console.log('   Never use these keys on mainnet or any real network!');
  console.log('');
  console.log('💡 Usage: Copy the private key and use it in the transfer form.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 