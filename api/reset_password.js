export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { access_token, newPassword } = req.body;

  if (!access_token || !newPassword) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  const SUPABASE_URL = 'https://ayoanqjzciolnahljauc.supabase.co'; // حط هنا رابط مشروعك
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY; // من Environment Variables

  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${access_token}`
    },
    body: JSON.stringify({ password: newPassword })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return res.status(response.status).json({ message: data.message || 'Failed' });
  }

  return res.status(200).json({ message: 'Password updated successfully' });
}
