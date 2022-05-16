import React from 'react';
import styled from 'styled-components';
import { getBox } from '../api/box';
import { useQuery } from 'react-query';

const Wrapper = styled.div`
  margin: 0;
  overflow: hidden;
  width: 800px;
  height: 900px;
`;

export default function ar() {
  const { data } = useQuery('getitem', () => {
    return getBox('1Mo1xpAY');
  });

  return (
    <>
      <head>
        <script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
        <script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js"></script>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
        <script src="https://raw.githack.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js"></script>
      </head>
      <script src="/arScript.js"></script>

      <Wrapper>
        <a-scene
          debug
          cursor="rayOrigin: mouse; fuse: true; fuseTimeout: 0;"
          raycaster="objects: [gps-entity-place];"
          vr-mode-ui="enabled: false"
          // embedded
          arjs="sourceType: webcam; debugUIEnabled: false;"
        >
          <a-assets>
            <a-asset-item
              id="animated-asset"
              src="./assets/magnemite/scene.gltf"
            ></a-asset-item>
          </a-assets>
          {data && (
            <a-entity
              look-at="[gps-camera]"
              animation-mixer="loop: repeat"
              gltf-model="#animated-asset"
              scale="0.5 0.5 0.5"
              gps-entity-place={`latitude: ${data.boxLocLat}; longitude: ${data.boxLocLng};`}
            ></a-entity>
          )}
          <a-camera
            rotation-reader
            wasd-controls="acceleration: 100"
            min="10"
            far="100"
          ></a-camera>
        </a-scene>
      </Wrapper>
    </>
  );
}
