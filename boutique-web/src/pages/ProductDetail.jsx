import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const api = `http://localhost:8080/api/products/${id}`;

  useEffect(() => {
    axios
      .get(api)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Ürün getirilemedi", err));
  }, [id]);

  if (!product) return <p>Yükleniyor...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} style={{ width: "300px" }} />
      <p>Fiyat: {product.price} TL</p>
    </div>
  );
}

export default ProductDetail;
