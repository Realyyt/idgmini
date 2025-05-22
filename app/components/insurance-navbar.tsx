"use client"

import Link from 'next/link';
import { useState } from 'react';

export default function InsuranceNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-800">
            Insurance Portal
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-600 hover:text-blue-800">
              Products
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-800">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-800">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/products"
                className="block px-3 py-2 text-gray-600 hover:text-blue-800"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-600 hover:text-blue-800"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-gray-600 hover:text-blue-800"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 