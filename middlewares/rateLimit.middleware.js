const requests = new Map();

export function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();

  if (!requests.has(ip)) {
    requests.set(ip, []);
  }

  const timestamps = requests.get(ip).filter(t => now - t < 60000);
  timestamps.push(now);
  requests.set(ip, timestamps);

  if (timestamps.length > 60) {
    return res.status(429).json({ error: "Muitas requisições" });
  }

  next();
}
