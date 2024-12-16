import axios from "axios";

export const getBudayas = async () => {
  try {
    const response = await axios.get(
      "https://far-pheasant-36-2d2tg577ts1w.deno.dev/budaya"
    );
    return response.data; // Mengembalikan data budaya
  } catch (error) {
    console.error("Error fetching budaya:", error);
    throw error; // Lempar error untuk ditangani di komponen
  }
};

export const getDetailBudaya = (id, callback) => {
  axios
    .get(`https://far-pheasant-36-2d2tg577ts1w.deno.dev/budaya/${id}`)
    .then((respon) => {
      callback(respon.data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

export const updateBudaya = async (id, data) => {
  try {
    const response = await axios.post(
      `https://far-pheasant-36-2d2tg577ts1w.deno.dev/budaya/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating budaya:", error);
    throw error;
  }
};

export const addBudaya = async (data) => {
  try {
    const response = await axios.post(
      "https://far-pheasant-36-2d2tg577ts1w.deno.dev/budaya",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error adding budaya:", error);
    throw error;
  }
};

export const deleteBudaya = async (id) => {
  try {
    const response = await axios.delete(
      `https://far-pheasant-36-2d2tg577ts1w.deno.dev/budaya/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting budaya:", error);
    throw error;
  }
};
