import axios from 'axios';

export const isAuthenticated = async (accessToken) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/api/token/verify/`, 
      { token: accessToken }
    );
    console.log({ response });
    if (response.status === 200) return true;
    return false;
  } catch (err) {
    console.log({ err });
    return false;
  }
}
