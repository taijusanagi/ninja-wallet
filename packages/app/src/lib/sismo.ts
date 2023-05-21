import { ungzip } from "pako";
import { toUint8Array } from "js-base64";

import { appId } from "../../../contracts/lib/sismo";

export const sismoConfig = {
  appId,
};

export const unCompressResponse = (data: any) => ungzip(toUint8Array(data), { to: "string" });
