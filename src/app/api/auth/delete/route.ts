import {NextRequest,NextResponse} from 'next/server';
import {doc,deleteDoc} from "firebase/firestore";
import {db} from '@/firebase';
export async function DELETE(req:NextRequest){
  try{
    const data = await req.json();
    const {id} = data
    if(!id){
      return NextResponse.json({success:false,error:"Missing id"},{status:400});
    }
    await deleteDoc(doc(db,"students",id));
    return NextResponse.json({success:true},{status:200});
  }catch(err){
    console.log("Error deleting student",err);
    return NextResponse.json({success:false},{status:500});
  }
}