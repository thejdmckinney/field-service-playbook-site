import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, name, business_type, source, action, metadata } = await request.json();

    // Validate required fields
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    if (!source || !action) {
      return NextResponse.json(
        { error: 'Source and action are required' },
        { status: 400 }
      );
    }

    // Track the lead
    const { data, error } = await supabase
      .from('lead_tracking')
      .insert([
        {
          email: email.toLowerCase().trim(),
          name: name?.trim() || null,
          business_type: business_type || null,
          source,
          action,
          metadata: {
            ...metadata,
            user_agent: request.headers.get('user-agent'),
            referrer: request.headers.get('referer'),
            timestamp: new Date().toISOString(),
          },
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Lead tracking error:', error);
      return NextResponse.json(
        { error: 'Failed to track lead' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead tracked successfully',
        data 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Lead tracking API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
