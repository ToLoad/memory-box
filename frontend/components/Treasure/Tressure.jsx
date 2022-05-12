import React from 'react';
import { TreasureWrapper, TreasureContent } from './treasure.style';
import TreasureMap from './TreasureMap';

export default function Tressure() {
  return (
    <TreasureWrapper>
      <div className="desktop">
        !! 보물찾기는 모바일 환경에 최적화 되어 있습니다.
      </div>
      {/* map이 들어갈 자리 */}
      <TreasureContent>
        <TreasureMap />
      </TreasureContent>
    </TreasureWrapper>
  );
}
