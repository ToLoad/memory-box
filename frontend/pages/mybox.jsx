import React from 'react';
import Box from '../components/mybox/Box';
import { Wrapper, MapContainer } from '../styles/variables';

export default function mybox() {
  return (
    <MapContainer>
      <Wrapper>
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </Wrapper>
    </MapContainer>
  );
}
