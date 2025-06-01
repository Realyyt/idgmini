import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// In production, use environment variables and proper hashing
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME ,
  password: process.env.ADMIN_PASSWORD
};

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Create a simple session token (in production, use JWT or proper session management)
      const sessionToken = btoa(`${username}:${Date.now()}`);
      
      // Set secure HTTP-only cookie
      const response = NextResponse.json({ 
        success: true, 
        message: 'Login successful' 
      });
      
      response.cookies.set('admin-session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return response;
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid credentials' 
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ 
      error: 'Authentication failed' 
    }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
    
    // Clear the session cookie
    response.cookies.delete('admin-session');
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ 
      error: 'Logout failed' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin-session');

    if (sessionToken && sessionToken.value) {
      // Simple token validation (in production, use proper JWT verification)
      try {
        const decoded = atob(sessionToken.value);
        const [username, timestamp] = decoded.split(':');
        const sessionAge = Date.now() - parseInt(timestamp);
        
        // Check if session is still valid (24 hours)
        if (sessionAge < 60 * 60 * 24 * 1000 && username === ADMIN_CREDENTIALS.username) {
          return NextResponse.json({ 
            success: true, 
            authenticated: true 
          });
        }
      } catch {
        // Invalid token format
      }
    }

    return NextResponse.json({ 
      success: false, 
      authenticated: false 
    }, { status: 401 });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ 
      error: 'Authentication check failed' 
    }, { status: 500 });
  }
} 