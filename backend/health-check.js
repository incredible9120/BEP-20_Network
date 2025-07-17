const http = require('http');

function checkBackendHealth() {
  console.log('🔍 Checking backend server health...\n');

  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/token/info',
    method: 'GET',
    timeout: 5000
  };

  const req = http.request(options, (res) => {
    console.log(`✅ Backend server is running`);
    console.log(`📊 Status: ${res.statusCode}`);
    console.log(`🔗 URL: http://localhost:3001`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        if (response.error) {
          console.log(`⚠️  API Response: ${response.error}`);
          console.log('\n💡 This might indicate:');
          console.log('1. Contract not deployed');
          console.log('2. Wrong contract address');
          console.log('3. Network connectivity issues');
          console.log('\n🔧 Try running: node verify-deployment.js');
        } else {
          console.log(`✅ API Response: Token info received successfully`);
          console.log(`📋 Token: ${response.name} (${response.symbol})`);
          console.log(`💰 Total Supply: ${response.totalSupply}`);
        }
      } catch (error) {
        console.log(`⚠️  Could not parse API response: ${error.message}`);
      }
    });
  });

  req.on('error', (error) => {
    console.error(`❌ Backend server is not running`);
    console.error(`🔍 Error: ${error.message}`);
    console.log('\n💡 Solutions:');
    console.log('1. Start the backend server: cd backend && npm start');
    console.log('2. Check if port 3001 is available');
    console.log('3. Verify the server is not already running');
  });

  req.on('timeout', () => {
    console.error(`⏰ Backend server request timed out`);
    console.log('💡 The server might be starting up or overloaded');
  });

  req.end();
}

// Run health check
checkBackendHealth(); 