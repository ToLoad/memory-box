import styled from 'styled-components';

const InnerRightBlock = styled.div`
  padding: 0 30px 0 30px;
  button {
    background-color: gray;
    border: none;
    padding: 10px 30px;
    border-radius: 1vw;
    background-color: rgb(255, 241, 191);
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  .title {
    font-size: 20px;
  }
  .button {
    padding: 5px 10px;
    border-radius: 1vw;
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
`;

const ContentsWrapper = styled.div`
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  .content {
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 25vh;
    textarea {
      margin-top: 10px;
      border: none;
      background-color: transparent;
      height: 100%;
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
    height: 4vh;
  }
  .video {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 4vh;
  }
  .voice {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 4vh;
    .icons {
      color: red;
    }
  }
`;

export { HeaderWrapper, ContentsWrapper, InnerRightBlock };
