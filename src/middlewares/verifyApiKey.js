const API_KEY = process.env.API_KEY

export default function verifyApiKey(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const [, key] = req.headers.authorization.split(' ');
    if (key && key === API_KEY) {
        next();
    } else {
        res.status(403).json({ error: "Forbidden" });
    }
}