import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Fetch the file
    const response = await fetch(url);
    const blob = await response.blob();

    // Get filename from URL
    const filename = url.split('/').pop() || 'flyer';

    // Create headers with proper content disposition
    const headers = new Headers();
    headers.set('Content-Type', response.headers.get('Content-Type') || 'application/octet-stream');
    headers.set('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`);
    headers.set('Content-Length', blob.size.toString());
    headers.set('Cache-Control', 'no-cache');
    headers.set('Pragma', 'no-cache');

    // Return the file with proper headers
    return new NextResponse(blob, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
} 