# HUMToken Backend API

This backend provides REST API endpoints for interacting with the HUMToken smart contract.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```env
# Network configuration
NETWORK_URL=https://bsc-dataseed1.binance.org/
# NETWORK_URL=https://data-seed-prebsc-1-s1.binance.org:8545/  # For BSC testnet

# HUMToken contract address (deploy the contract first and add the address here)
HUM_TOKEN_ADDRESS=0x0000000000000000000000000000000000000000

# Server configuration
PORT=3001
```

3. Start the server:
```bash
npm start
```

## API Endpoints

### GET /api/token/info
Returns basic information about the HUMToken contract.

**Response:**
```json
{
  "name": "HUM Token",
  "symbol": "HUM",
  "decimals": "18",
  "totalSupply": "10000000000000000000000000000",
  "treasury": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "feeBasisPoints": "150",
  "maxWalletSize": "500000000000000000000000000",
  "maxTxAmount": "100000000000000000000000000"
}
```

### GET /api/token/balance/:address
Returns the HUM token balance for a specific address.

**Parameters:**
- `address`: The wallet address to check

**Response:**
```json
{
  "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "balance": "10000000000000000000000000000"
}
```

### GET /api/token/allowance/:owner/:spender
Returns the allowance amount for a spender from an owner.

**Parameters:**
- `owner`: The token owner address
- `spender`: The spender address

**Response:**
```json
{
  "owner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "spender": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "allowance": "1000000000000000000000000000"
}
```

## Dependencies

- `express`: Web framework
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variable management
- `ethers`: Ethereum library for interacting with smart contracts 