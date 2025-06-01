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

// Add this type for Supabase row
type FlyerRow = {
  id: number;
  product_type: string;
  flyer_index: number;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

// GET - Retrieve all flyer images (public access)
export async function GET(): Promise<NextResponse<FlyersResponse>> {
  try {
    const { data: flyers, error } = await supabase
      .from('flyer_metadata')
      .select('*');

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Group flyers by product type
    const groupedFlyers: Record<string, FlyerMetadata[]> = {};
    flyers.forEach((flyer: FlyerRow) => {
      try {
        if (!flyer.image_url || flyer.image_url === 'EMPTY') {
          console.warn('Skipping flyer without imageUrl:', flyer);
          return;
        }
        const productType = flyer.product_type || flyer.image_url.split('/')[0];
        if (!groupedFlyers[productType]) {
          groupedFlyers[productType] = [];
        }
        groupedFlyers[productType].push({
          name: flyer.name,
          description: flyer.description,
          imageUrl: flyer.image_url,
        });
      } catch (err) {
        console.error('Error processing flyer:', { flyer, error: err });
      }
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