import React from 'react';
import Box from '../components/mybox/Box';
import DetailBox from '../components/mybox/DetailBox';
import { Wrapper, MapContainer } from '../styles/variables';
import ToggleButton from '../components/mybox/ToggleButton';
import Test from '../components/mybox/Test';

export default function mybox() {
  return (
    <MapContainer>
      <Wrapper>
        <Test />
      </Wrapper>
    </MapContainer>
  );
}
