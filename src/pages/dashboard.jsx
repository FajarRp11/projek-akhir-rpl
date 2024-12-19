import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getBudayas, deleteBudaya } from "../service/budayas.service";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import LinkButton from "../components/LinkButton";

const Dashboard = () => {
  const [budaya, setBudaya] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBudayas = async () => {
      try {
        setLoading(true); // Set loading ke true sebelum memulai fetching
        const data = await getBudayas();
        setBudaya(data); // Simpan data ke state
      } catch (err) {
        setError(err.message); // Tangani error jika terjadi
      } finally {
        setLoading(false); // Set loading ke false setelah selesai fetching
      }
    };

    fetchBudayas();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (confirm) {
      try {
        await deleteBudaya(id);
        alert("Data berhasil dihapus!");
        // Perbarui state dengan memfilter data yang dihapus
        setBudaya((prevBudaya) => prevBudaya.filter((item) => item.id !== id));
      } catch (err) {
        alert(`Terjadi kesalahan: ${err.message}`);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Hapus data user dari localStorage
    alert("Anda berhasil logout!");
    navigate("/login"); // Redirect ke halaman login
  };

  let no = 1;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4 pt-16">
        Dashboard Lentera Minang
      </h1>
      <div className="flex justify-between items-center mb-4">
        <LinkButton path="/tambah-budaya">Tambah Data</LinkButton>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
      {loading ? (
        <p className="text-center">Memuat data...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200 shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">NO</th>
                <th className="border border-gray-300 px-4 py-2">Nama</th>
                <th className="border border-gray-300 px-4 py-2">Deskripsi</th>
                <th className="border border-gray-300 px-4 py-2">Gambar</th>
                <th className="border border-gray-300 px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {budaya.map(
                ({
                  id,
                  nama_budaya: nama,
                  deskripsi_budaya: deskripsi,
                  image_path: gambar,
                }) => (
                  <tr key={id} className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {no++}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {nama.substring(0, 20)}...
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {deskripsi.substring(0, 150)}...
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      { gambar && <img src={gambar} alt={nama} className="w-36" /> }
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => navigate(`/edit-budaya/${id}`)}
                        className="bg-green-500 hover:bg-green-700 text-center mb-2 flex items-center justify-center text-white font-bold py-1 px-3 rounded mr-2"
                      >
                        <FaEdit size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        className="bg-red-500 text-center flex justify-center items-center hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      >
                        <MdDeleteForever size={15} />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
