import React from 'react';
import { ButtonWrapper, MainRightWrapper } from '../Main/Main.style';
import {
  ContentsWrapper,
  HeaderWrapper,
  InnerRightBlock,
} from './Register.style';
import { AiOutlinePlusCircle, AiFillAudio } from 'react-icons/ai';

export default function RegisterRight() {
  return (
    <MainRightWrapper>
      <InnerRightBlock>
        <HeaderWrapper>
          <div className="title">캡슐 정보 입력</div>
          <div className="button">친구 초대하기</div>
        </HeaderWrapper>
        <ContentsWrapper>
          <div className="content">
            내용
            <textarea placeholder="미래에 하고싶은 말을 남겨보세요" />
          </div>
        </ContentsWrapper>
        <ContentsWrapper>
          <div className="image">
            이미지 추가하기
            <div className="icons">
              <AiOutlinePlusCircle />
            </div>
          </div>
        </ContentsWrapper>
        <ContentsWrapper>
          <div className="video">
            비디오 추가하기
            <div className="icons">
              <AiOutlinePlusCircle />
            </div>
          </div>
        </ContentsWrapper>
        <ContentsWrapper>
          <div className="voice">
            음성녹음 하기
            <div className="icons">
              <AiFillAudio />
            </div>
          </div>
        </ContentsWrapper>
        <ButtonWrapper>
          <button className="inputButton" type="button">
            담기
          </button>
        </ButtonWrapper>
      </InnerRightBlock>
    </MainRightWrapper>
  );
}
