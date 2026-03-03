"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-xl text-gray-900">
              Teardown<span className="text-brand-600">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#how-it-works"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#pricing"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/demo"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Examples
            </Link>
            <Link
              href="/try-it"
              className="text-brand-600 hover:text-brand-700 text-sm font-bold transition-colors"
            >
              Try It Live
            </Link>
            <Link
              href="/contact"
              className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              <Link
                href="/#how-it-works"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/#pricing"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/demo"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Examples
              </Link>
              <Link
                href="/try-it"
                className="text-brand-600 hover:text-brand-700 text-sm font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Try It Live
              </Link>
              <Link
                href="/contact"
                className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-lg text-sm font-semibold text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
