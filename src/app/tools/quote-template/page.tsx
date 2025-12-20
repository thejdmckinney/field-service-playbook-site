'use client';

import { useState } from 'react';
import Link from 'next/link';
import EmailGate from '@/components/EmailGate';

export default function QuoteTemplate() {
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleEmailSubmit = async (email: string, name?: string) => {
    // Track download
    try {
      await fetch('/api/track-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          source: 'quote-template',
          metadata: { template: selectedTemplate }
        })
      });
    } catch (error) {
      console.error('Error tracking download:', error);
    }

    setShowEmailGate(false);
    setDownloadReady(true);
    
    // Trigger download
    setTimeout(() => {
      window.open('https://docs.google.com/document/d/1example/edit', '_blank');
    }, 500);
  };

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    setShowEmailGate(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <Link 
          href="/tools"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-medium"
        >
          ← Back to Tools
        </Link>
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📄 Professional Quote Template Generator
          </h1>
          <p className="text-xl text-gray-600">
            Create professional quotes and estimates in minutes - completely free
          </p>
        </div>

        {/* Email Gate */}
        {showEmailGate && (
          <div className="mb-8 max-w-2xl mx-auto">
            <EmailGate
              onEmailSubmit={handleEmailSubmit}
              toolName="quote-template"
              title="Get Your Free Template"
              description={`Downloading ${selectedTemplate} template. Enter your email to get instant access.`}
            />
          </div>
        )}

        {/* Download Success */}
        {downloadReady && (
          <div className="mb-8 max-w-2xl mx-auto p-6 bg-green-50 border-2 border-green-200 rounded-lg">
            <h3 className="text-xl font-bold text-green-900 mb-2">
              ✓ Download Starting...
            </h3>
            <p className="text-green-800">
              Your template is downloading. If it doesn't start automatically, 
              <button className="text-blue-600 underline ml-1">click here</button>.
            </p>
          </div>
        )}

        {/* Template Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className={`h-2 ${template.color}`}></div>
              <div className="p-6">
                <div className="text-4xl mb-4">{template.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {template.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Includes:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {template.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleTemplateSelect(template.name)}
                  className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  Download Template
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why Use Professional Quotes?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-orange-600 text-xl">💼</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Look Professional</h3>
                  <p className="text-gray-600 text-sm">
                    Branded templates make you look established and trustworthy
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-orange-600 text-xl">⚡</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Close Faster</h3>
                  <p className="text-gray-600 text-sm">
                    Clear, detailed quotes help customers say yes quickly
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-orange-600 text-xl">🛡️</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Protect Yourself</h3>
                  <p className="text-gray-600 text-sm">
                    Terms and conditions prevent scope creep and disputes
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-orange-600 text-xl">📊</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Track Everything</h3>
                  <p className="text-gray-600 text-sm">
                    Keep records of all quotes for follow-up and analysis
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What Makes a Good Quote?
            </h2>
            <ol className="space-y-4">
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">1.</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Clear Scope of Work</h3>
                  <p className="text-gray-700 text-sm">Detailed list of exactly what's included</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">2.</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Itemized Pricing</h3>
                  <p className="text-gray-700 text-sm">Break down labor, materials, and fees</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">3.</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Timeline & Milestones</h3>
                  <p className="text-gray-700 text-sm">When work starts and expected completion</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">4.</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Payment Terms</h3>
                  <p className="text-gray-700 text-sm">Deposit, progress payments, and final payment</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">5.</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Terms & Conditions</h3>
                  <p className="text-gray-700 text-sm">Protect yourself with clear T&Cs</p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Want to Send Quotes Automatically?
          </h2>
          <p className="text-blue-100 mb-6 text-lg max-w-2xl mx-auto">
            Creative Job Hub lets you create, send, and track quotes from your phone. 
            Customers can approve with one click. No more printing or scanning.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://creativejobhub.com"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try Creative Job Hub Free
            </a>
            <Link
              href="/blog/best-field-service-software-2025"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition"
            >
              Read Software Comparison
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const templates = [
  {
    id: 'standard',
    name: 'Standard Quote',
    icon: '📝',
    color: 'bg-blue-500',
    description: 'Perfect for most jobs - simple and professional',
    features: [
      'Company branding section',
      'Itemized pricing table',
      'Terms & conditions',
      'Signature section',
      'Valid until date'
    ]
  },
  {
    id: 'detailed',
    name: 'Detailed Estimate',
    icon: '📊',
    color: 'bg-purple-500',
    description: 'For larger projects with multiple phases',
    features: [
      'Project timeline',
      'Phase breakdown',
      'Materials list',
      'Payment milestones',
      'Warranty information'
    ]
  },
  {
    id: 'hourly',
    name: 'Time & Materials',
    icon: '⏰',
    color: 'bg-green-500',
    description: 'For hourly work with variable scope',
    features: [
      'Hourly rate breakdown',
      'Estimated hours',
      'Materials markup',
      'Not-to-exceed clause',
      'Change order process'
    ]
  }
];
