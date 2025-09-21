# Shiv Furniture - Full Stack Accounting System



video 

https://github.com/user-attachments/assets/0db5ec53-00b6-40fd-983f-9bb03cd6c3e4












A complete full-stack application for furniture business accounting management built with React, Express.js, and MongoDB.

## Features

- **User Authentication**: Login and registration with JWT tokens
- **Dashboard**: Overview of business metrics and quick actions
- **Product Management**: Add, edit, and manage furniture products
- **Contact Management**: Manage customer and supplier contacts
- **Sales & Purchase Orders**: Track sales and purchase transactions
- **Payment Tracking**: Monitor payments and transactions
- **Tax Management**: Handle tax calculations and reporting
- **Chart of Accounts**: Manage accounting categories
- **Reports**: Generate business reports and analytics

## Tech Stack

### Frontend
- React 18
- Vite (Build Tool)
- React Router DOM
- Tailwind CSS
- Axios (for API calls)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shiv_furniture_Team21
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `env.example` to `.env`
   - Update the environment variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/shiv_furniture
   JWT_SECRET=your_jwt_secret_key_here
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Or use MongoDB Atlas for cloud database

## Development

### Start Development Server
```bash
npm run dev
```
This will start both the backend server (port 5000) and frontend development server (port 3000) concurrently.

### Individual Commands
```bash
# Backend only
npm run server

# Frontend only
npm run client
```

## Production

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Contacts
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

### Sales Orders
- `GET /api/sales-orders` - Get all sales orders
- `POST /api/sales-orders` - Create new sales order
- `PUT /api/sales-orders/:id` - Update sales order
- `DELETE /api/sales-orders/:id` - Delete sales order

### Purchase Orders
- `GET /api/purchase-orders` - Get all purchase orders
- `POST /api/purchase-orders` - Create new purchase order
- `PUT /api/purchase-orders/:id` - Update purchase order
- `DELETE /api/purchase-orders/:id` - Delete purchase order

### Payments
- `GET /api/payments` - Get all payments
- `POST /api/payments` - Create new payment

### Taxes
- `GET /api/taxes` - Get all taxes
- `POST /api/taxes` - Create new tax

### Chart of Accounts
- `GET /api/coa` - Get chart of accounts
- `POST /api/coa` - Create new account

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports` - Generate new report

## Project Structure

```
shiv_furniture_Team21/
├── components/          # Reusable React components
├── controllers/         # Backend route controllers
├── features/           # Feature-based React components
│   ├── auth/          # Authentication components
│   └── dashboard/     # Dashboard components
├── middleware/         # Express middleware
├── models/            # MongoDB models
├── routes/            # Express routes
├── services/          # Frontend API services
├── server.js          # Express server
├── App.jsx           # Main React component
├── main.jsx          # React entry point
└── vite.config.js    # Vite configuration
```

## Usage

1. **Start the application**: `npm run dev`
2. **Open your browser**: Navigate to `http://localhost:3000`
3. **Register a new account** or use existing credentials
4. **Login** to access the dashboard
5. **Explore the features** through the dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
