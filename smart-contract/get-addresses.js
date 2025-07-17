const { ethers } = require('hardhat');

async function main() {
  console.log('Hardhat Default Account Addresses:');
  console.log('==================================');
  
  // Get all signers
  const signers = await ethers.getSigners();
  
  // Display the first 5 accounts
  for (let i = 0; i < Math.min(5, signers.length); i++) {
    const signer = signers[i];
    console.log(`Account ${i}: ${signer.address}`);
  }
  
  console.log('\nUse any of these addresses in your dashboard!');
  console.log('Note: These are test accounts with pre-funded ETH on localhost.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});