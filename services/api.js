const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Something went wrong';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Check if response has content before parsing JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return data;
      } else {
        return { message: 'Success' };
      }
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Contact endpoints
  async getContacts() {
    return this.request('/contacts');
  }

  async createContact(contactData) {
    return this.request('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async updateContact(id, contactData) {
    return this.request(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contactData),
    });
  }

  async deleteContact(id) {
    return this.request(`/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  // Product endpoints
  async getProducts() {
    return this.request('/products');
  }

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Sales Order endpoints
  async getSalesOrders() {
    return this.request('/sales-orders');
  }

  async createSalesOrder(orderData) {
    return this.request('/sales-orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async updateSalesOrder(id, orderData) {
    return this.request(`/sales-orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    });
  }

  async deleteSalesOrder(id) {
    return this.request(`/sales-orders/${id}`, {
      method: 'DELETE',
    });
  }

  // Purchase Order endpoints
  async getPurchaseOrders() {
    return this.request('/purchase-orders');
  }

  async createPurchaseOrder(orderData) {
    return this.request('/purchase-orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async updatePurchaseOrder(id, orderData) {
    return this.request(`/purchase-orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    });
  }

  async deletePurchaseOrder(id) {
    return this.request(`/purchase-orders/${id}`, {
      method: 'DELETE',
    });
  }

  // Payment endpoints
  async getPayments() {
    return this.request('/payments');
  }

  async createPayment(paymentData) {
    return this.request('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // Tax endpoints
  async getTaxes() {
    return this.request('/taxes');
  }

  async createTax(taxData) {
    return this.request('/taxes', {
      method: 'POST',
      body: JSON.stringify(taxData),
    });
  }

  // Chart of Accounts endpoints
  async getChartOfAccounts() {
    return this.request('/coa');
  }

  async createChartOfAccount(accountData) {
    return this.request('/coa', {
      method: 'POST',
      body: JSON.stringify(accountData),
    });
  }

  // Report endpoints
  async getReports() {
    return this.request('/reports');
  }

  async generateReport(reportData) {
    return this.request('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  }
}

export default new ApiService();
