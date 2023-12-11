import client from "./client";

export const ownerDetail = async (userId) => {
    try {
      const { data } = await client.get(`/user/details/${userId}`)
      // console.log(data);
      return data;
    } catch (err) {
      const { response } = err;
  
      if (response?.data) return response.data;
  
      return { error: err.message || err };
    }
};


