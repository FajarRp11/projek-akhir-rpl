import { useState } from "react";
import { addBudaya } from "../service/budayas.service";
import { useNavigate } from "react-router-dom";

const AddBudaya = () => {
  const navigate = useNavigate();

  const [budaya, setBudaya] = useState({
    nama_budaya: "",
    deskripsi_budaya: "",
    image_path: null,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudaya((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBudaya((prevState) => ({ ...prevState, image_path: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBudaya(budaya);
      alert("Data berhasil ditambahkan!");
      navigate("/dashboard");
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Tambah Data Budaya</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="nama_budaya"
          >
            Nama Budaya
          </label>
          <input
            type="text"
            id="nama_budaya"
            name="nama_budaya"
            value={budaya.nama_budaya}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="deskripsi_budaya"
          >
            Deskripsi
          </label>
          <textarea
            id="deskripsi_budaya"
            name="deskripsi_budaya"
            value={budaya.deskripsi_budaya}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="image_path"
          >
            Upload Gambar
          </label>
          <input
            type="file"
            id="image_path"
            name="image_path"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBudaya;