import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const cookieStore = cookies();
  const myCookies = {
    reqCookies : req.cookies,
    storeCookies : cookieStore.getAll()
  }
  // console.log('cookies from req: ', req.cookies);
  // console.log('cookies from store: ', cookieStore.getAll());
  return NextResponse.json(myCookies)
}
