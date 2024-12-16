import axios from "axios";

export const getTeam = async () => {
  try {
    const response = await axios.get(
      "https://far-pheasant-36-2d2tg577ts1w.deno.dev/anggota"
    );
    return response.data; // Mengembalikan data budaya
  } catch (error) {
    console.error("Error fetching budaya:", error);
    throw error; // Lempar error untuk ditangani di komponen
  }
};

// export const getDetailBudaya = (id, callback) => {
//   axios
//     .get(`https://far-pheasant-36-170f0758shwj.deno.dev/budaya/${id}`)
//     .then((respon) => {
//       callback(respon.data);
//     })
//     .catch((error) => {
//       console.log("Error: ", error);
//     });
// };
