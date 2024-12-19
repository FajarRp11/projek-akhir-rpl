import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LinkButton from "../components/LinkButton";
import { getBudayas } from "../service/budayas.service";

const Budaya = () => {
  const [budaya, setBudaya] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <Navbar />
      <div className="min-h-screen pt-16 pb-4 px-4">
        <h1 className="font-bold text-xl mb-3 text-center">BUDAYA</h1>
        {loading ? (
          <div className="h-screen w-full flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">Terjadi kesalahan: {error}</p> // Pesan error
        ) : (
          <div className="gap-4 grid grid-cols-12">
            {budaya.map(
              ({
                id,
                nama_budaya: nama,
                deskripsi_budaya: deskripsi,
                image_path: gambar,
              }) => (
                <article
                  key={id}
                  className="col-span-12 md:col-span-4 p-6 bg-slate-200 rounded-xl md:relative md:h-[468px]"
                >
                  <div className="flex items-center flex-col gap-4 mb-4">
                    {gambar && (
                    <div className="aspect-video h-38 mb-2">
                      <img
                        src={gambar}
                        alt={nama}
                        className="w-full aspect-video object-center object-cover rounded-md"
                        loading="lazy"
                      />
                    </div>
                    )}
                    <div>
                      <h2 className="font-bold text-2xl">{nama}</h2>
                      <p>{deskripsi.substring(0, 125)}...</p>
                    </div>
                  </div>
                  <LinkButton
                    path={`/budaya/${id}`}
                    variant="md:absolute md:bottom-4"
                  >
                    Pelajari Selengkapnya
                  </LinkButton>
                </article>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Budaya;
