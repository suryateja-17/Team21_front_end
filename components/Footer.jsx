import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#f0f4f8] py-12 px-8 mt-12 border-t border-gray-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-800">
        <div>
          <h4 className="font-semibold text-lg mb-3">Get Started</h4>
          <ul>
            <li><a href="/signup" className="hover:underline">Create Account</a></li>
            <li><a href="/features" className="hover:underline">Features Overview</a></li>
            <li><a href="/pricing" className="hover:underline">Pricing Plans</a></li>
            <li><a href="/contact" className="hover:underline">Contact Support</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-3">Services</h4>
          <ul>
            <li><a href="/billing" className="hover:underline">Billing & Invoices</a></li>
            <li><a href="/reports" className="hover:underline">Reports & Analytics</a></li>
            <li><a href="/integrations" className="hover:underline">Integrations</a></li>
            <li><a href="/mobile-app" className="hover:underline">Mobile App</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-3">Resources</h4>
          <ul>
            <li><a href="/blog" className="hover:underline">Blog Articles</a></li>
            <li><a href="/help-center" className="hover:underline">Help Center</a></li>
            <li><a href="/community" className="hover:underline">Community Forums</a></li>
            <li><a href="/tutorials" className="hover:underline">Video Tutorials</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-3">Company</h4>
          <ul>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/careers" className="hover:underline">Careers</a></li>
            <li><a href="/press" className="hover:underline">Press</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Your Company, Inc. All rights reserved.
      </div>
    </footer>
  );
}
