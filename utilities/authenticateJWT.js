const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri: "https://utahfcc.us.auth0.com/.well-known/jwks.json", // Auth0 JWKS URI
});

const getKey = (header, callback) => {
	console.log("xxx", process.env.AUTH0_JWKSURI);
	if(!header.kid) {
		return callback(new Error("No 'kid' found in JWT header"))
	}
  // Get the key from the JWKS
  client.getSigningKey(header.kid, (err, key) => {
		
    if (err) {
      return callback(err);
    }
    callback(null, key.publicKey || key.rsaPublicKey);
  });
};

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

	console.log("toekN", token)

  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, user) => {
    if (err) {
			console.error(err)
      return res.status(403).json({ message: "Invalid token." });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
