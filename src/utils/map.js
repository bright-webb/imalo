import React, { useState, useEffect } from "react";
import axios from "axios";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Geocode from "react-geocode"; 


const MapWithMarker = withGoogleMap(({ position }) => (
    <GoogleMap defaultZoom={14} defaultCenter={position}>
      <Marker position={position} />
    </GoogleMap>
  ));
const LocationMap = ({ propertyData }) => {
  const [position, setPosition] = useState(null);

  const fetchGeocode = async () => {
    try {
      const apiKey = "AIzaSyDxi6SGV23MmUzyMsLblphJBB7dduAF3wU";
      const address = encodeURIComponent(propertyData.address);
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`);

      // Check if the response contains valid results
      if (response.data.results.length > 0) {
        // Process the data and update the position state
        const { lat, lng } = response.data.results[0].geometry.location;
        setPosition({ lat, lng });
      } else {
        console.error("No results found for the given address");
      }
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  };

  useEffect(() => {
    fetchGeocode();
  }, [propertyData.address]);

  return (
    <div>
      {/* Check if position is available before rendering the map */}
      {position && (
        <MapWithMarker
        containerElement={<div style={{ height: "400px" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        position={position}
      />
      )}
    </div>
  );
};

export default LocationMap;
