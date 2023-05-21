import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { SismoConnectVerifiedResult, AuthType, SismoConnect } from "@sismo-core/sismo-connect-server";
import { ethers } from "ethers";

import { unCompressResponse } from "@sismo-core/sismo-connect-client/src/utils/unCompressResponse";

import { sismoConfig } from "@/lib/sismo";
const sismoConnect = SismoConnect(sismoConfig);

export async function GET(request: NextRequest) {
  console.log("callback/signin");
  const url = request.nextUrl.clone();
  const sismoConnectResponseCompressed = request.nextUrl.searchParams.get("sismoConnectResponseCompressed");
  if (!sismoConnectResponseCompressed) {
    url.pathname = `/`;
    return NextResponse.redirect(url);
  }
  const cookieStore = cookies();
  const sismoConnectResponse = JSON.parse(unCompressResponse(sismoConnectResponseCompressed));
  const message = sismoConnectResponse.signedMessage;
  const { claims } = sismoConnectResponse.proofs.find(({ claims }: any) => claims);
  const result: SismoConnectVerifiedResult = await sismoConnect.verify(sismoConnectResponse, {
    auths: [{ authType: AuthType.VAULT }],
    claims,
    signature: { message },
  });
  const userId = result.getUserId(AuthType.VAULT) || "";
  const groupIds = claims.map(({ groupId }: any) => groupId);
  let messageBytes = ethers.utils.toUtf8Bytes(message);
  let salt = ethers.utils.keccak256(messageBytes);
  url.pathname = `/account`;
  url.searchParams.delete("sismoConnectResponseCompressed");
  url.searchParams.set("userId", userId);
  url.searchParams.set("groupIds", groupIds);
  url.searchParams.set("salt", salt);
  cookieStore.set({
    name: "groupIds",
    value: groupIds,
  });
  cookieStore.set({
    name: "salt",
    value: salt,
  });
  return NextResponse.redirect(url);
}
