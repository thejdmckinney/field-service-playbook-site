import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, name, source } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Validate source
    if (!source) {
      return NextResponse.json(
        { error: 'Source is required' },
        { status: 400 }
      );
    }

    // Insert newsletter signup
    const { data: signupData, error: signupError } = await supabase
      .from('newsletter_signups')
      .insert([
        {
          email: email.toLowerCase().trim(),
          name: name?.trim() || null,
          source,
        },
      ])
      .select()
      .single();

    if (signupError) {
      // Check if it's a duplicate email error
      if (signupError.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already subscribed!' },
          { status: 409 }
        );
      }
      
      console.error('Signup error:', signupError);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    // Track the lead
    const { error: trackingError } = await supabase
      .from('lead_tracking')
      .insert([
        {
          email: email.toLowerCase().trim(),
          name: name?.trim() || null,
          source,
          action: 'newsletter_signup',
          metadata: {
            user_agent: request.headers.get('user-agent'),
            referrer: request.headers.get('referer'),
          },
        },
      ]);

    if (trackingError) {
      console.error('Tracking error:', trackingError);
      // Don't fail the request if tracking fails
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed!',
        data: signupData 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
