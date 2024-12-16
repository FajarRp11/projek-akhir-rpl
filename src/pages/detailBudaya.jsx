import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import { FaArrowLeft } from "react-icons/fa6";
import { getDetailBudaya } from "../service/budayas.service";

const DetailBudaya = () => {
  const { id } = useParams();
  const [budaya, setBudaya] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailBudaya = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const data = await new Promise((resolve) => {
          getDetailBudaya(id, resolve);
        });
        setBudaya(data);
      } catch (error) {
        console.error("Error fetching budaya detail:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchDetailBudaya();
  }, [id]);

  if (loading) {
    return <p>Memuat data...</p>; // Show loading state
  }

  if (!budaya) {
    return <p>Data tidak ditemukan!</p>; // Handle case when no data is found
  }

  // Destructure data budaya
  const {
    nama_budaya: nama,
    deskripsi_budaya: deskripsi,
    sejarah,
    image_path: gambar,
    src,
  } = budaya;

  return (
    <div className="p-4">
      <LinkButton path="/budayas" variant="mb-4">
        <FaArrowLeft className="inline-block mr-2" />
        Kembali
      </LinkButton>
      <div className="grid grid-cols-12 gap-4">
        <div className="md:col-span-4 col-span-12">
          <img
            src={gambar}
            alt={nama}
            className="mb-4 w-full h-auto object-cover rounded-md"
          />
          {src && (
            <iframe
              src={src}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full aspect-video rounded-md"
            ></iframe>
          )}
        </div>
        <div className="md:col-span-8 col-span-12">
          <h1 className="font-bold text-2xl mb-4">{nama}</h1>
          <p className="whitespace-pre-line text-justify mb-4">{deskripsi}</p>
          {sejarah && (
            <>
              <h1 className="font-bold text-2xl mb-4">Sejarah {nama}</h1>
              <p className="whitespace-pre-line text-justify mb-4">{sejarah}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailBudaya;
