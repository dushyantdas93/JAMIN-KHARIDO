import React, { useState } from "react";

const Experiment = () => {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [showMap, setShowMap] = useState(false); // Toggle map visibility
  const [error, setError] = useState(""); // Error handling

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(""); // Clear error if successful
        },
        (err) => {
          setError("Error fetching location: " + err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleButtonClick = () => {
    getLocation();
    setShowMap(true); // Show the map after getting location
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Show Google Map</h1>
      <button
        onClick={handleButtonClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Show Map
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {showMap && location.latitude && location.longitude && (
        <div style={{ marginTop: "20px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d92263.37885920503!2d81.37969197681558!3d21.204071349245954!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1736407815231!5m2!1sen!2sin"
            width="600"
            height="450"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Experiment;
