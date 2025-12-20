'use client';

import { useState, FormEvent } from 'react';

interface EmailGateProps {
  toolName: string;
  onEmailSubmit: (email: string, name?: string) => void;
  title?: string;
  description?: string;
}

export default function EmailGate({ 
  toolName, 
  onEmailSubmit,
  title = "Get Your Results",
  description = "Enter your email to see your personalized results. We'll also send you a copy for your records."
}: EmailGateProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track the lead in Supabase
      await fetch('/api/track-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          name: name.trim() || null,
          source: toolName,
          action: 'tool_usage',
          metadata: {
            tool: toolName,
            timestamp: new Date().toISOString(),
          },
        }),
      });

      // Call parent callback with email
      onEmailSubmit(email, name);
    } catch (error) {
      console.error('Error tracking lead:', error);
      // Still show results even if tracking fails
      onEmailSubmit(email, name);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="gate-name" className="block text-sm font-medium text-gray-700 mb-1">
              Name (optional)
            </label>
            <input
              type="text"
              id="gate-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="gate-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="gate-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Loading...' : 'Show My Results →'}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          🔒 We respect your privacy. Your email is safe with us.
        </p>
      </div>
    </div>
  );
}
