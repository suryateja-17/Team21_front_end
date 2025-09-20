import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalContacts: 0,
    totalSales: 0,
    totalPurchases: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Load user info from localStorage
        const userRole = localStorage.getItem('userRole');
        setUser({ role: userRole });

        // Load dashboard statistics
        const [products, contacts, salesOrders, purchaseOrders] = await Promise.all([
          apiService.getProducts().catch(() => ({ data: [] })),
          apiService.getContacts().catch(() => ({ data: [] })),
          apiService.getSalesOrders().catch(() => ({ data: [] })),
          apiService.getPurchaseOrders().catch(() => ({ data: [] }))
        ]);

        setStats({
          totalProducts: products.data?.length || 0,
          totalContacts: contacts.data?.length || 0,
          totalSales: salesOrders.data?.length || 0,
          totalPurchases: purchaseOrders.data?.length || 0
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#2c2217]">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-[#493b29]">Welcome, {user?.role || 'User'}!</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#ecd9c6] p-6 rounded-lg border border-[#ce9872]">
          <h3 className="text-lg font-semibold text-[#2c2217] mb-2">Products</h3>
          <p className="text-3xl font-bold text-[#493b29]">{stats.totalProducts}</p>
        </div>
        <div className="bg-[#ecd9c6] p-6 rounded-lg border border-[#ce9872]">
          <h3 className="text-lg font-semibold text-[#2c2217] mb-2">Contacts</h3>
          <p className="text-3xl font-bold text-[#493b29]">{stats.totalContacts}</p>
        </div>
        <div className="bg-[#ecd9c6] p-6 rounded-lg border border-[#ce9872]">
          <h3 className="text-lg font-semibold text-[#2c2217] mb-2">Sales Orders</h3>
          <p className="text-3xl font-bold text-[#493b29]">{stats.totalSales}</p>
        </div>
        <div className="bg-[#ecd9c6] p-6 rounded-lg border border-[#ce9872]">
          <h3 className="text-lg font-semibold text-[#2c2217] mb-2">Purchase Orders</h3>
          <p className="text-3xl font-bold text-[#493b29]">{stats.totalPurchases}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-[#ce9872] shadow-lg">
        <h2 className="text-2xl font-semibold text-[#2c2217] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/products')}
            className="bg-[#d3a17e] text-[#2c2217] font-semibold py-3 px-6 rounded hover:bg-[#493b29] hover:text-[#ecd9c6] transition"
          >
            Manage Products
          </button>
          <button className="bg-[#d3a17e] text-[#2c2217] font-semibold py-3 px-6 rounded hover:bg-[#493b29] hover:text-[#ecd9c6] transition">
            Manage Contacts
          </button>
          <button className="bg-[#d3a17e] text-[#2c2217] font-semibold py-3 px-6 rounded hover:bg-[#493b29] hover:text-[#ecd9c29] transition">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}
