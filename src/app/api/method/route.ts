import { NextResponse,NextRequest } from 'next/server';
import admin, { ServiceAccount } from 'firebase-admin';

// Initialize Firebase Admin SDK (if not already initialized)
import serviceAccount from '../student-3e4b3-firebase-adminsdk-fbsvc-5ccac73324.json'; 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
  });
}

export async function GET(req:NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    return new NextResponse(JSON.stringify({ message: 'Secure data', uid: decodedToken.uid }), { status: 200 }); 
  } catch (error) {
    console.error("Token verification failed:", error);
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
}
