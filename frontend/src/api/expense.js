import client from "./client";

export const createExpense = async ({ owner, total, members }) => {
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

export const toPayExpense = async (userId) => {
  try {
    const { data } = await client.get(`/expense/to-pay/${userId}`);
    // console.log(data);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) return response.data;
    return { error: err.message || err };
  }
};

export const toReceiveExpense = async (userId) => {
  try {
    const { data } = await client.get(`/expense/to-receive/${userId}`);
    // console.log(data);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) return response.data;
    return { error: err.message || err };
  }
};

export const singleExpenseDetail = async (expenseId) => {
  try {
    const { data } = await client.get(`/expense/details/${expenseId}`);
    // console.log(data);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) return response.data;
    return { error: err.message || err };
  }
};

export const updateExpense = async (formData) => {
  console.log("check");
  try {
    const { data } = await client.post(`/expense/update`, formData);
    console.log(data);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) return response.data;
    return { error: err.message || err };
  }
};
