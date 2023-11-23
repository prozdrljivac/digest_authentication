const crypto = require("crypto");
const express = require("express");

const utility = require("./utility");

const app = express();

const users = {
  admin: { password: "admin" },
};

function authentication(req, res, next) {
  const unauthorized = () => {
    const nonce = crypto.randomBytes(16).toString("base64");
    res
      .status(401)
      .header("WWW-Authenticate", `Digest nonce=${nonce}`)
      .send("Authentication required");
  };

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    unauthorized();
    return;
  }

  const authInfo = utility.getAuthInfo(authHeader);
  const user = users[authInfo.get("username")];
  if (!user) {
    unauthorized();
    return;
  }

  const expectedResponse = utility.createMd5Hash(authInfo, user, req);
  if (expectedResponse !== authInfo.get("response")) {
    unauthorized();
    return;
  }

  next();
}

app.use(authentication);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
