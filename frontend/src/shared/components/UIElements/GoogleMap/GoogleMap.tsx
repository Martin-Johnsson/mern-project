import { useRef, useEffect } from 'react';
import './GoogleMap.css';
import { IGoogleMapProps } from '../../../../types/Interfaces';

const GoogleMap: React.FC<IGoogleMapProps> = (props) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const { center, zoom } = props;

  useEffect(() => {
    const map =
      mapRef.current &&
      new window.google.maps.Map(
        mapRef.current,

        { center: center, zoom: zoom }
      );

    map && new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default GoogleMap;
