import client from "./client";

export const createExpense = async ({ owner, expenseName, members }) => {
  try {
    const { data } = await client.post("/expense/create", {
      owner,
      expenseName,
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
  try {
    const { data } = await client.post(`/expense/update`, formData);
    // console.log(data);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) return response.data;
    return { error: err.message || err };
  }
};

export const approveExpense = async (expenseId, userId) => {
  try {
    const { data } = await client.post("/expense/approve", {
      expenseId,
      userId,
    });
    console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: err.message || err };
  }
};
