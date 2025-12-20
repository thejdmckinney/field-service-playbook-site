'use client';

import { useState } from 'react';
import Link from 'next/link';
import EmailGate from '@/components/EmailGate';

export default function TimeTrackingTemplate() {
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleEmailSubmit = async (email: string, name?: string) => {
    // Track download in Supabase
    try {
      await fetch('/api/track-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          source: 'time-tracking-template',
          metadata: { tool: 'time-tracking-template' }
        })
      });
    } catch (error) {
      console.error('Error tracking download:', error);
    }

    setShowEmailGate(false);
    setDownloadReady(true);
    
    // Trigger download
    setTimeout(() => {
      window.open('https://docs.google.com/spreadsheets/d/1example/edit#gid=0', '_blank');
    }, 500);
  };

  const handleDownload = () => {
    setShowEmailGate(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
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
            ⏱️ Time Tracking Template for Field Service
          </h1>
          <p className="text-xl text-gray-600">
            Free spreadsheet to track billable hours, job time, and labor costs
          </p>
        </div>

        {/* Email Gate */}
        {showEmailGate && (
          <div className="mb-8">
            <EmailGate
              onEmailSubmit={handleEmailSubmit}
              toolName="time-tracking-template"
              title="Get Your Free Template"
              description="Enter your email to download the time tracking template"
            />
          </div>
        )}

        {/* Download Success */}
        {downloadReady && (
          <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-lg">
            <h3 className="text-xl font-bold text-green-900 mb-2">
              ✓ Download Starting...
            </h3>
            <p className="text-green-800">
              Your template is downloading. If it doesn't start automatically, 
              <button className="text-blue-600 underline ml-1">click here</button>.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Template Preview */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Daily Time Log</h3>
                  <p className="text-gray-600 text-sm">Track start/end times for each job</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Billable vs Non-Billable</h3>
                  <p className="text-gray-600 text-sm">Separate billable hours from admin time</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Labor Cost Tracking</h3>
                  <p className="text-gray-600 text-sm">Calculate actual labor costs per job</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Weekly Summary</h3>
                  <p className="text-gray-600 text-sm">Auto-calculated totals and reports</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Job-by-Job Breakdown</h3>
                  <p className="text-gray-600 text-sm">See time spent on each customer</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Excel & Google Sheets</h3>
                  <p className="text-gray-600 text-sm">Works with both platforms</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full mt-8 px-6 py-4 bg-purple-600 text-white rounded-lg font-bold text-lg hover:bg-purple-700 transition-colors"
            >
              Download Free Template
            </button>
          </div>

          {/* Why Track Time */}
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Why Track Your Time?
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Know which jobs are actually profitable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Quote more accurately on future jobs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Identify where you waste time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Bill customers correctly for your time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Improve efficiency and productivity</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How to Use This Template
              </h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="font-bold text-purple-600">1.</span>
                  <span>Download and open in Excel or Google Sheets</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-purple-600">2.</span>
                  <span>Enter your hourly rate and overhead costs</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-purple-600">3.</span>
                  <span>Log time daily as you complete jobs</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-purple-600">4.</span>
                  <span>Review weekly summary to spot trends</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-purple-600">5.</span>
                  <span>Use data to improve your pricing and efficiency</span>
                </li>
              </ol>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                💡 Pro Tip
              </h3>
              <p className="text-gray-700">
                Most contractors think they're profitable until they track their time. 
                Use this for 30 days and you'll discover which jobs are actually making you money.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Want Automatic Time Tracking?
          </h2>
          <p className="text-blue-100 mb-6 text-lg">
            Creative Job Hub tracks time automatically with GPS check-in/out, mobile app, and real-time reporting.
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
              href="/tools/software-comparison"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition"
            >
              Compare Software
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
