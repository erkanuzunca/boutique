import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Ürünler alınamadı:", err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-900 mb-12">
          Tüm Ürünler
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <div className="w-full h-60 bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-purple-700 text-base font-bold mt-2">{product.price} TL</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
