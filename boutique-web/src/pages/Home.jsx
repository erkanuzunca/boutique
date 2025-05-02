import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Home() {
  const [products, setProducts] = useState([]);
  const api = "http://localhost:8080/api/products";

  useEffect(() => {
    axios
      .get(api)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Veri alınamadı", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Ürünler</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              width: "200px",
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: "100%" }}
            />
            <h3>{product.name}</h3>
            <p>{product.price} TL</p>
            <Link to={`/product/${product.id}`}>
            <button>Detay</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
