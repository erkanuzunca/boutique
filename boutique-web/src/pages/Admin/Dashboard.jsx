import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", imageUrl: "" });
  const [editId, setEditId] = useState(null); // null ise yeni ürün ekleme

  const api = "http://localhost:8080/api/products";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(api);
      setProducts(res.data);
    } catch (err) {
      console.error("Ürünler alınamadı", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.imageUrl) return;

    try {
      if (editId) {
        await axios.put(`${api}/${editId}`, form);
      } else {
        await axios.post(api, form);
      }

      setForm({ name: "", price: "", imageUrl: "" });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error("İşlem başarısız", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Ürün silinemedi", err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    setEditId(product.id);
  };

  const handleCancel = () => {
    setForm({ name: "", price: "", imageUrl: "" });
    setEditId(null);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Paneli - Ürün Yönetimi</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          name="name"
          placeholder="Ürün Adı"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Fiyat"
          value={form.price}
          onChange={handleChange}
          type="number"
        />
        <input
          name="imageUrl"
          placeholder="Görsel URL"
          value={form.imageUrl}
          onChange={handleChange}
        />
        <button type="submit">{editId ? "Güncelle" : "Ekle"}</button>
        {editId && <button onClick={handleCancel}>İptal</button>}
      </form>

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
            <button onClick={() => handleEdit(product)}>Düzenle</button>
            <button onClick={() => handleDelete(product.id)}>Sil</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
