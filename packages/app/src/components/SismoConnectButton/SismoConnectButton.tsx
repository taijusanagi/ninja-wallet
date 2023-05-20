// "use client";

import {
  SismoConnectButton as _SismoConnectButton,
  AuthType,
  SismoConnectClientConfig,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";

export const SismoConnectButton = () => {
  const config: SismoConnectClientConfig = {
    appId: "0x49c751f1595e8b3016096a7df01d2a96",
  };

  return (
    <_SismoConnectButton
      config={config}
      auth={{ authType: AuthType.VAULT }}
      signature={{ message: "Your message" }}
      onResponseBytes={async (bytes: string) => {
        console.log("onResponseBytes", bytes);
      }}
    />
  );
};
