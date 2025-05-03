import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Ürünler alınamadı:", err));
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-500 to-purple-600 py-20 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Yeni Sezon Ürünler
          </h1>
          <p className="text-xl mb-8">
            En trend butik koleksiyonları şimdi sizlerle. Hemen keşfedin!
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 bg-pink-700 hover:bg-pink-800 text-white rounded-full text-lg transition duration-300"
          >
            Ürünleri Keşfet
          </button>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-12">
          En Popüler Ürünler
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white shadow-lg hover:shadow-xl rounded-lg cursor-pointer overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-72 object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {product.name}
                </h3>
                <p className="text-lg font-semibold text-pink-600">
                  {product.price} TL
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Banner Section */}
      <section className="bg-pink-700 py-12 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Koleksiyonumuza Göz Atın
          </h2>
          <p className="text-xl mb-6">
            Sadece bu sezon için özel olarak seçilen parçalar sizi bekliyor.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 bg-white text-pink-700 rounded-full text-lg transition duration-300"
          >
            Hemen İncele
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
