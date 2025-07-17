# HUM Token (BEP-20) Project

A complete BEP-20 token implementation with automated fee collection, transaction limits, and a modern web interface.

## 🚀 Features

### Smart Contract (HUMToken.sol)
- **Standard BEP-20/ERC-20 Compliance**: Full implementation of the standard token interface
- **Automated Fee Collection**: 1.5% fee automatically sent to treasury wallet on transfers
- **Transaction Limits**: Configurable maximum transaction and wallet size limits
- **Minting & Burning**: Owner can mint new tokens, users can burn their own tokens
- **Ownership Management**: Treasury wallet controls contract parameters
- **Event Logging**: Comprehensive event emission for transparency

### Backend API
- **RESTful Endpoints**: Clean API for token information, balances, and allowances
- **Blockchain Integration**: Direct interaction with BSC network
- **Error Handling**: Robust error handling and validation
- **Environment Configuration**: Flexible configuration for different networks

### Frontend Dashboard
- **Modern UI**: Beautiful, responsive design with gradient backgrounds
- **Real-time Data**: Live token information and balance checking
- **User-friendly Interface**: Easy-to-use forms for address queries
- **Mobile Responsive**: Works perfectly on all device sizes
- **Feature Showcase**: Highlights all token capabilities

## 📁 Project Structure

```
simple-smart-contract/
├── smart-contract/          # Solidity smart contract
│   ├── contracts/
│   │   └── HUMToken.sol     # Main token contract
│   ├── scripts/
│   │   └── deploy.js        # Deployment script
│   └── hardhat.config.js    # Hardhat configuration
├── backend/                 # Node.js API server
│   ├── server.js           # Express server with HUMToken endpoints
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend documentation
└── frontend/               # React web application
    ├── src/
    │   ├── components/
    │   │   ├── HUMTokenDashboard.js    # Main dashboard component
    │   │   └── HUMTokenDashboard.css   # Dashboard styling
    │   ├── api.js           # API integration functions
    │   └── App.js           # Main React app
    └── package.json         # Frontend dependencies
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MetaMask or similar Web3 wallet
- BSC network access (mainnet or testnet)

### 1. Smart Contract Setup

```bash
cd smart-contract
npm install
```

Configure your network in `hardhat.config.js` and deploy:

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network <your-network>
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:
```env
NETWORK_URL=https://bsc-dataseed1.binance.org/
HUM_TOKEN_ADDRESS=<your-deployed-contract-address>
PORT=3001
```

Start the server:
```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The application will be available at `http://localhost:3000`

## 🔧 Configuration

### Token Parameters
- **Initial Supply**: 10,000,000,000 HUM (10 billion)
- **Decimals**: 18
- **Fee Rate**: 1.5% (150 basis points)
- **Max Wallet Size**: 5% of total supply (default)
- **Max Transaction**: 1% of total supply (default)

### Network Configuration
- **Mainnet**: BSC (Binance Smart Chain)
- **Testnet**: BSC Testnet
- **Development**: Hardhat local network

## 📊 API Endpoints

### Token Information
- `GET /api/token/info` - Get token details
- `GET /api/token/balance/:address` - Check wallet balance
- `GET /api/token/allowance/:owner/:spender` - Check allowance

## 🎨 UI Features

### Dashboard Sections
1. **Token Information**: Basic token details and configuration
2. **Balance Checker**: Query any wallet's HUM token balance
3. **Allowance Checker**: Verify token allowances between addresses
4. **Feature Showcase**: Highlight key token capabilities

### Design Highlights
- **Gradient Backgrounds**: Modern purple-blue gradients
- **Card-based Layout**: Clean, organized information display
- **Interactive Elements**: Hover effects and smooth transitions
- **Responsive Design**: Mobile-first approach
- **Error Handling**: User-friendly error messages

## 🔒 Security Features

### Smart Contract Security
- **Ownership Controls**: Only treasury can modify parameters
- **Transaction Limits**: Prevents large transfers and whale manipulation
- **Fee Validation**: Maximum fee cap of 5%
- **Address Validation**: Zero address checks
- **Reentrancy Protection**: Standard OpenZeppelin security

### Application Security
- **Input Validation**: Server-side validation of all inputs
- **Error Handling**: Graceful error handling without exposing internals
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Environment Variables**: Secure configuration management

## 🚀 Deployment

### Smart Contract Deployment
1. Configure network in `hardhat.config.js`
2. Set up private key or mnemonic
3. Run deployment script
4. Verify contract on BSCScan

### Backend Deployment
1. Set up environment variables
2. Deploy to your preferred hosting service
3. Configure domain and SSL

### Frontend Deployment
1. Build the React application
2. Deploy to static hosting (Netlify, Vercel, etc.)
3. Update API endpoint URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues:
1. Check the documentation
2. Review the code comments
3. Open an issue on GitHub

---

**HUM Token** - Building the future of decentralized finance with automated fee collection and secure transaction limits. 