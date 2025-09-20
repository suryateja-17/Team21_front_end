import React, { useState, useEffect } from 'react';
import apiService from '../../services/api';

export default function BillPayment({ contacts, onRefresh }) {
  const [formData, setFormData] = useState({
    paymentId: '',
    paymentType: 'send',
    partnerType: 'vendor',
    partner: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    paymentVia: 'bank',
    note: ''
  });
  const [vendors, setVendors] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Filter contacts by type
    const vendorContacts = contacts.filter(contact => 
      contact.type === 'vendor' || contact.type === 'supplier'
    );
    const customerContacts = contacts.filter(contact => 
      contact.type === 'customer' || contact.type === 'client'
    );
    
    setVendors(vendorContacts);
    setCustomers(customerContacts);
  }, [contacts]);

  const generatePaymentId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `Pay/${year}/${random}`;
  };

  useEffect(() => {
    if (!formData.paymentId) {
      setFormData(prev => ({ ...prev, paymentId: generatePaymentId() }));
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const paymentData = {
        ...formData,
        status: 'draft'
      };
      
      await apiService.request('/payments', {
        method: 'POST',
        body: JSON.stringify(paymentData)
      });
      
      alert('Payment recorded successfully!');
      onRefresh();
      
      // Reset form
      setFormData({
        paymentId: generatePaymentId(),
        paymentType: 'send',
        partnerType: 'vendor',
        partner: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        paymentVia: 'bank',
        note: ''
      });
    } catch (error) {
      console.error('Error recording payment:', error);
      alert('Error recording payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPartnerOptions = () => {
    return formData.partnerType === 'vendor' ? vendors : customers;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#2c2217]">Bill Payment</h2>
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Confirm
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Print
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
            Send
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
            Cancel
          </button>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="flex gap-4">
        <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">Draft</span>
        <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">Confirm</span>
        <span className="px-3 py-1 bg-red-200 text-red-800 rounded-full text-sm">Cancelled</span>
      </div>

      {/* Bill Payment Form */}
      <div className="bg-white p-6 rounded-lg border border-[#ce9872] shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Payment ID</label>
              <input
                type="text"
                value={formData.paymentId}
                onChange={(e) => handleInputChange('paymentId', e.target.value)}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
                required
              />
              <p className="text-xs text-gray-500 mt-1">(Default Today Date)</p>
            </div>
          </div>

          {/* Payment Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#2c2217]">Payment Type</h3>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentType"
                  value="send"
                  checked={formData.paymentType === 'send'}
                  onChange={(e) => handleInputChange('paymentType', e.target.value)}
                  className="mr-2"
                />
                <span className="text-[#493b29]">Send</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentType"
                  value="receive"
                  checked={formData.paymentType === 'receive'}
                  onChange={(e) => handleInputChange('paymentType', e.target.value)}
                  className="mr-2"
                />
                <span className="text-[#493b29]">Receive</span>
              </label>
            </div>
          </div>

          {/* Partner Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#2c2217]">Partner Type</h3>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="partnerType"
                  value="vendor"
                  checked={formData.partnerType === 'vendor'}
                  onChange={(e) => {
                    handleInputChange('partnerType', e.target.value);
                    handleInputChange('partner', ''); // Reset partner selection
                  }}
                  className="mr-2"
                />
                <span className="text-[#493b29]">Vendor</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="partnerType"
                  value="customer"
                  checked={formData.partnerType === 'customer'}
                  onChange={(e) => {
                    handleInputChange('partnerType', e.target.value);
                    handleInputChange('partner', ''); // Reset partner selection
                  }}
                  className="mr-2"
                />
                <span className="text-[#493b29]">Customer</span>
              </label>
            </div>
          </div>

          {/* Partner and Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Partner</label>
              <select
                value={formData.partner}
                onChange={(e) => handleInputChange('partner', e.target.value)}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
                required
              >
                <option value="">Select {formData.partnerType === 'vendor' ? 'Vendor' : 'Customer'}</option>
                {getPartnerOptions().map((partner) => (
                  <option key={partner._id} value={partner.name}>
                    {partner.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">(auto fill partner name from Invoice/Bill)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Amount</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
                required
              />
              <p className="text-xs text-gray-500 mt-1">(auto fill amount due from Invoice/Bill)</p>
            </div>
          </div>

          {/* Payment Method and Note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Payment Via</label>
              <select
                value={formData.paymentVia}
                onChange={(e) => handleInputChange('paymentVia', e.target.value)}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
                required
              >
                <option value="bank">Bank</option>
                <option value="cash">Cash</option>
                <option value="cheque">Cheque</option>
                <option value="upi">UPI</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">(Default Bank can be selectable to Cash)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Note</label>
              <input
                type="text"
                value={formData.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
                placeholder="Payment reference or notes"
              />
              <p className="text-xs text-gray-500 mt-1">Alpha numeric (text)</p>
            </div>
          </div>

          {/* Accounting Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-[#2c2217] mb-4">Accounting Entries</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Before Confirmation of Bill:</span>
                <span>{formData.partner} Creditor A/c {formData.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Bank A/c:</span>
                <span>0</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-medium">On Confirmation of Bill:</span>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="flex justify-between">
                    <span>(-) Creditor A/c {formData.partner}:</span>
                    <span>{formData.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>(-) Bank A/c {formData.partner}:</span>
                    <span>{formData.amount}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <h4 className="font-semibold text-[#2c2217] mb-2">General Accounting Principles:</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• In Partner Ledger Creditor account will be consider as minus</li>
                <li>• In Balance sheet Creditor account will be consider as minus</li>
                <li>• In Balance sheet Bank account will be consider as minus</li>
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#d3a17e] text-[#2c2217] font-semibold py-3 px-6 rounded hover:bg-[#493b29] hover:text-[#ecd9c6] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Recording...' : 'Record Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
