import { NextResponse, NextRequest } from "next/server";
import {
  SismoConnectVerifiedResult,
  AuthType,
  SismoConnect,
  SismoConnectServerConfig,
} from "@sismo-core/sismo-connect-server";
import { ethers } from "ethers";

import { unCompressResponse } from "@sismo-core/sismo-connect-client/src/utils/unCompressResponse";

const config: SismoConnectServerConfig = {
  appId: "0x49c751f1595e8b3016096a7df01d2a96",
};

const sismoConnect = SismoConnect(config);

export async function GET(request: NextRequest) {
  const sismoConnectResponseCompressed = request.nextUrl.searchParams.get("sismoConnectResponseCompressed");
  const sismoConnectResponse = JSON.parse(unCompressResponse(sismoConnectResponseCompressed));
  const message = sismoConnectResponse.signedMessage;
  const result: SismoConnectVerifiedResult = await sismoConnect.verify(sismoConnectResponse, {
    auths: [{ authType: AuthType.VAULT }],
    signature: { message },
  });
  const userId = result.getUserId(AuthType.VAULT) || "";
  const url = request.nextUrl.clone();

  let messageBytes = ethers.utils.toUtf8Bytes(message);
  let salt = ethers.utils.keccak256(messageBytes);

  url.pathname = `/account`;
  url.searchParams.delete("sismoConnectResponseCompressed");
  url.searchParams.set("userId", userId);
  url.searchParams.set("salt", salt);
  return NextResponse.redirect(url);
}
