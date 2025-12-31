import crypto from "crypto";

export const normalizeCurp = (curp: string) => curp.trim().toUpperCase();

export const hashCurpHmac = (secret: string, curp: string) => {
  return crypto.createHmac("sha256", secret).update(normalizeCurp(curp)).digest("hex");
};
