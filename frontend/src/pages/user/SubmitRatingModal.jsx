import { useState } from "react";
import "./SubmitRatingModal.css";
import api from "../../api/axios";

function SubmitRatingModal({
  storeId,
  userRating,
  onClose,
  fetchStores,
}) {

  const [rating, setRating] = useState(
    userRating || 1
  );

  const handleSubmit = async () => {

    try {

      await api.post("/user/rating", {
        storeId,
        rating,
      });

      alert("Rating submitted successfully");

      fetchStores();

      onClose();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>

          {
            userRating
              ? "Update Rating"
              : "Submit Rating"
          }

        </h2>

        <div className="stars">

          {[1, 2, 3, 4, 5].map((star) => (

            <span
              key={star}
              className={
                rating >= star
                  ? "active-star"
                  : ""
              }
              onClick={() => setRating(star)}
            >
              ★
            </span>

          ))}

        </div>

        <div className="modal-buttons">

          <button
            className="submit-btn"
            onClick={handleSubmit}
          >
            Save
          </button>

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );
}

export default SubmitRatingModal;