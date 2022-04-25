import React from 'react';
import { BoxContainer, BoxContent, BoxHeader } from './Box.style';

export default function Box() {
  return (
    <BoxContainer>
      <BoxHeader>
        <div className="box-title">자율 - 꾸러기수비대 모임</div>
        <div className="box-date">
          <div>2022년 01월 14일 17시 00분</div>
          <div>2022년 04월 30일 18시 30분</div>
        </div>
      </BoxHeader>
      <BoxContent>
        <div className="box-content">
          <div className="box-content-card">
            <img
              alt="gd"
              src="https://mblogthumb-phinf.pstatic.net/MjAyMDA3MjhfMSAg/MDAxNTk1OTIzNDQxODAx.50AhlNs5q-bbhkQPAjbNEcI_gmqaa0-eQo0-PvGWwcUg.yb_21KZPn9iXniJzPf_JOPz6uULnhVL0yL5xvzbr0msg.JPEG.cine_play/SE-825101d1-306e-463d-b0aa-b18f0cbaeed8.jpg?type=w800"
            />
          </div>
          <div className="box-content-card">
            <img
              alt="gd"
              src="https://image5jvqbd.fmkorea.com/files/attach/new/20181023/486616/1306425597/1340928252/99b983892094b5c6d2fc3736e15da7d1_1.jpg"
            />
          </div>
          <div className="box-content-card">
            <video controls>
              <source src="동영상.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="box-content-card">
            <p>
              꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대
              꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대
              꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대
              꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대
              꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대
              꾸러기수비대 꾸러기수비대 꾸러기수비대
            </p>
          </div>
        </div>
      </BoxContent>
    </BoxContainer>
  );
}
