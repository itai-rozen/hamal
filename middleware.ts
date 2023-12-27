import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  const response = NextResponse.next();
  if (req.nextUrl.pathname === '/setCookie') {
    console.log('path')
    if (!req.cookies.has('itai')){
      console.log('hasnt')
      response.cookies.set('itai', 'hi');
      response.cookies.set('hamal_user_id', '1', { expires: Date.now()+10000, path: '/' });    
    }
  }
  return response;
}