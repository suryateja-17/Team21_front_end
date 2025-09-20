import React, { useState, useEffect } from 'react';
import apiService from '../../services/api';

export default function VendorBill({ products, contacts, onRefresh }) {
  const [formData, setFormData] = useState({
    billNumber: '',
    billDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    vendorName: '',
    billReference: '',
    lineItems: [
      {
        product: '',
        hsnCode: '',
        accountName: 'Purchase Expenses A/c',
        qty: 1,
        unitPrice: 0,
        taxRate: 0,
        taxAmount: 0,
        total: 0
      }
    ],
    paymentMethod: 'bank',
    paidAmount: 0,
    amountDue: 0
  });
  const [vendors, setVendors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Filter contacts to get only vendors
    const vendorContacts = contacts.filter(contact => 
      contact.type === 'vendor' || contact.type === 'supplier'
    );
    setVendors(vendorContacts);
  }, [contacts]);

  const generateBillNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `Bill/${year}/${random}`;
  };

  useEffect(() => {
    if (!formData.billNumber) {
      setFormData(prev => ({ ...prev, billNumber: generateBillNumber() }));
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLineItemChange = (index, field, value) => {
    const newLineItems = [...formData.lineItems];
    newLineItems[index] = { ...newLineItems[index], [field]: value };
    
    // Calculate tax amount and total
    const qty = parseFloat(newLineItems[index].qty) || 0;
    const unitPrice = parseFloat(newLineItems[index].unitPrice) || 0;
    const taxRate = parseFloat(newLineItems[index].taxRate) || 0;
    
    const untaxedAmount = qty * unitPrice;
    const taxAmount = (untaxedAmount * taxRate) / 100;
    const total = untaxedAmount + taxAmount;
    
    newLineItems[index] = {
      ...newLineItems[index],
      untaxedAmount,
      taxAmount,
      total
    };
    
    setFormData(prev => ({ ...prev, lineItems: newLineItems }));
  };

  const addLineItem = () => {
    setFormData(prev => ({
      ...prev,
      lineItems: [
        ...prev.lineItems,
        {
          product: '',
          hsnCode: '',
          accountName: 'Purchase Expenses A/c',
          qty: 1,
          unitPrice: 0,
          taxRate: 0,
          taxAmount: 0,
          total: 0
        }
      ]
    }));
  };

  const removeLineItem = (index) => {
    if (formData.lineItems.length > 1) {
      const newLineItems = formData.lineItems.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, lineItems: newLineItems }));
    }
  };

  const calculateTotals = () => {
    const totals = formData.lineItems.reduce(
      (acc, item) => ({
        untaxedAmount: acc.untaxedAmount + (item.untaxedAmount || 0),
        taxAmount: acc.taxAmount + (item.taxAmount || 0),
        total: acc.total + (item.total || 0)
      }),
      { untaxedAmount: 0, taxAmount: 0, total: 0 }
    );
    
    const amountDue = totals.total - formData.paidAmount;
    return { ...totals, amountDue };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const totals = calculateTotals();
      const billData = {
        ...formData,
        totals,
        status: 'draft'
      };
      
      await apiService.request('/bills', {
        method: 'POST',
        body: JSON.stringify(billData)
      });
      
      alert('Vendor Bill created successfully!');
      onRefresh();
      
      // Reset form
      setFormData({
        billNumber: generateBillNumber(),
        billDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        vendorName: '',
        billReference: '',
        lineItems: [
          {
            product: '',
            hsnCode: '',
            accountName: 'Purchase Expenses A/c',
            qty: 1,
            unitPrice: 0,
            taxRate: 0,
            taxAmount: 0,
            total: 0
          }
        ],
        paymentMethod: 'bank',
        paidAmount: 0,
        amountDue: 0
      });
    } catch (error) {
      console.error('Error creating vendor bill:', error);
      alert('Error creating vendor bill. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#2c2217]">Vendor Bill</h2>
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
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
            Draft
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
            Cancelled
          </button>
        </div>
      </div>

      {/* Vendor Bill Form */}
      <div className="bg-white p-6 rounded-lg border border-[#ce9872] shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Vendor Bill No.</label>
              <input
                type="text"
                value={formData.billNumber}
                onChange={(e) => handleInputChange('billNumber', e.target.value)}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Bill Date</label>
              <input
                type="date"
                value={formData.billDate}
                onChange={(e) => handleInputChange('billDate', e.target.value)}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Vendor Name</label>
              <select
                value={formData.vendorName}
                onChange={(e) => handleInputChange('vendorName', e.target.value)}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
                required
              >
                <option value="">Select Vendor</option>
                {vendors.map((vendor) => (
                  <option key={vendor._id} value={vendor.name}>
                    {vendor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Bill Reference</label>
              <input
                type="text"
                value={formData.billReference}
                onChange={(e) => handleInputChange('billReference', e.target.value)}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
                placeholder="SUP-25-001"
              />
            </div>
          </div>

          {/* Line Items Table */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#2c2217]">Line Items</h3>
              <button
                type="button"
                onClick={addLineItem}
                className="bg-[#d3a17e] text-[#2c2217] font-semibold py-2 px-4 rounded hover:bg-[#493b29] hover:text-[#ecd9c6] transition"
              >
                Add Item
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                <thead className="bg-[#ecd9c6]">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#2c2217] uppercase">Sr. No.</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#2c2217] uppercase">Product</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#2c2217] uppercase">HSN No.</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#2c2217] uppercase">Account Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#2c2217] uppercase">Qty</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#2c2217] uppercase">Unit Price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#2c2217] uppercase">Untaxed Amount</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#2c2217] uppercase">Tax %</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#2c2217] uppercase">Tax Amount</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#2c2217] uppercase">Total</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#2c2217] uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.lineItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-4 py-2">
                        <select
                          value={item.product}
                          onChange={(e) => handleLineItemChange(index, 'product', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        >
                          <option value="">Select Product</option>
                          {products.map((product) => (
                            <option key={product._id} value={product.name}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={item.hsnCode}
                          onChange={(e) => handleLineItemChange(index, 'hsnCode', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                          placeholder="940370"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={item.accountName}
                          onChange={(e) => handleLineItemChange(index, 'accountName', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => handleLineItemChange(index, 'qty', parseFloat(e.target.value) || 0)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.unitPrice}
                          onChange={(e) => handleLineItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        ₹{(item.untaxedAmount || 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          value={item.taxRate}
                          onChange={(e) => handleLineItemChange(index, 'taxRate', parseFloat(e.target.value) || 0)}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        ₹{(item.taxAmount || 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        ₹{(item.total || 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-2">
                        {formData.lineItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLineItem(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan="6" className="px-4 py-2 text-right font-medium text-gray-900">
                      Total:
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900">
                      ₹{totals.untaxedAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2"></td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900">
                      ₹{totals.taxAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-sm font-bold text-gray-900">
                      ₹{totals.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-[#2c2217] mb-4">Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#493b29] mb-1">Paid Via Cash</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.paymentMethod === 'cash' ? formData.paidAmount : 0}
                  onChange={(e) => {
                    handleInputChange('paymentMethod', 'cash');
                    handleInputChange('paidAmount', parseFloat(e.target.value) || 0);
                  }}
                  className="w-full border border-[#ce9872] rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#493b29] mb-1">Paid Via Bank</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.paymentMethod === 'bank' ? formData.paidAmount : 0}
                  onChange={(e) => {
                    handleInputChange('paymentMethod', 'bank');
                    handleInputChange('paidAmount', parseFloat(e.target.value) || 0);
                  }}
                  className="w-full border border-[#ce9872] rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#493b29] mb-1">Amount Due</label>
                <input
                  type="number"
                  step="0.01"
                  value={totals.amountDue}
                  className="w-full border border-[#ce9872] rounded px-3 py-2 bg-gray-100"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#d3a17e] text-[#2c2217] font-semibold py-3 px-6 rounded hover:bg-[#493b29] hover:text-[#ecd9c6] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Vendor Bill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
