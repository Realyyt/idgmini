import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';

interface FlyerMetadata {
  name: string;
  description: string;
  imageUrl: string;
}

interface FlyersResponse {
  success: boolean;
  flyers?: Record<string, FlyerMetadata[]>;
  error?: string;
}

// GET - Retrieve all flyer images (public access)
export async function GET(): Promise<NextResponse<FlyersResponse>> {
  try {
    const { data: flyers, error } = await supabase
      .from('flyers')
      .select('*');

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Group flyers by product type
    const groupedFlyers: Record<string, FlyerMetadata[]> = {};
    flyers.forEach((flyer: FlyerMetadata) => {
      const productType = flyer.imageUrl.split('/')[0];
      if (!groupedFlyers[productType]) {
        groupedFlyers[productType] = [];
      }
      groupedFlyers[productType].push(flyer);
    });

    return NextResponse.json({ success: true, flyers: groupedFlyers });
  } catch (error) {
    console.error('Error fetching flyers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch flyers' },
      { status: 500 }
    );
  }
} 