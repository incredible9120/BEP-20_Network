# Troubleshooting Guide

## Contract Connection Error

The error you're seeing indicates that the backend cannot connect to your HUMToken contract. This guide will help you resolve this issue.

### Error Analysis

```
Error fetching token info: Error: could not decode result data (value="0x", info={ "method": "name", "signature": "name()" }, code=BAD_DATA, version=6.15.0)
```

This error means:
- The contract call is returning an empty response (`0x`)
- The contract either doesn't exist at the specified address
- Or the contract exists but doesn't have the expected methods

## Step-by-Step Resolution

### Step 1: Check Environment Variables

First, ensure your backend has the correct environment variables set.

1. **Create a `.env` file in the backend directory:**
```bash
cd backend
touch .env
```

2. **Add the required variables:**
```env
# Network Configuration
NETWORK_URL=https://bsc-dataseed1.binance.org/

# HUMToken Contract Address
HUM_TOKEN_ADDRESS=0xYourDeployedContractAddressHere

# Server Configuration
PORT=3001
```

### Step 2: Deploy the Contract (If Not Already Deployed)

If you haven't deployed the contract yet, follow these steps:

1. **Navigate to the smart contract directory:**
```bash
cd smart-contract
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up your private key:**
```bash
# Create .env file
echo "PRIVATE_KEY=your_private_key_here" > .env
```

4. **Deploy to testnet (recommended first):**
```bash
npx hardhat run deploy-and-verify.js --network bscTestnet
```

5. **Or deploy to mainnet:**
```bash
npx hardhat run deploy-and-verify.js --network bsc
```

### Step 3: Verify Deployment

Use the verification script to check if your contract is properly deployed:

```bash
cd backend
node verify-deployment.js
```

This script will:
- Check if environment variables are set
- Verify network connectivity
- Confirm contract exists at the address
- Test all contract methods

### Step 4: Common Issues and Solutions

#### Issue 1: Contract Not Deployed
**Symptoms:** Verification script shows "No contract found at the specified address"

**Solutions:**
1. Deploy the contract using the deployment script
2. Check if you're using the correct network
3. Verify the contract address is correct

#### Issue 2: Wrong Network
**Symptoms:** Contract exists but methods return errors

**Solutions:**
1. Ensure `NETWORK_URL` matches the deployment network
2. For BSC Mainnet: `https://bsc-dataseed1.binance.org/`
3. For BSC Testnet: `https://data-seed-prebsc-1-s1.binance.org:8545/`

#### Issue 3: Insufficient Balance
**Symptoms:** Deployment fails with "insufficient funds"

**Solutions:**
1. Add BNB to your deployer wallet
2. For testnet, get test BNB from a faucet
3. For mainnet, purchase BNB from an exchange

#### Issue 4: Invalid Private Key
**Symptoms:** Deployment fails with authentication errors

**Solutions:**
1. Check your private key format (64 characters, no 0x prefix)
2. Ensure the private key corresponds to the deployer address
3. Never share your private key

### Step 5: Testing the Setup

After resolving the deployment issues:

1. **Start the backend:**
```bash
cd backend
npm start
```

2. **Start the frontend:**
```bash
cd frontend
npm start
```

3. **Test the dashboard:**
- Check if token information loads
- Test balance checking
- Test allowance verification

## Quick Fix Commands

### For Testnet Deployment:
```bash
# 1. Set up environment
cd smart-contract
echo "PRIVATE_KEY=your_private_key" > .env

# 2. Deploy contract
npx hardhat run deploy-and-verify.js --network bscTestnet

# 3. Verify deployment
cd ../backend
node verify-deployment.js

# 4. Start servers
npm start
```

### For Mainnet Deployment:
```bash
# 1. Set up environment
cd smart-contract
echo "PRIVATE_KEY=your_private_key" > .env

# 2. Deploy contract
npx hardhat run deploy-and-verify.js --network bsc

# 3. Verify deployment
cd ../backend
node verify-deployment.js

# 4. Start servers
npm start
```

## Environment Variables Reference

### Backend (.env)
```env
# Required
NETWORK_URL=https://bsc-dataseed1.binance.org/
HUM_TOKEN_ADDRESS=0xYourContractAddress

# Optional
PORT=3001
```

### Smart Contract (.env)
```env
# Required
PRIVATE_KEY=your_64_character_private_key_without_0x_prefix
```

## Network Configuration

### BSC Mainnet
- **RPC URL**: `https://bsc-dataseed1.binance.org/`
- **Chain ID**: 56
- **Explorer**: https://bscscan.com/

### BSC Testnet
- **RPC URL**: `https://data-seed-prebsc-1-s1.binance.org:8545/`
- **Chain ID**: 97
- **Explorer**: https://testnet.bscscan.com/

## Security Notes

1. **Never commit private keys** to version control
2. **Use testnet first** before mainnet deployment
3. **Keep deployment information** secure
4. **Verify contracts** on BSCScan after deployment

## Getting Help

If you're still experiencing issues:

1. **Check the verification script output** for specific error messages
2. **Verify network connectivity** by testing the RPC URL
3. **Ensure sufficient balance** for deployment
4. **Double-check contract address** format and validity

## Expected Output

After successful deployment and setup, you should see:

```
🎉 Deployment completed successfully!

📊 Deployment Summary:
Contract Address: 0x1234...5678
Network: bsc (Chain ID: 56)
Token: HUM Token (HUM)
Total Supply: 10000000000 HUM
Treasury: 0xabcd...efgh
```

And the verification script should show:

```
✅ name(): "HUM Token"
✅ symbol(): "HUM"
✅ decimals(): 18
✅ totalSupply(): 10000000000 HUM
✅ treasury(): 0xabcd...efgh
✅ feeBasisPoints(): 150 (1.5%)
✅ maxWalletSize(): 500000000 HUM
✅ maxTxAmount(): 100000000 HUM
``` 