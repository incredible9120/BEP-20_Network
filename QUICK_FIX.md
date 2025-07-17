# Quick Fix: "Failed to fetch" Error

## Problem
You're seeing this error:
```
TypeError: Failed to fetch
    at getTokenInfo (api.js:6:1)
    at loadTokenInfo (HUMTokenDashboard.js:29:1)
    at HUMTokenDashboard.js:23:1
```

This means the frontend can't connect to the backend server.

## Solution Steps

### 1. Check if Backend Server is Running
```bash
# Check if backend is running on port 3001
npm run health
```

### 2. If Backend is Not Running, Start It
```bash
# Option A: Start both servers together
npm start

# Option B: Start backend only
npm run start:backend
```

### 3. If Backend is Running But Still Getting Errors
The issue might be with the smart contract deployment. Check:

```bash
# Verify contract deployment
npm run verify
```

### 4. If Contract is Not Deployed
```bash
# Deploy the contract
npm run deploy
```

### 5. Manual Server Start (if automated scripts fail)
```bash
# Terminal 1 - Start Backend
cd backend
npm install
npm start

# Terminal 2 - Start Frontend  
cd frontend
npm install
npm start
```

## Expected Results

After following these steps:
- Backend should be running on: http://localhost:3001
- Frontend should be running on: http://localhost:3000
- Health check should show: "✅ Backend server is running"

## Common Issues

### Port Already in Use
If you get "port already in use" errors:
```bash
# Kill processes on port 3001
lsof -ti:3001 | xargs kill -9

# Kill processes on port 3000  
lsof -ti:3000 | xargs kill -9
```

### Missing Dependencies
```bash
# Install all dependencies
npm run install:all
```

### Missing Environment Files
If you get "Backend .env file not found":
1. Make sure you've deployed the contract first
2. Run: `npm run deploy`
3. This will create the necessary `.env` files

## Still Having Issues?

1. Check the browser console for more detailed error messages
2. Check the backend terminal for server errors
3. Verify your network connection
4. Make sure no firewall is blocking localhost connections

## Quick Test

Once both servers are running, you can test the API directly:
```bash
curl http://localhost:3001/api/token/info
```

This should return JSON with token information or an error message explaining the issue. 