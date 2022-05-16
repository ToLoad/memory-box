import React, { useEffect, useState } from 'react';
import MainPage from '../components/Main/MainPage';
import Tressure from '../components/Treasure/Tressure';

export default function treasure() {
  return (
    <>
      <head>
        <script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
        <script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js"></script>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
        <script src="https://raw.githack.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js"></script>
      </head>
      {/* <script src="/arScript.js"></script> */}
      <Tressure />;
    </>
  );
}
