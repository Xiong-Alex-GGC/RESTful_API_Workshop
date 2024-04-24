// middleware/auth.js

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    const secretToken = 'secretToken';

    if (!token || token !== `Bearer ${secretToken}`) {
        return res.status(401).json({ message: 'Unauthorized. Token is required for access.' });
    }

    next();
}

module.exports = { authenticateToken };
