import client from "./client";

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

export const searchFriend = async (search, userId) => {
  try {
    const { data } = await client.get(
      `/friend/search/?name=${search}&userId=${userId}`
    );
    return data;
  } catch (err) {
    const { response } = err;

    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};

export const acceptFriendRequest = async (userId, friendId) => {
  try {
    const { data } = await client.post("/friend/accept-request", {
      userId,
      friendId,
    });
    return data;
  } catch (err) {
    const { response } = err;

    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};

export const rejectFriendRequest = async (userId, friendId) => {
  try {
    const { data } = await client.post("/friend/reject-request", {
      userId,
      friendId,
    });
    return data;
  } catch (err) {
    const { response } = err;

    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};

export const addFriend = async (friendId, userId) => {
  try {
    const { data } = await client.post('/friend/add-friend', {
      userId,
      friendId,
    });
    return data;
  } catch (err) {
    const { response } = err;

    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};


export const cancelFriendRequest = async (userId, friendId) => {
  try {
    const { data } = await client.post('/friend/cancel-request', {
      userId,
      friendId,
    });
    return data;
  } catch (err) {
    const { response } = err;

    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};

export const removeFriend = async (userId, friendId) => {
  try {
    const { data } = await client.post('/friend/remove-friend', {
      userId,
      friendId,
    });
    return data;
  } catch (err) {
    const { response } = err;

    if (response?.data) return response.data;

    return { error: err.message || err };
  }
};


