'use client';

import { useState } from 'react';
import EmailGate from '@/components/EmailGate';

export default function PricingCalculator() {
  const [hourlyRate, setHourlyRate] = useState('75');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [materialsMarkup, setMaterialsMarkup] = useState('20');
  const [showResults, setShowResults] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Calculate results
  const rate = parseFloat(hourlyRate) || 0;
  const hours = parseFloat(hoursPerWeek) || 0;
  const markup = parseFloat(materialsMarkup) || 0;

  const weeklyRevenue = rate * hours;
  const monthlyRevenue = weeklyRevenue * 4.33;
  const yearlyRevenue = monthlyRevenue * 12;
  const avgMaterialsPerJob = 500;
  const materialsProfit = (avgMaterialsPerJob * markup) / 100;

  const handleEmailSubmit = (email: string, name?: string) => {
    setUserEmail(email);
    setShowEmailGate(false);
    setShowResults(true);
  };

  const handleCalculate = () => {
    // Show email gate when calculate button is clicked
    setShowEmailGate(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            💰 Pricing Calculator for Field Service Businesses
          </h1>
          <p className="text-xl text-gray-600">
            Calculate the perfect hourly rate to hit your revenue goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calculator Inputs */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Numbers</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hourly Rate ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500 text-lg">$</span>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="5"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Average for handymen: $50-$100/hr</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billable Hours per Week
                </label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="80"
                />
                <p className="text-sm text-gray-500 mt-1">Most solo pros bill 25-40 hours/week</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Materials Markup (%)
                </label>
                <input
                  type="number"
                  value={materialsMarkup}
                  onChange={(e) => setMaterialsMarkup(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="100"
                />
                <p className="text-sm text-gray-500 mt-1">Industry standard: 15-30%</p>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Calculate My Earnings →
            </button>
          </div>

          {/* Results Preview (Blurred) */}
          <div className="relative">
            <div className={`bg-white rounded-lg shadow-md p-8 ${!showResults ? 'blur-sm' : ''}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Potential Revenue</h2>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <div className="text-sm text-gray-600 mb-1">Weekly Revenue</div>
                  <div className="text-3xl font-bold text-blue-600">
                    ${weeklyRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>

                <div className="border-b pb-4">
                  <div className="text-sm text-gray-600 mb-1">Monthly Revenue</div>
                  <div className="text-3xl font-bold text-green-600">
                    ${monthlyRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>

                <div className="border-b pb-4">
                  <div className="text-sm text-gray-600 mb-1">Yearly Revenue</div>
                  <div className="text-4xl font-bold text-purple-600">
                    ${yearlyRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">💡 Pro Tip</div>
                  <p className="text-sm text-gray-600">
                    Add ${materialsProfit.toFixed(0)} profit per job with your {markup}% materials markup
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">📈 Growth Potential</div>
                  <p className="text-sm text-gray-600">
                    Increase your rate by just $10/hr = ${((rate + 10) * hours * 4.33 * 12 - yearlyRevenue).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} more per year!
                  </p>
                </div>
              </div>
            </div>

            {/* Email Gate Overlay */}
            {showEmailGate && (
              <EmailGate
                toolName="pricing-calculator"
                onEmailSubmit={handleEmailSubmit}
                title="See Your Full Results"
                description="Get your personalized pricing breakdown and proven strategies to increase your rates."
              />
            )}
          </div>
        </div>

        {/* Additional Insights (shown after email) */}
        {showResults && (
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Want to Track This Revenue Automatically?</h3>
            <p className="text-blue-100 mb-6 text-lg">
              Job Flow Hub helps you track every dollar, manage jobs, and invoice faster - so you actually hit these numbers.
            </p>
            <div className="flex gap-4">
              <a
                href="https://creativejobhub.com"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Try Free for 14 Days
              </a>
              <a
                href="/tools/software-comparison"
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Compare Software
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
