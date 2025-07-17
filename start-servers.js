const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting HUMToken Application Servers...\n');

// Check if .env files exist
const backendEnvPath = path.join(__dirname, 'backend', '.env');
const smartContractEnvPath = path.join(__dirname, 'smart-contract', '.env');

console.log('📋 Environment Check:');

if (!fs.existsSync(backendEnvPath)) {
  console.log('❌ Backend .env file not found');
  console.log('   Please run the deployment script first:');
  console.log('   cd smart-contract && npx hardhat run deploy-and-verify.js --network bscTestnet');
  process.exit(1);
} else {
  console.log('✅ Backend .env file found');
}

if (!fs.existsSync(smartContractEnvPath)) {
  console.log('⚠️  Smart contract .env file not found');
  console.log('   This is needed for deployment, but not for running servers');
} else {
  console.log('✅ Smart contract .env file found');
}

// Check if node_modules exist
const backendNodeModules = path.join(__dirname, 'backend', 'node_modules');
const frontendNodeModules = path.join(__dirname, 'frontend', 'node_modules');

console.log('\n📦 Dependencies Check:');

if (!fs.existsSync(backendNodeModules)) {
  console.log('❌ Backend node_modules not found');
  console.log('   Installing backend dependencies...');
  const installBackend = spawn('npm', ['install'], { 
    cwd: path.join(__dirname, 'backend'),
    stdio: 'inherit'
  });
  
  installBackend.on('close', (code) => {
    if (code !== 0) {
      console.error('❌ Failed to install backend dependencies');
      process.exit(1);
    }
    console.log('✅ Backend dependencies installed');
    startServers();
  });
  return;
} else {
  console.log('✅ Backend dependencies found');
}

if (!fs.existsSync(frontendNodeModules)) {
  console.log('❌ Frontend node_modules not found');
  console.log('   Installing frontend dependencies...');
  const installFrontend = spawn('npm', ['install'], { 
    cwd: path.join(__dirname, 'frontend'),
    stdio: 'inherit'
  });
  
  installFrontend.on('close', (code) => {
    if (code !== 0) {
      console.error('❌ Failed to install frontend dependencies');
      process.exit(1);
    }
    console.log('✅ Frontend dependencies installed');
    startServers();
  });
  return;
} else {
  console.log('✅ Frontend dependencies found');
}

startServers();

function startServers() {
  console.log('\n🌐 Starting servers...\n');

  // Start backend server
  console.log('🔧 Starting backend server on port 3001...');
  const backend = spawn('npm', ['start'], { 
    cwd: path.join(__dirname, 'backend'),
    stdio: 'pipe'
  });

  backend.stdout.on('data', (data) => {
    console.log(`[Backend] ${data.toString().trim()}`);
  });

  backend.stderr.on('data', (data) => {
    console.error(`[Backend Error] ${data.toString().trim()}`);
  });

  backend.on('close', (code) => {
    console.log(`[Backend] Process exited with code ${code}`);
  });

  // Wait a moment for backend to start, then start frontend
  setTimeout(() => {
    console.log('🎨 Starting frontend server on port 3000...');
    const frontend = spawn('npm', ['start'], { 
      cwd: path.join(__dirname, 'frontend'),
      stdio: 'pipe'
    });

    frontend.stdout.on('data', (data) => {
      console.log(`[Frontend] ${data.toString().trim()}`);
    });

    frontend.stderr.on('data', (data) => {
      console.error(`[Frontend Error] ${data.toString().trim()}`);
    });

    frontend.on('close', (code) => {
      console.log(`[Frontend] Process exited with code ${code}`);
    });
  }, 3000);

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down servers...');
    backend.kill();
    process.exit(0);
  });

  console.log('\n✅ Servers are starting up...');
  console.log('📱 Frontend will be available at: http://localhost:3000');
  console.log('🔧 Backend API will be available at: http://localhost:3001');
  console.log('\n💡 Press Ctrl+C to stop all servers');
} 