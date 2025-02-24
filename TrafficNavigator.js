import React, { useState } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 19.076, // Mumbai
  lng: 72.8777,
};

const TrafficNavigator = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);

  const handleRoute = () => {
    if (!origin || !destination) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error("Error fetching directions", result);
        }
      }
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Real-Time Traffic Navigator</h1>
      <div>
        <input value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Enter starting point" />
        <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Enter destination" />
        <button onClick={handleRoute}>Find Route</button>
      </div>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default TrafficNavigator;
