import React from 'react';
import {
  MapModalContent,
  MapModalWrapper,
  MapHeader,
  MapContent,
  XIcon,
} from './Map.style';
import Map from './Map';

export default function MapIcon() {
  return (
    <MapModalWrapper>
      <MapModalContent initial={{ y: 100 }} animate={{ y: 0 }}>
        <MapHeader>
          <XIcon>xx</XIcon>
          <p>Box Location</p>
        </MapHeader>
        <MapContent>
          <Map />
        </MapContent>
      </MapModalContent>
    </MapModalWrapper>
  );
}
