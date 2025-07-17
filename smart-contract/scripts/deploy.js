const { ethers } = require('hardhat');

async function main() {
  const [deployer, treasurySigner] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const treasury = treasurySigner.address;
  const initialSupply = ethers.parseUnits("10000000000", 18); // 1e10 HUM, 18 decimals
  const maxWalletSize = initialSupply / 20n; // 5% of supply
  const maxTxAmount = initialSupply / 100n; // 1% of supply

  const HUMToken = await ethers.getContractFactory("HUMToken");
  const hum = await HUMToken.deploy(treasury, initialSupply, maxWalletSize, maxTxAmount);
  await hum.waitForDeployment();

  console.log("HUMToken deployed to:", await hum.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
