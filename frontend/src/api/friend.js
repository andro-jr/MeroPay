import client from './client';

export const getAllFriends = async (userId) => {
  try {
    const { data } = await client.get(`/friend/all-friends/${userId}`);
    return data;
  } catch (err) {
    const { response } = err;

    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};

export const getPendingFriends = async (userId) => {
  try {
    const { data } = await client.get(`/friend/pending-requests/${userId}`);
    return data;
  } catch (err) {
    const { response } = err;

    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};