import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

export default function TestConnection() {
  const [status, setStatus] = useState('Testing...');
  const [apiStatus, setApiStatus] = useState('Testing...');
  const [error, setError] = useState(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      // Test basic API connection
      const response = await fetch('http://localhost:5000/api');
      if (response.ok) {
        const data = await response.json();
        setApiStatus(`✅ Backend API: ${data.message}`);
      } else {
        setApiStatus('❌ Backend API: Connection failed');
      }
    } catch (err) {
      setApiStatus('❌ Backend API: Connection failed');
      setError(err.message);
    }

    try {
      // Test API service
      await apiService.getProducts();
      setStatus('✅ Frontend-Backend: Connection successful!');
    } catch (err) {
      setStatus('❌ Frontend-Backend: Connection failed');
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#ecd9c6] rounded-lg border border-[#ce9872] shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-[#2c2217] text-center">
        Full-Stack Connection Test
      </h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-white rounded border">
          <h3 className="font-semibold text-[#2c2217] mb-2">Backend Server Status</h3>
          <p className="text-sm">{apiStatus}</p>
        </div>
        
        <div className="p-4 bg-white rounded border">
          <h3 className="font-semibold text-[#2c2217] mb-2">Frontend-Backend Integration</h3>
          <p className="text-sm">{status}</p>
        </div>
        
        {error && (
          <div className="p-4 bg-red-100 rounded border border-red-300">
            <h3 className="font-semibold text-red-800 mb-2">Error Details</h3>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        <div className="text-center">
          <button
            onClick={testConnection}
            className="bg-[#d3a17e] text-[#2c2217] font-semibold py-2 px-4 rounded hover:bg-[#493b29] hover:text-[#ecd9c6] transition"
          >
            Test Again
          </button>
        </div>
      </div>
    </div>
  );
}
