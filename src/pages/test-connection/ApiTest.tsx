import { useState, useEffect } from 'react';
import { api } from '../../services/api';

export function ApiTest() {
  const [status, setStatus] = useState<string>('Testing connection...');

  useEffect(() => {
    // Test basic connection
    api
      .test()
      .then((data) => {
        setStatus('✅ Connected to backend!');
        console.log('Test response:', data);
      })
      .catch((err) => {
        setStatus('❌ Failed to connect: ' + err.message);
      });
  }, []);

  console.log('API: ', import.meta.env.VITE_BASE_URL_API_NESTJS);
  return (
    <div style={{ padding: '20px' }}>
      <h2>Backend Connection Status</h2>
      <p>{status}</p>
    </div>
  );
}
