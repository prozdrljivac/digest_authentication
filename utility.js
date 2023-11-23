const crypto = require("crypto");

function getAuthInfo(authHeader) {
  const [_, ...authHeaderInfo] = authHeader.split(" ");
  const authInfo = new Map();

  for (const info of authHeaderInfo) {
    const firstEqualsIndex = info.indexOf("=");
    const key = info.slice(0, firstEqualsIndex);
    const value = info.slice(firstEqualsIndex + 1);
    authInfo.set(key, value.replace(/"/g, "").replace(/,/g, ""));
  }

  return authInfo;
}

function createMd5Hash(authInfo, user, req) {
  const ha1 = crypto
    .createHash("md5")
    .update(
      `${authInfo.get("username")}:${authInfo.get(
        "realm"
      )}:${user.password.trim()}`
    )
    .digest("hex");
  const ha2 = crypto
    .createHash("md5")
    .update(`${req.method}:${req.path}`)
    .digest("hex");
  const expectedResponse = crypto
    .createHash("md5")
    .update(`${ha1}:${authInfo.get("nonce")}:${ha2}`)
    .digest("hex");

  return expectedResponse;
}

module.exports = {
  createMd5Hash,
  getAuthInfo,
};
