import { Map, MapMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  setCustomValue?: (id: string, value: number) => void;
  detailPage: boolean;
}

const KakaoMap = ({
  latitude,
  longitude,
  setCustomValue,
  detailPage = false,
}: KakaoMapProps) => {
  const handleClick = (MouseEvent: kakao.maps.event.MouseEvent) => {
    if (detailPage) return;
    setCustomValue!("latitude", MouseEvent.latLng.getLat());
    setCustomValue!("longitude", MouseEvent.latLng.getLng());
  };
  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: "100%", height: "360px" }}
      onClick={(_, MouseEvent) => handleClick(MouseEvent)}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }}></MapMarker>
    </Map>
  );
};

export default KakaoMap;
