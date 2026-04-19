import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const emptyForm = {
  name: "",
  price: "",
  description: "",
  category: "Main Course",
  available: true,
  images: [],
};

const AdminDashboard = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const loadFoods = async () => {
    try {
      const res = await api.get("/foods");
      setFoods(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load foods");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);

    setForm((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleCreateFood = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("available", String(form.available));

      form.images.forEach((file) => {
        formData.append("images", file);
      });

      const res = await api.post("/foods", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFoods((prev) => [...prev, res.data]);
      setForm(emptyForm);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create food");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteFood = async (id) => {
    if (!window.confirm("Delete this food item?")) return;

    try {
      await api.delete(`/foods/${id}`);
      setFoods((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete food");
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;