# HUMToken Deployment Guide

This guide will help you deploy the HUMToken contract to the Binance Smart Chain (BSC).

## Prerequisites

1. **Node.js and npm** installed
2. **MetaMask** or similar wallet with BSC network configured
3. **BNB** for gas fees (mainnet) or test BNB (testnet)
4. **Private key** or mnemonic phrase for deployment

## Network Configuration

### BSC Mainnet
- **Network Name**: BSC Mainnet
- **RPC URL**: https://bsc-dataseed1.binance.org/
- **Chain ID**: 56
- **Currency Symbol**: BNB
- **Block Explorer**: https://bscscan.com/

### BSC Testnet
- **Network Name**: BSC Testnet
- **RPC URL**: https://data-seed-prebsc-1-s1.binance.org:8545/
- **Chain ID**: 97
- **Currency Symbol**: tBNB
- **Block Explorer**: https://testnet.bscscan.com/

## Setup Steps

### 1. Install Dependencies
```bash
cd smart-contract
npm install
```

### 2. Configure Hardhat

Edit `hardhat.config.js` to add your network configuration:

```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    bsc: {
      url: "https://bsc-dataseed1.binance.org/",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 56
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 97
    }
  }
};
```

### 3. Set Environment Variables

Create a `.env` file in the smart-contract directory:

```env
PRIVATE_KEY=your_private_key_here
```

**⚠️ Security Warning**: Never commit your private key to version control!

### 4. Configure Deployment Parameters

Edit `scripts/deploy.js` to set your deployment parameters:

```javascript
const treasury = "0xYourTreasuryAddress"; // Treasury wallet address
const initialSupply = hre.ethers.utils.parseUnits("10000000000", 18); // 10 billion HUM
const maxWalletSize = initialSupply.div(20); // 5% of supply
const maxTxAmount = initialSupply.div(100); // 1% of supply
```

### 5. Compile the Contract
```bash
npx hardhat compile
```

### 6. Deploy to Testnet (Recommended First)
```bash
npx hardhat run scripts/deploy.js --network bscTestnet
```

### 7. Deploy to Mainnet
```bash
npx hardhat run scripts/deploy.js --network bsc
```

## Deployment Output

After successful deployment, you'll see output like:
```
Deploying contracts with the account: 0xYourDeployerAddress
HUMToken deployed to: 0xYourContractAddress
```

## Post-Deployment Steps

### 1. Verify Contract on BSCScan

1. Go to [BSCScan](https://bscscan.com/) (mainnet) or [BSCScan Testnet](https://testnet.bscscan.com/)
2. Search for your contract address
3. Click "Contract" tab
4. Click "Verify and Publish"
5. Select "Solidity (Single file)"
6. Enter compiler version: `0.8.19`
7. Upload your contract source code
8. Verify the contract

### 2. Update Backend Configuration

Update your backend `.env` file with the deployed contract address:

```env
HUM_TOKEN_ADDRESS=0xYourDeployedContractAddress
```

### 3. Test the Contract

Use the frontend dashboard to test:
- Token information retrieval
- Balance checking
- Allowance verification

## Contract Verification

### Constructor Arguments
When verifying on BSCScan, you'll need to provide constructor arguments:

```javascript
[
  "0xYourTreasuryAddress",
  "10000000000000000000000000000", // 10 billion in wei
  "500000000000000000000000000",   // 5% of supply
  "100000000000000000000000000"    // 1% of supply
]
```

### ABI
The contract ABI will be available in `artifacts/contracts/HUMToken.sol/HUMToken.json`

## Security Considerations

1. **Treasury Address**: Choose a secure, multi-signature wallet for treasury
2. **Private Key Security**: Use hardware wallets or secure key management
3. **Test Thoroughly**: Always test on testnet before mainnet deployment
4. **Audit**: Consider professional security audit for mainnet deployment
5. **Backup**: Keep secure backups of deployment information

## Troubleshooting

### Common Issues

1. **Insufficient Gas**: Ensure you have enough BNB for deployment
2. **Network Issues**: Verify RPC URL and network configuration
3. **Compilation Errors**: Check Solidity version compatibility
4. **Verification Failures**: Ensure constructor arguments match deployment

### Support

For deployment issues:
1. Check Hardhat documentation
2. Verify network configuration
3. Ensure sufficient gas fees
4. Review contract compilation output

---

**Happy Deploying! 🚀** 