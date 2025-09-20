// seed.js
const mongoose = require("mongoose");
const Contact = require("./models/Contact");
const Product = require("./models/Product");
const Tax = require("./models/Tax");
const CoA = require("./models/chartOfAccounts");
const Transaction = require("./models/Transaction");

const MONGO_URI = "mongodb://127.0.0.1:27017"; // Change if needed

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected.");

    // Clear existing data
    await Contact.deleteMany({});
    await Product.deleteMany({});
    await Tax.deleteMany({});
    await CoA.deleteMany({});
    await Transaction.deleteMany({});

    console.log("Existing data cleared.");

    // --- Contacts ---
    const contacts = await Contact.insertMany([
      { name: "Acme Corp", type: "Customer", email: "acme@example.com" },
      { name: "Globex Ltd", type: "Customer", email: "globex@example.com" },
      { name: "Supply Co", type: "Vendor", email: "supply@example.com" },
    ]);

    // --- Products ---
    const products = await Product.insertMany([
      { name: "Laptop", price: 1200 },
      { name: "Mouse", price: 25 },
      { name: "Keyboard", price: 45 },
    ]);

 // --- Taxes ---
    const taxes = await Tax.insertMany([
    { name: "VAT 5%", rate: 5, applicableOn: "Sales", method: "Percentage" },
    { name: "GST 12%", rate: 12, applicableOn: "Sales", method: "Percentage" },
    ]);


    // --- Chart of Accounts ---
    const coas = await CoA.insertMany([
      { name: "Sales Revenue", type: "Income" },
      { name: "Purchase Expenses", type: "Expense" },
      { name: "Cash", type: "Asset" },
      { name: "Accounts Receivable", type: "Asset" },
      { name: "Accounts Payable", type: "Liability" },
    ]);

    // --- Transactions (Invoices/Purchases) ---
    const transactions = await Transaction.insertMany([
      {
        type: "Invoice",
        contact: contacts[0]._id,
        items: [
          { product: products[0]._id, quantity: 2, price: 1200, tax: taxes[0]._id },
          { product: products[1]._id, quantity: 5, price: 25, tax: taxes[0]._id },
        ],
        totalAmount: 2 * 1200 + 5 * 25 + ((2 * 1200 + 5 * 25) * 0.05),
        status: "Paid",
        date: new Date("2025-09-01"),
      },
      {
        type: "Invoice",
        contact: contacts[1]._id,
        items: [
          { product: products[2]._id, quantity: 3, price: 45, tax: taxes[1]._id },
        ],
        totalAmount: 3 * 45 + (3 * 45 * 0.12),
        status: "Unpaid",
        date: new Date("2025-09-10"),
      },
      {
        type: "Bill",
        contact: contacts[2]._id,
        items: [
          { product: products[1]._id, quantity: 10, price: 20, tax: taxes[0]._id },
        ],
        totalAmount: 10 * 20 + (10 * 20 * 0.05),
        status: "Paid",
        date: new Date("2025-09-05"),
      },
    ]);

    console.log("Seeding completed successfully.");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seed();