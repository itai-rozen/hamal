"use server"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET() {
  // await cookies().set('itai', 'hi');
  // const cks : RequestCookie|RequestCookie[]|undefined =  cookies().get('itai')   
  // return NextResponse.json(cks);
}