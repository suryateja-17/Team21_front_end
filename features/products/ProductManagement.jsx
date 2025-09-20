import React, { useState, useEffect } from 'react';
import PurchaseOrder from './PurchaseOrder';
import VendorBill from './VendorBill';
import BillPayment from './BillPayment';
import ProductList from './ProductList';
import apiService from '../../services/api';

export default function ProductManagement() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, contactsData] = await Promise.all([
        apiService.request('/products').catch(() => ({ data: [] })),
        apiService.request('/contacts').catch(() => ({ data: [] }))
      ]);
      
      setProducts(productsData.data || []);
      setContacts(contactsData.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'purchase-order', label: 'Purchase Order', icon: '📋' },
    { id: 'vendor-bill', label: 'Vendor Bill', icon: '🧾' },
    { id: 'payment', label: 'Bill Payment', icon: '💳' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading product management...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-[#2c2217] text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Product Management</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Menu St</span>
            <div className="w-8 h-8 bg-[#d3a17e] rounded-full flex items-center justify-center">
              <span className="text-[#2c2217] font-bold">U</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8 px-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-[#d3a17e] text-[#d3a17e]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'products' && (
          <ProductList 
            products={products} 
            contacts={contacts}
            onRefresh={loadData}
          />
        )}
        {activeTab === 'purchase-order' && (
          <PurchaseOrder 
            products={products} 
            contacts={contacts}
            onRefresh={loadData}
          />
        )}
        {activeTab === 'vendor-bill' && (
          <VendorBill 
            products={products} 
            contacts={contacts}
            onRefresh={loadData}
          />
        )}
        {activeTab === 'payment' && (
          <BillPayment 
            contacts={contacts}
            onRefresh={loadData}
          />
        )}
      </div>
    </div>
  );
}
