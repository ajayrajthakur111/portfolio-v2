import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useMemo } from "react";
const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = { lat: 23.252771, lng: 77.467414 };

export const Maps = () => {
  const mapComponent = useMemo(() => {
    return (
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_APP_MAPS_API_KEY || ""}
      >
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    );
  }, []);

  return mapComponent;
};
