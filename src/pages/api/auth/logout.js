import cookie from 'cookie';

const Logout = async (req, res) => {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', [
      cookie.serialize('access', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: new Date(0),
        sameSite: 'lax',
        path: '/'
      })
    ]);
    return res.status(200).json({
      success: true,
    });
  }
}

export default Logout;
