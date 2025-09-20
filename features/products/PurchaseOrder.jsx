import React, { useState, useEffect } from 'react';
import apiService from '../../services/api';

export default function PurchaseOrder({ products, contacts, onRefresh }) {
  const [formData, setFormData] = useState({
    poNumber: '',
    poDate: new Date().toISOString().split('T')[0],
    vendorName: '',
    reference: '',
    lineItems: [
      {
        product: '',
        qty: 1,
        unitPrice: 0,
        taxRate: 0,
        taxAmount: 0,
        total: 0
      }
    ]
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

  const generatePONumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PO${year}${month}${day}${random}`;
  };

  useEffect(() => {
    if (!formData.poNumber) {
      setFormData(prev => ({ ...prev, poNumber: generatePONumber() }));
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
    return totals;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const totals = calculateTotals();
      const purchaseOrderData = {
        ...formData,
        totals,
        status: 'draft'
      };
      
      await apiService.request('/purchase-orders', {
        method: 'POST',
        body: JSON.stringify(purchaseOrderData)
      });
      
      alert('Purchase Order created successfully!');
      onRefresh();
      
      // Reset form
      setFormData({
        poNumber: generatePONumber(),
        poDate: new Date().toISOString().split('T')[0],
        vendorName: '',
        reference: '',
        lineItems: [
          {
            product: '',
            qty: 1,
            unitPrice: 0,
            taxRate: 0,
            taxAmount: 0,
            total: 0
          }
        ]
      });
    } catch (error) {
      console.error('Error creating purchase order:', error);
      alert('Error creating purchase order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#2c2217]">Purchase Order</h2>
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

      {/* Purchase Order Form */}
      <div className="bg-white p-6 rounded-lg border border-[#ce9872] shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">PO No.</label>
              <input
                type="text"
                value={formData.poNumber}
                onChange={(e) => handleInputChange('poNumber', e.target.value)}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">PO Date</label>
              <input
                type="date"
                value={formData.poDate}
                onChange={(e) => handleInputChange('poDate', e.target.value)}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
                required
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
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Reference</label>
              <input
                type="text"
                value={formData.reference}
                onChange={(e) => handleInputChange('reference', e.target.value)}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
                placeholder="REQ-25-0001"
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
                    <td colSpan="4" className="px-4 py-2 text-right font-medium text-gray-900">
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

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#d3a17e] text-[#2c2217] font-semibold py-3 px-6 rounded hover:bg-[#493b29] hover:text-[#ecd9c6] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Purchase Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
