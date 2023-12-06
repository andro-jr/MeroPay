import client from "./client";

export const createExpense = async ({owner, total, members}) => {
  try {
    const { data } = await client.post("/expense/create", {
      owner,
      total,
      members,
    });
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) return response.data;
    return { error: err.message || err };
  }
};

