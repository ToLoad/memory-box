import React from 'react';
import Box from '../components/mybox/Box';
import DetailBox from '../components/mybox/DetailBox';
import { Wrapper, MapContainer } from '../styles/variables';
import ToggleButton from '../components/mybox/ToggleButton';
export default function mybox() {
  return (
    <MapContainer>
      <Wrapper>
        <ToggleButton />
        <DetailBox />
        <Box />
        <Box />
        <Box />
      </Wrapper>
    </MapContainer>
  );
}
