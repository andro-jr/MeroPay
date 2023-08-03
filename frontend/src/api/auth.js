import client from './client';

export const signInUser = async (userInfo) => {
  try {
    const { data } = await client.post('/user/sign-in', userInfo);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};

export const getisAuth = async (token) => {
  try {
    const { data } = await client.get('/user/is-auth', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};