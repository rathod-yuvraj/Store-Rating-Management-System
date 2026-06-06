import React, { useState } from "react";
import api from "../api/axios";

export default function RatingModal({
  open,
  onClose,
  storeId,
  storeName,
  onSuccess
}) {
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await api.post("/rating/submit", {
        storeId,
        rating: Number(rating)
      });

      alert("Rating submitted successfully");

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to submit rating"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)"
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#fff",
          padding: "20px",
          margin: "100px auto",
          borderRadius: "8px"
        }}
      >
        <h2>Rate Store</h2>

        <p>
          Store: <strong>{storeName}</strong>
        </p>

        <select
          value={rating}
          onChange={(e) =>
            setRating(e.target.value)
          }
        >
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>

        <br />
        <br />

        <button
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : "Submit"}
        </button>

        <button
          onClick={onClose}
          style={{
            marginLeft: "10px"
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}