/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import Cartegori from '../components/mybox/Cartegori';
import BoxList from '../components/mybox/BoxList';
import { Wrapper, MapContainer } from '../styles/variables';
import { useMutation, useQuery } from 'react-query';
import { getLogout } from '../api/user';
import { getAllBox } from '../api/box';

export default function mybox() {
  // const [click, setNextToggle] = useState(true);
  const [categori, setCategori] = useState(0);

  const { data, isLoading } = useQuery('alldata', async () => {
    return getAllBox();
  });
  if (isLoading) {
    return <>로딩</>;
  }
  const arr = [[], [], [], []];
  if (data) {
    data.boxList[0].box.map((value, idx) => {
      arr[value.boxType].push(value);
    });
  }
  const open = arr[3];
  const close = arr.slice(0, 3);
  const ChangeBoxMode = num => {
    const boxdata = arr[num];
    if (categori === 0) {
      return close.map(
        (value, idx) => {
          return (
            <>
              {value.map((v, i) => {
                return (
                  <BoxList
                    boxInfo={v}
                    key={idx}
                    num={v.boxType}
                    categori={categori}
                    // firstClick={firstClick}
                    // setFirstClick={setFirstClick}
                  />
                );
              })}
            </>
          );
        },
        // }
      );
    } else {
      return (
        <>
          {boxdata
            ? open.map((value, idx) => {
                if (value !== null) {
                  return (
                    <>
                      <BoxList
                        boxInfo={value}
                        key={idx}
                        num={value.boxType}
                        categori={categori}
                        // firstClick={firstClick}
                        // setFirstClick={setFirstClick}
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
    // setFirstClick(false);
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
