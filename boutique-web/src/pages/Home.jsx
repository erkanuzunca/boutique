import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa"; // WhatsApp iconu ekledik

const Home = () => {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Ürünler alınamadı:", err));
  }, []);

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + 5 < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + 5);

  const handleWhatsAppClick = () => {
    const message = "Merhaba, ürünlerinizi satın almak istiyorum!";
    const url = `https://wa.me/90XXXXXXXXX?text=${encodeURIComponent(message)}`; // Buradaki '90XXXXXXXXX' yerine WhatsApp numaranızı yazın
    window.open(url, "_blank");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gray-100">
        <div className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Şıklığın Yeni Adresi
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Modayı yakalayın, her zevke hitap eden koleksiyonlarımızla tarzınızı yansıtın!
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-[#A78BFA] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#8B5CF6] transition"
            >
              Koleksiyonu Keşfet
            </button>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="https://static.ticimax.cloud/cdn-cgi/image/width=545,quality=99/3841/uploads/sayfatasarim/sayfa2/title-31ebf35d-4.jpg"
              alt="Hero görseli"
              className="rounded-xl shadow-lg object-contain w-full max-w-md h-auto"
            />
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section className="w-full px-4 sm:px-6 lg:px-10 py-16 bg-white relative">
        <h2 className="text-4xl font-bold text-center text-purple-900 mb-12">Öne Çıkan Ürünler</h2>

        <div className="relative w-full overflow-hidden">
          {/* Buttons inside slider */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white text-gray-800 shadow-md hover:bg-gray-100 rounded-full p-2"
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white text-gray-800 shadow-md hover:bg-gray-100 rounded-full p-2"
          >
            <FaChevronRight size={20} />
          </button>

          {/* Product slider with transition */}
          <div className="w-full overflow-hidden">
            <div
              className="flex gap-8 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${startIndex * 20}%)` }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="min-w-[18%] max-w-[18%] bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  {/* Ürün Görseli */}
                  <div className="w-full h-72 p-4 flex items-center justify-center overflow-hidden rounded-t-lg bg-gray-100">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Ürün Detayları */}
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-base text-purple-700 font-semibold">{product.price} TL</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="bg-black py-16 text-white text-center">
        <h2 className="text-3xl font-semibold mb-4 drop-shadow-md">Moda Seninle Başlar</h2>
        <p className="text-lg mb-6">Butiğimizde sana özel parçaları hemen keşfet!</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-[#A78BFA] hover:bg-[#8B5CF6] px-8 py-3 rounded-full text-lg transition transform hover:scale-110"
        >
          Hemen Göz At
        </button>
      </section>

      {/* WhatsApp Button (Sol Tarafta Sabit) */}
      <div className="fixed bottom-10 left-10 flex items-center">
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
        >
          <FaWhatsapp size={30} />
        </button>
        <div className="ml-3 text-white text-sm hidden group-hover:block transition-all">
          <p>İletişim için</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
