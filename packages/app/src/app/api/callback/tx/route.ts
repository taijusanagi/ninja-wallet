import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { SismoConnectVerifiedResult, AuthType, SismoConnect } from "@sismo-core/sismo-connect-server";

import { sismoConfig, unCompressResponse } from "@/lib/sismo";
const sismoConnect = SismoConnect(sismoConfig);

export async function GET(request: NextRequest) {
  console.log("callback/tx");
  const url = request.nextUrl.clone();
  const sismoConnectResponseCompressed = request.nextUrl.searchParams.get("sismoConnectResponseCompressed");
  if (!sismoConnectResponseCompressed) {
    url.pathname = `/`;
    return NextResponse.redirect(url);
  }
  const cookieStore = cookies();
  const sismoConnectResponse = JSON.parse(unCompressResponse(sismoConnectResponseCompressed));
  const message = sismoConnectResponse.signedMessage;
  const result: SismoConnectVerifiedResult = await sismoConnect.verify(sismoConnectResponse, {
    auths: [{ authType: AuthType.VAULT }],
    signature: { message },
  });
  const userId = result.getUserId(AuthType.VAULT) || "";
  const groupIds = cookieStore.get("groupIds")?.value || "";
  const salt = cookieStore.get("salt")?.value || "";
  let userOpHash = message;
  url.pathname = `/account`;
  url.searchParams.set("userId", userId);
  url.searchParams.set("groupIds", groupIds);
  url.searchParams.set("salt", salt);
  url.searchParams.set("userOpHash", userOpHash);
  return NextResponse.redirect(url);
}
