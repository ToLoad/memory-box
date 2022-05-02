/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import Cartegori from '../components/mybox/Cartegori';
import BoxList from '../components/mybox/BoxList';
import { Wrapper, MapContainer } from '../styles/variables';
import { useQuery } from 'react-query';
import { getCloseBox, getOpenBox, getReadyBox } from '../api/box';
import Box from '../components/mybox/Box';

export default function mybox() {
  const [firstClick, setFirstClick] = useState(false);
  // const [click, setNextToggle] = useState(true);
  const [categori, setCategori] = useState(0);
  const { data: close, isLoading: closeLD } = useQuery('closeBox', async () => {
    return getCloseBox();
  });
  const { data: ready, isLoading: readyLD } = useQuery('readyBox', async () => {
    return getReadyBox();
  });
  const { data: open, isLoading: openLD } = useQuery('openBox', async () => {
    return getOpenBox();
  });

  if (closeLD && readyLD && openLD) {
    console.log('로딩');
    return <>로딩즁</>;
  }

  const arr = [null, ready, close, open];
  const ChangeBoxMode = num => {
    const boxdata = arr[num];
    if (num === 0) {
      return arr.map((value, idx) => {
        if (!value) {
          return;
        }
        if (value !== (null || undefined)) {
          return (
            <>
              {value.map((v, i) => {
                console.log(v, idx, '벨류');
                return (
                  <BoxList
                    boxInfo={v}
                    key={idx}
                    num={idx}
                    firstClick={firstClick}
                    setFirstClick={setFirstClick}
                  />
                );
              })}
            </>
          );
        }
      });
    } else {
      return (
        <>
          {boxdata
            ? boxdata.map((value, idx) => {
                if (value !== null) {
                  return (
                    <>
                      <BoxList
                        boxInfo={value}
                        key={idx}
                        num={num}
                        firstClick={firstClick}
                        setFirstClick={setFirstClick}
                      />
                    </>
                  );
                }
              })
            : null}
        </>
      );
    }
  };

  function changreCartegori(num) {
    setCategori(num);
    setFirstClick(false);
  }

  return (
    <MapContainer>
      <Wrapper>
        <Cartegori set={changreCartegori} cat={categori} />
        {ChangeBoxMode(categori)}
      </Wrapper>
    </MapContainer>
  );
}

// for (let i = 1; i < 4; i++) {
//   const data = arr[i];
//   console.log(data);

//   <>
//     {data.map((value, idx) => {
//       if (value !== null) {
//         return (
//           <BoxList
//             boxInfo={value}
//             key={idx}
//             num={num}
//             firstClick={firstClick}
//             setFirstClick={setFirstClick}
//           />
//         );
//       }
//     })}
//   </>;
// }
