import axios from 'axios';

export const isAuthenticated = async (accessToken) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/token/verify/`, 
      { token: accessToken }
    );
    if (response.status === 200) return true;
    return false;
  } catch (err) {
    return false;
  }
}
