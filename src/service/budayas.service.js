import axios from "axios";

export const getBudayas = async () => {
  try {
    const response = await axios.get(
      "https://far-pheasant-36.deno.dev/budaya"
    );
    return response.data; // Mengembalikan data budaya
  } catch (error) {
    console.error("Error fetching budaya:", error);
    throw error; // Lempar error untuk ditangani di komponen
  }
};

export const getDetailBudaya = (id, callback) => {
  axios
    .get(`https://far-pheasant-36.deno.dev/budaya/${id}`)
    .then((respon) => {
      callback(respon.data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

export const updateBudaya = async (id, formData) => {
  try {
    const response = await axios.post(
      `https://far-pheasant-36.deno.dev/budaya/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error updating Budaya: " + error.message);
  }
};

export const addBudaya = async (data) => {
  try {
    const formData = new FormData();
    formData.append("nama_budaya", data.nama_budaya);
    formData.append("deskripsi_budaya", data.deskripsi_budaya);

    if (data.image_path) {
      formData.append("image", data.image_path);
    }

    const response = await axios.post(
      "https://far-pheasant-36.deno.dev/budaya",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      }
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
      `https://far-pheasant-36.deno.dev/budaya/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting budaya:", error);
    throw error;
  }
};
