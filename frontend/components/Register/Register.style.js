import styled from 'styled-components';

const RegisterRightWrapper = styled.div`
  box-sizing: border-box; // 전역에는 되어있음
  width: 45%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  @media (max-width: 850px) {
    height: 100%;
    width: 850px;
    position: relative;
  }
`;

const InnerRightBlock = styled.div`
  padding: 80px 30px 30px 30px;
  background-color: rgba(255, 255, 255, 0.2); // 배경 투명도
  backdrop-filter: blur(10px);
  overflow: auto;
  height: 100vh;
  button {
    border: none;
    padding: 10px 30px;
    border-radius: 1vw;
    background-color: rgb(255, 241, 191);
  }
  @media ${props => props.theme.tablet} {
    padding-top: 30px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  .title {
    display: flex;
    align-items: center;
    font-size: 20px;
  }
  .button {
    padding: 5px 10px;
    border-radius: 1vw;
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
  .link {
    div {
      font-size: 15px;
    }
    .clip {
      margin-right: 10px;
    }
    @media ${props => props.theme.tablet} {
      div {
        font-size: 1px;
      }
      .clip {
        margin-right: 0px;
      }
    }
  }
`;

const ContentsWrapper = styled.div`
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  label {
    cursor: pointer;
  }
  .nickname {
    padding: 20px;
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      font-size: 20px;
    }
    input {
      width: 70%;
      color: white;
      font-size: 15px;
      border: none;
      background-color: transparent;
      padding-left: 10px;
      :focus {
        outline: none;
      }
    }
  }
  .content {
    padding: 20px;
    height: 25vh;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
      .length {
        font-size: 15px;
      }
    }
    textarea {
      width: 100%;
      font-size: 15px;
      margin-top: 10px;
      border: none;
      background-color: transparent;
      height: 80%;
      resize: none;
      :focus {
        outline: none;
      }
    }
  }
  .icons {
    font-size: 25px;
    cursor: pointer;
  }
  .image {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 7vh;
    div {
      display: flex;
      align-items: center;
      font-size: 20px;
    }
    .icons {
      font-size: 25px;
    }
  }
  #preview {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    img {
      width: 300px;
      height: 200px;
      object-fit: cover;
    }
  }
  .video-preview {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    img {
      width: 300px;
      height: 200px;
      object-fit: cover;
    }
    .video-preview-image {
      position: relative;
    }
    .video-preview-name {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 3px;
      color: white;
      background-color: black;
    }
  }
  .video {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 7vh;
    div {
      display: flex;
      align-items: center;
      font-size: 20px;
    }
    .icons {
      font-size: 25px;
    }
  }
  .voice {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 7vh;
    div {
      display: flex;
      align-items: center;
      font-size: 20px;
    }
    .icons {
      font-size: 25px;
      color: red;
    }
    .resetAudio {
      cursor: pointer;
      margin-left: 10px;
      font-size: 25px;
      display: flex;
      align-items: center;
    }
  }
`;
const AudioButton = styled.p`
  display: flex;
  justify-content: center;
  background-color: #ffebd2;
  margin: 0;
  padding: 10px 10px;
  font-weight: bold;
  text-align: center;
  border-radius: 2vw;
  width: 100px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background-color: #ffa53a;
    transition: 0.3s;
  }
  @media ${props => props.theme.mobile} {
    width: 50px;
    font-size: 14px;
    border-radius: 20px;
    padding: 5px 10px;
  }
`;
const RecordWrapper = styled.div`
  display: flex;
  justify-content: center;
  audio {
    width: 80%;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
`;

export {
  HeaderWrapper,
  ContentsWrapper,
  RegisterRightWrapper,
  InnerRightBlock,
  RecordWrapper,
  AudioButton,
};
