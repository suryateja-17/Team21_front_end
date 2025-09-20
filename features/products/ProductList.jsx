import React, { useState } from 'react';
import apiService from '../../services/api';

export default function ProductList({ products, contacts, onRefresh }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    sku: '',
    stock: '',
    unit: 'pcs'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await apiService.request(`/products/${editingProduct._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData)
        });
      } else {
        await apiService.request('/products', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
      }
      
      setShowAddForm(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        sku: '',
        stock: '',
        unit: 'pcs'
      });
      onRefresh();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || '',
      sku: product.sku || '',
      stock: product.stock || '',
      unit: product.unit || 'pcs'
    });
    setShowAddForm(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiService.request(`/products/${productId}`, {
          method: 'DELETE'
        });
        onRefresh();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#2c2217]">Products</h2>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingProduct(null);
            setFormData({
              name: '',
              description: '',
              price: '',
              category: '',
              sku: '',
              stock: '',
              unit: 'pcs'
            });
          }}
          className="bg-[#d3a17e] text-[#2c2217] font-semibold py-2 px-4 rounded hover:bg-[#493b29] hover:text-[#ecd9c6] transition"
        >
          Add Product
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg border border-[#ce9872] shadow-lg">
          <h3 className="text-lg font-semibold text-[#2c2217] mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">SKU</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({...formData, sku: e.target.value})}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#493b29] mb-1">Unit</label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({...formData, unit: e.target.value})}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
              >
                <option value="pcs">Pieces</option>
                <option value="kg">Kilograms</option>
                <option value="m">Meters</option>
                <option value="sqm">Square Meters</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#493b29] mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full border border-[#ce9872] rounded px-3 py-2"
                rows="3"
              />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="bg-[#d3a17e] text-[#2c2217] font-semibold py-2 px-4 rounded hover:bg-[#493b29] hover:text-[#ecd9c6] transition"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingProduct(null);
                }}
                className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-[#ce9872] shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#ecd9c6]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#2c2217] uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#2c2217] uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#2c2217] uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#2c2217] uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#2c2217] uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#2c2217] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.sku || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{product.price || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stock || 0} {product.unit || 'pcs'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.category || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-[#d3a17e] hover:text-[#493b29] mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
