/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import Cartegori from '../components/mybox/Cartegori';
import BoxList from '../components/mybox/BoxList';
import { Wrapper, MapContainer } from '../styles/variables';

export default function mybox() {
  const [categori, setCategori] = useState(0);

  function changreCartegori(num) {
    setCategori(num);
  }

  return (
    <MapContainer>
      <Wrapper>
        <Cartegori set={changreCartegori} cat={categori} />
        <BoxList />
        <BoxList />
        <BoxList />
      </Wrapper>
    </MapContainer>
  );
}
