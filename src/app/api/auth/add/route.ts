import {NextRequest,NextResponse} from 'next/server';
import {db} from '@/firebase';
import {collection,addDoc} from "firebase/firestore"
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const studentCollection = collection(db, "students");
    const docRef = await addDoc(studentCollection, data);
    return NextResponse.json({ success: true, docRef: docRef.id });
  } 
  catch (err) {
    console.log("Error adding student", err);
    return NextResponse.json({ success: false}, { status: 500 });
  }
}