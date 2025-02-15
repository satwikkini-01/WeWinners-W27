const { getUser } = require("../service/farmerAuth");

function checkForAuthentication(req, res, next) {
	const tokenCookie = req.cookies?.token;
	req.user = null;

	// If no token, proceed as unauthenticated
	if (!tokenCookie) return next();

	try {
		// Decode user from token
		const user = getUser(tokenCookie);

		// If token is invalid, don't set req.user
		if (!user) return next();

		req.user = user;
	} catch (error) {
		console.error("JWT Verification Error:", error.message);
	}

	return next();
}

module.exports = {
	checkForAuthentication,
};
