import { useState, useEffect } from "react";
import { getDetailBudaya, updateBudaya } from "../service/budayas.service";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditBudaya = () => {
  const { id } = useParams(); // Mendapatkan id dari parameter URL
  const navigate = useNavigate();

  const [budaya, setBudaya] = useState({
    nama_budaya: "",
    deskripsi_budaya: "",
    image_path: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBudaya = async () => {
      try {
        setLoading(true);
        getDetailBudaya(id, (data) => {
          setBudaya(data);
          setLoading(false);
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBudaya();
  }, [id]);

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
      const formData = new FormData();
      formData.append("nama_budaya", budaya.nama_budaya);
      formData.append("deskripsi_budaya", budaya.deskripsi_budaya);
      if (budaya.image_path) {
        formData.append("image", budaya.image_path); // Append the file if selected
      }

      await updateBudaya(id, formData); // Pass the FormData to the update function
      alert("Data berhasil diperbarui!");
      navigate("/dashboard"); // Kembali ke dashboard setelah berhasil
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Memuat data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Data Budaya</h1>
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
          {/* Display the current image if available */}
          {budaya.image_path && (
            <div className="mb-4">
              <img
                src={typeof budaya.image_path === "string" ? budaya.image_path : URL.createObjectURL(budaya.image_path)}
                alt="Budaya Image"
                className="max-w-[500px] mx-auto w-full h-auto mb-4"
              />
            </div>
          )}
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
          <Link
            to="/dashboard"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditBudaya;
