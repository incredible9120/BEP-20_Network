// TODO: Add HUMToken API functions here

const API_BASE_URL = 'http://localhost:3001/api';

export async function getTokenInfo() {
  const res = await fetch(`${API_BASE_URL}/token/info`);
  if (!res.ok) {
    throw new Error('Failed to fetch token info');
  }
  return res.json();
}

export async function getTokenBalance(address) {
  const res = await fetch(`${API_BASE_URL}/token/balance/${address}`);
  if (!res.ok) {
    throw new Error('Failed to fetch token balance');
  }
  return res.json();
}

export async function getTokenAllowance(owner, spender) {
  const res = await fetch(`${API_BASE_URL}/token/allowance/${owner}/${spender}`);
  if (!res.ok) {
    throw new Error('Failed to fetch token allowance');
  }
  return res.json();
}

export async function transferTokens(fromAddress, toAddress, amount, privateKey) {
  const res = await fetch(`${API_BASE_URL}/token/transfer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fromAddress,
      toAddress,
      amount,
      privateKey
    }),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to transfer tokens');
  }
  
  return res.json();
}