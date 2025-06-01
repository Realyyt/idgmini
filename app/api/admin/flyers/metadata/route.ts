import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

interface FlyerMetadata {
  name: string;
  description: string;
  imageUrl: string;
}

export async function PUT(request: Request) {
  try {
    const { productType, index, metadata }: { 
      productType: string; 
      index: number; 
      metadata: FlyerMetadata 
    } = await request.json();

    // Validate input
    if (!productType || typeof index !== 'number' || !metadata) {
      return NextResponse.json(
        { success: false, error: 'Invalid input parameters' },
        { status: 400 }
      );
    }

    // Update metadata in Supabase
    const { error } = await supabase
      .from('flyer_metadata')
      .upsert({
        product_type: productType,
        flyer_index: index,
        name: metadata.name,
        description: metadata.description,
        image_url: metadata.imageUrl
      }, {
        onConflict: 'product_type,flyer_index'
      });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating flyer metadata:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update flyer metadata' },
      { status: 500 }
    );
  }
} 