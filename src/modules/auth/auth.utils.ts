import crypto from "node:crypto";

/**
 * Hash a plain text password with a secure random salt using scrypt
 */
export const hashPassword = (password: string): string => {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
};

/**
 * Verify a password against a stored salt:hash string
 */
export const verifyPassword = (password: string, storedHash: string): boolean => {
  if (!storedHash || !storedHash.includes(":")) {
    return false;
  }
  const [salt, key] = storedHash.split(":");
  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(keyBuffer, derivedKey);
};

/**
 * Parse expiration string (e.g. '7d', '24h', '30m', '60s') into seconds
 */
const parseExpiresIn = (expiresIn: string | number = "7d"): number => {
  if (typeof expiresIn === "number") {
    return expiresIn;
  }

  const unit = expiresIn.slice(-1);
  const value = parseInt(expiresIn.slice(0, -1), 10);

  if (isNaN(value)) {
    return 7 * 24 * 60 * 60; // default 7 days in seconds
  }

  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 24 * 60 * 60;
    default:
      return 7 * 24 * 60 * 60;
  }
};

/**
 * Create a standard HMAC-SHA256 JWT Token
 */
export const createToken = (
  payload: Record<string, any>,
  secret: string,
  expiresIn: string | number = "7d"
): string => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const nowInSeconds = Math.floor(Date.now() / 1000);
  const expirationSeconds = parseExpiresIn(expiresIn);

  const fullPayload = {
    ...payload,
    iat: nowInSeconds,
    exp: nowInSeconds + expirationSeconds,
  };

  const encodedHeader = Buffer.from(JSON.stringify(header))
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const encodedPayload = Buffer.from(JSON.stringify(fullPayload))
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

/**
 * Verify and decode an HMAC-SHA256 JWT Token
 */
export const verifyToken = (token: string, secret: string): any => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT token format");
  }

  const [encodedHeader, encodedPayload, signature] = parts;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const sigBuffer = Buffer.from(signature);
  const expSigBuffer = Buffer.from(expectedSignature);

  if (sigBuffer.length !== expSigBuffer.length || !crypto.timingSafeEqual(sigBuffer, expSigBuffer)) {
    throw new Error("Invalid token signature");
  }

  // Base64URL decode payload
  const base64 = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = Buffer.from(base64, "base64").toString("utf8");
  const decoded = JSON.parse(jsonPayload);

  // Check expiration
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (decoded.exp && decoded.exp < currentTimestamp) {
    throw new Error("Token has expired");
  }

  return decoded;
};
