import React, { useState, useEffect } from 'react';
import { getTokenInfo, getTokenBalance, getTokenAllowance, transferTokens } from '../api';
import { FiRepeat, FiDollarSign, FiShield, FiTrendingUp, FiUsers, FiSettings, FiActivity, FiHome, FiInfo } from 'react-icons/fi';
import { FaCoins, FaWallet, FaExchangeAlt } from 'react-icons/fa';
import { MdSecurity, MdLocalFireDepartment, MdInfo, MdCheckCircle } from 'react-icons/md';

const HUMTokenDashboard = () => {
  const [tokenInfo, setTokenInfo] = useState(null);
  const [balance, setBalance] = useState(null);
  const [allowance, setAllowance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addressInput, setAddressInput] = useState('');
  const [ownerInput, setOwnerInput] = useState('');
  const [spenderInput, setSpenderInput] = useState('');
  const [transferFromAddress, setTransferFromAddress] = useState('');
  const [transferToAddress, setTransferToAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [transferResult, setTransferResult] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadTokenInfo();
  }, []);

  const loadTokenInfo = async () => {
    try {
      setLoading(true);
      const info = await getTokenInfo();
      setTokenInfo(info);
      setError(null);
    } catch (err) {
      setError('Failed to load token information');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckBalance = async () => {
    if (!addressInput.trim()) {
      setError('Please enter an address');
      return;
    }

    try {
      setLoading(true);
      const balanceData = await getTokenBalance(addressInput.trim());
      setBalance(balanceData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch balance');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckAllowance = async () => {
    if (!ownerInput.trim() || !spenderInput.trim()) {
      setError('Please enter both owner and spender addresses');
      return;
    }

    try {
      setLoading(true);
      const allowanceData = await getTokenAllowance(ownerInput.trim(), spenderInput.trim());
      setAllowance(allowanceData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch allowance');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async () => {
    if (!transferFromAddress.trim() || !transferToAddress.trim() || !transferAmount.trim() || !privateKey.trim()) {
      setError('Please fill in all transfer fields');
      return;
    }

    if (isNaN(transferAmount) || parseFloat(transferAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setTransferResult(null);
      
      const result = await transferTokens(
        transferFromAddress.trim(),
        transferToAddress.trim(),
        parseFloat(transferAmount),
        privateKey.trim()
      );
      
      setTransferResult(result);
      
      // Clear form after successful transfer
      setTransferFromAddress('');
      setTransferToAddress('');
      setTransferAmount('');
      setPrivateKey('');
      
    } catch (err) {
      setError(err.message || 'Transfer failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (value, decimals = 18) => {
    if (!value) return '0';
    const num = parseFloat(value) / Math.pow(10, decimals);
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 6 
    });
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FiHome /> },
    { id: 'actions', label: 'Actions', icon: <FiActivity /> },
    { id: 'info', label: 'Token Info', icon: <FiInfo /> },
    { id: 'features', label: 'Features', icon: <FiSettings /> }
  ];

  if (loading && !tokenInfo) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading HUMToken information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-main">
            <h1 className="header-title">
              <FiDollarSign className="header-icon" />
              HUM Token Dashboard
            </h1>
            <p className="header-subtitle">BEP-20 Token with Automated Fee Collection</p>
          </div>
          {tokenInfo && (
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-label">Total Supply</span>
                <span className="stat-value">{formatNumber(tokenInfo.totalSupply)} {tokenInfo.symbol}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Fee Rate</span>
                <span className="stat-value">{(parseInt(tokenInfo.feeBasisPoints) / 100).toFixed(2)}%</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Error Display */}
      {error && (
        <div className="error-banner">
          <MdInfo className="error-icon" />
          <span>{error}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <div className="nav-container">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="main-container">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              <div className="overview-grid">
                {/* Token Summary Card */}
                {tokenInfo && (
                  <div className="summary-card">
                    <div className="summary-header">
                      <h2>Token Summary</h2>
                      <div className="token-badge">{tokenInfo.symbol}</div>
                    </div>
                    <div className="summary-content">
                      <div className="summary-row">
                        <span className="summary-label">Name:</span>
                        <span className="summary-value">{tokenInfo.name}</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Total Supply:</span>
                        <span className="summary-value">{formatNumber(tokenInfo.totalSupply)} {tokenInfo.symbol}</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Fee Rate:</span>
                        <span className="summary-value">{(parseInt(tokenInfo.feeBasisPoints) / 100).toFixed(2)}%</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Treasury:</span>
                        <span className="summary-value">{formatAddress(tokenInfo.treasury)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="quick-actions">
                  <h2>Quick Actions</h2>
                  <div className="actions-grid">
                    <button 
                      className="action-card"
                      onClick={() => setActiveTab('actions')}
                    >
                      <FaWallet className="action-icon" />
                      <span>Check Balance</span>
                    </button>
                    <button 
                      className="action-card"
                      onClick={() => setActiveTab('actions')}
                    >
                      <FaExchangeAlt className="action-icon" />
                      <span>Transfer Tokens</span>
                    </button>
                    <button 
                      className="action-card"
                      onClick={() => setActiveTab('info')}
                    >
                      <FiInfo className="action-icon" />
                      <span>Token Details</span>
                    </button>
                    <button 
                      className="action-card"
                      onClick={() => setActiveTab('features')}
                    >
                      <FiSettings className="action-icon" />
                      <span>Features</span>
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="recent-activity">
                  <h2>Recent Activity</h2>
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon">
                        <FiActivity />
                      </div>
                      <div className="activity-content">
                        <div className="activity-title">Dashboard Loaded</div>
                        <div className="activity-time">Just now</div>
                      </div>
                    </div>
                    {transferResult && (
                      <div className="activity-item success">
                        <div className="activity-icon">
                          <MdCheckCircle />
                        </div>
                        <div className="activity-content">
                          <div className="activity-title">Transfer Successful</div>
                          <div className="activity-desc">{formatAddress(transferResult.from)} → {formatAddress(transferResult.to)}</div>
                          <div className="activity-time">Recently</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions Tab */}
          {activeTab === 'actions' && (
            <div className="tab-content">
              <div className="actions-layout">
                {/* Balance Check Section */}
                <section className="action-section">
                  <div className="section-header">
                    <h2>Check Token Balance</h2>
                    <p>Enter a wallet address to check its HUM token balance</p>
                  </div>
                  <div className="action-form">
                    <div className="form-group">
                      <label className="form-label">Wallet Address</label>
                      <input
                        type="text"
                        placeholder="Enter wallet address"
                        value={addressInput}
                        onChange={(e) => setAddressInput(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-actions">
                      <button onClick={handleCheckBalance} className="btn btn-primary">
                        Check Balance
                      </button>
                    </div>
                    {balance && (
                      <div className="result-card">
                        <div className="result-header">
                          <h3>Balance Result</h3>
                          <div className="result-badge success">Found</div>
                        </div>
                        <div className="result-content">
                          <div className="result-row">
                            <span className="result-label">Address:</span>
                            <span className="result-value">{formatAddress(balance.address)}</span>
                          </div>
                          <div className="result-row">
                            <span className="result-label">Balance:</span>
                            <span className="result-value">{formatNumber(balance.balance)} {tokenInfo.symbol}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Allowance Check Section */}
                <section className="action-section">
                  <div className="section-header">
                    <h2>Check Token Allowance</h2>
                    <p>Check how many tokens a spender is allowed to transfer from an owner</p>
                  </div>
                  <div className="action-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Owner Address</label>
                        <input
                          type="text"
                          placeholder="Owner address"
                          value={ownerInput}
                          onChange={(e) => setOwnerInput(e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Spender Address</label>
                        <input
                          type="text"
                          placeholder="Spender address"
                          value={spenderInput}
                          onChange={(e) => setSpenderInput(e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button onClick={handleCheckAllowance} className="btn btn-primary">
                        Check Allowance
                      </button>
                    </div>
                    {allowance && (
                      <div className="result-card">
                        <div className="result-header">
                          <h3>Allowance Result</h3>
                          <div className="result-badge info">Found</div>
                        </div>
                        <div className="result-content">
                          <div className="result-row">
                            <span className="result-label">Owner:</span>
                            <span className="result-value">{formatAddress(allowance.owner)}</span>
                          </div>
                          <div className="result-row">
                            <span className="result-label">Spender:</span>
                            <span className="result-value">{formatAddress(allowance.spender)}</span>
                          </div>
                          <div className="result-row">
                            <span className="result-label">Allowance:</span>
                            <span className="result-value">{formatNumber(allowance.allowance)} {tokenInfo.symbol}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Transfer Section */}
                <section className="action-section">
                  <div className="section-header">
                    <h2>Transfer Tokens</h2>
                    <p>Transfer HUM tokens between addresses</p>
                  </div>
                  <div className="action-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">From Address</label>
                        <input
                          type="text"
                          placeholder="Your wallet address"
                          value={transferFromAddress}
                          onChange={(e) => setTransferFromAddress(e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">To Address</label>
                        <input
                          type="text"
                          placeholder="Recipient address"
                          value={transferToAddress}
                          onChange={(e) => setTransferToAddress(e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Amount</label>
                        <input
                          type="number"
                          placeholder={`Amount ${tokenInfo ? tokenInfo.symbol : 'HUM'} tokens`}
                          value={transferAmount}
                          onChange={(e) => setTransferAmount(e.target.value)}
                          className="form-input"
                          step="0.000001"
                          min="0"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Private Key</label>
                        <input
                          type="password"
                          placeholder="Private key for signing"
                          value={privateKey}
                          onChange={(e) => setPrivateKey(e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button onClick={handleTransfer} className="btn btn-success">
                        Send Tokens
                      </button>
                    </div>
                    {transferResult && (
                      <div className="result-card success">
                        <div className="result-header">
                          <h3>Transfer Successful!</h3>
                          <div className="result-badge success">Success</div>
                        </div>
                        <div className="result-content">
                          <div className="result-row">
                            <span className="result-label">Transaction Hash:</span>
                            <span className="result-value">{transferResult.transactionHash}</span>
                          </div>
                          <div className="result-row">
                            <span className="result-label">From:</span>
                            <span className="result-value">{formatAddress(transferResult.from)}</span>
                          </div>
                          <div className="result-row">
                            <span className="result-label">To:</span>
                            <span className="result-value">{formatAddress(transferResult.to)}</span>
                          </div>
                          <div className="result-row">
                            <span className="result-label">Amount:</span>
                            <span className="result-value">{transferResult.amount} {tokenInfo.symbol}</span>
                          </div>
                          <div className="result-row">
                            <span className="result-label">Message:</span>
                            <span className="result-value">{transferResult.message}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* Token Info Tab */}
          {activeTab === 'info' && (
            <div className="tab-content">
              {tokenInfo && (
                <div className="info-layout">
                  <div className="info-grid">
                    <div className="info-card">
                      <div className="info-header">
                        <h3>Basic Information</h3>
                        <FiInfo className="info-icon" />
                      </div>
                      <div className="info-content">
                        <div className="info-row">
                          <span className="info-label">Name:</span>
                          <span className="info-value">{tokenInfo.name}</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Symbol:</span>
                          <span className="info-value">{tokenInfo.symbol}</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Decimals:</span>
                          <span className="info-value">{tokenInfo.decimals}</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Total Supply:</span>
                          <span className="info-value">{formatNumber(tokenInfo.totalSupply)} {tokenInfo.symbol}</span>
                        </div>
                      </div>
                    </div>

                    <div className="info-card">
                      <div className="info-header">
                        <h3>Fee Configuration</h3>
                        <FaCoins className="info-icon" />
                      </div>
                      <div className="info-content">
                        <div className="info-row">
                          <span className="info-label">Fee Rate:</span>
                          <span className="info-value">{(parseInt(tokenInfo.feeBasisPoints) / 100).toFixed(2)}%</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Treasury:</span>
                          <span className="info-value">{formatAddress(tokenInfo.treasury)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="info-card">
                      <div className="info-header">
                        <h3>Transaction Limits</h3>
                        <MdSecurity className="info-icon" />
                      </div>
                      <div className="info-content">
                        <div className="info-row">
                          <span className="info-label">Max Wallet Size:</span>
                          <span className="info-value">{formatNumber(tokenInfo.maxWalletSize)} {tokenInfo.symbol}</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Max Transaction:</span>
                          <span className="info-value">{formatNumber(tokenInfo.maxTxAmount)} {tokenInfo.symbol}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="tab-content">
              <div className="features-layout">
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <FiRepeat />
                    </div>
                    <div className="feature-content">
                      <h3>Automated Transfers</h3>
                      <p>Built-in transfer functionality with automatic fee collection on every transaction</p>
                    </div>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">
                      <FaCoins />
                    </div>
                    <div className="feature-content">
                      <h3>Fee Collection</h3>
                      <p>1.5% fee automatically sent to treasury wallet on all transfers</p>
                    </div>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">
                      <MdSecurity />
                    </div>
                    <div className="feature-content">
                      <h3>Transaction Limits</h3>
                      <p>Maximum transaction and wallet size limits for enhanced security</p>
                    </div>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">
                      <MdLocalFireDepartment />
                    </div>
                    <div className="feature-content">
                      <h3>Burn Function</h3>
                      <p>Token holders can burn their tokens to reduce total supply</p>
                    </div>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">
                      <FiTrendingUp />
                    </div>
                    <div className="feature-content">
                      <h3>Price Stability</h3>
                      <p>Fee collection mechanism helps maintain token price stability</p>
                    </div>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">
                      <FiUsers />
                    </div>
                    <div className="feature-content">
                      <h3>Community Driven</h3>
                      <p>Fees support community treasury for development and marketing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HUMTokenDashboard; 