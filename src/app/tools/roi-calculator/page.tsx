'use client';

import { useState } from 'react';
import EmailGate from '@/components/EmailGate';
import Link from 'next/link';

export default function ROICalculator() {
  const [currentRevenue, setCurrentRevenue] = useState('10000');
  const [hoursOnAdmin, setHoursOnAdmin] = useState('10');
  const [missedFollowUps, setMissedFollowUps] = useState('3');
  const [showResults, setShowResults] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);

  // Calculations
  const revenue = parseFloat(currentRevenue) || 0;
  const adminHours = parseFloat(hoursOnAdmin) || 0;
  const missedJobs = parseFloat(missedFollowUps) || 0;

  const avgHourlyValue = revenue / 160; // Assuming 160 work hours/month
  const timeSavingsValue = (adminHours * 0.7) * avgHourlyValue; // Save 70% of admin time
  const avgJobValue = revenue / 20; // Assuming 20 jobs per month
  const recoveredRevenue = missedJobs * avgJobValue * 0.5; // Recover 50% of missed opportunities
  
  const monthlyROI = timeSavingsValue + recoveredRevenue;
  const yearlyROI = monthlyROI * 12;
  const softwareCost = 49; // Creative Job Hub monthly cost
  const netMonthlyGain = monthlyROI - softwareCost;
  const netYearlyGain = netMonthlyGain * 12;
  const roiPercentage = ((netMonthlyGain / softwareCost) * 100).toFixed(0);

  const handleEmailSubmit = (email: string, name?: string) => {
    setShowEmailGate(false);
    setShowResults(true);
  };

  const handleCalculate = () => {
    // Show email gate when calculate button is clicked
    setShowEmailGate(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4">
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
            📊 FSM Software ROI Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Calculate how much money field service software could save your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calculator Inputs */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Current Situation</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Revenue ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500 text-lg">$</span>
                  <input
                    type="number"
                    value={currentRevenue}
                    onChange={(e) => setCurrentRevenue(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                    step="1000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours per Month on Admin Work
                </label>
                <input
                  type="number"
                  value={hoursOnAdmin}
                  onChange={(e) => setHoursOnAdmin(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="0"
                  max="80"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Scheduling, invoicing, follow-ups, paperwork, etc.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Missed Follow-ups per Month
                </label>
                <input
                  type="number"
                  value={missedFollowUps}
                  onChange={(e) => setMissedFollowUps(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="0"
                  max="50"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Estimates never sent, callbacks forgotten, etc.
                </p>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full mt-8 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
            >
              Calculate My ROI →
            </button>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                💡 <strong>Did you know?</strong> The average field service business spends 15-20 hours per month on admin tasks that could be automated.
              </p>
            </div>
          </div>

          {/* Results Preview (Blurred) */}
          <div className="relative">
            <div className={`bg-white rounded-lg shadow-lg p-8 ${!showResults ? 'blur-sm' : ''}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Potential Savings</h2>
              
              <div className="space-y-6">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <div className="text-sm text-gray-600 mb-2">Monthly ROI</div>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    ${monthlyROI.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-sm text-gray-600">
                    After ${softwareCost}/mo software cost: <span className="font-semibold text-green-700">${netMonthlyGain.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <div className="text-sm text-gray-600 mb-1">Yearly Savings</div>
                  <div className="text-3xl font-bold text-purple-600">
                    ${netYearlyGain.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>

                <div className="border-b pb-4">
                  <div className="text-sm text-gray-600 mb-1">ROI Percentage</div>
                  <div className="text-3xl font-bold text-blue-600">
                    {roiPercentage}%
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Return on investment</p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Breakdown:</h3>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">Time Savings Value</span>
                    <span className="font-semibold text-gray-900">
                      ${timeSavingsValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">Recovered Revenue</span>
                    <span className="font-semibold text-gray-900">
                      ${recoveredRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                    </span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">⚡ Payback Period</div>
                  <p className="text-2xl font-bold text-gray-900">
                    {(softwareCost / monthlyROI * 30).toFixed(0)} days
                  </p>
                </div>
              </div>
            </div>

            {/* Email Gate Overlay */}
            {showEmailGate && (
              <EmailGate
                toolName="roi-calculator"
                onEmailSubmit={handleEmailSubmit}
                title="See Your Full ROI Analysis"
                description="Get your complete savings breakdown and learn how to maximize your return with the right software."
              />
            )}
          </div>
        </div>

        {/* CTA Section (shown after email) */}
        {showResults && (
          <div className="mt-12 space-y-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Start Saving ${netMonthlyGain.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/month?
              </h3>
              <p className="text-blue-100 mb-6 text-lg">
                Creative Job Hub is built for contractors like you. No bloated features, no confusing interfaces - just tools that save you time and make you money.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://creativejobhub.com"
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition text-lg"
                >
                  Start Free Trial →
                </a>
                <Link
                  href="/tools/software-comparison"
                  className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Compare All Options
                </Link>
              </div>
            </div>

            {/* Social Proof */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">70%</div>
                <div className="text-sm text-gray-600">Less time on admin work</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">$12K+</div>
                <div className="text-sm text-gray-600">Average annual savings</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24 hrs</div>
                <div className="text-sm text-gray-600">Average payback period</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
