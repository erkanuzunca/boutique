import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa"; // WhatsApp iconu eklendi

const ProductDetail = () => {
  const { id } = useParams(); // URL parametresi ile ürün ID'yi al
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Ürün detayı alınamadı:", err));
  }, [id]);

  if (!product) {
    return <p>Ürün bilgileri yükleniyor...</p>;
  }

  const handleWhatsAppClick = () => {
    const message = `Merhaba, ${product.name} ürününü satın almak istiyorum. Fiyatı: ${product.price} TL`;
    const url = `https://wa.me/90XXXXXXXXX?text=${encodeURIComponent(message)}`; // Buradaki '90XXXXXXXXX' yerine WhatsApp numaranızı yazın
    window.open(url, "_blank");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          {product.name}
        </h1>

        <div className="flex flex-col lg:flex-row justify-between items-center space-y-10 lg:space-y-0 lg:space-x-10">
          {/* Ürün Görseli */}
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto max-w-lg mx-auto rounded-lg shadow-xl object-contain"
            />
          </div>

          {/* Ürün Detayları */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            <p className="text-3xl text-purple-700 font-semibold mb-4">{product.price} TL</p>

            {/* WhatsApp ile Satın Al Butonu */}
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg transition transform hover:scale-105 flex items-center justify-center mx-auto lg:mx-0"
            >
              <FaWhatsapp size={20} className="mr-3" /> {/* İkonu büyüttük */}
              WhatsApp ile Satın Al
            </button>
          </div>
        </div>

        {/* Ürün Özellikleri (Opsiyonel) */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Özellikler</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
            <li>Renk: {product.color || "Bilinmiyor"}</li>
            <li>Beden: {product.size || "Bilinmiyor"}</li>
            <li>Stok Durumu: {product.inStock ? "Stokta" : "Stokta Yok"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
