import styled from 'styled-components';

const OpenBoxWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  height: 100vh;
  position: relative;
  overflow: hidden;
  z-index: 0;
`;

const OpenBoxContent = styled.div`
  width: 100%;
  height:100%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    bottom: 0;
    .day {
    position: relative;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #e37239;
    }

    .box {
      overflow-y: scroll;
      position: relative;
      bottom: 0;
      width: 100%;
      margin-top: 50px;
      background-color: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(13px);
      height: 75vh;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      /* display: flex; */
      /* justify-content: center; */
      /* align-items: center;
      flex-direction: column; */
      ::-webkit-scrollbar {
        width: 5px; /*스크롤바의 너비*/
      }

      ::-webkit-scrollbar-thumb {
        background-color: #e37239; /*스크롤바의 색상*/
      }

      ::-webkit-scrollbar-track {
        background-color: background-color: rgba(255, 255, 255, 0.3);; /*스크롤바 트랙 색상*/
      }
    }
  }

  .title {
    height: auto;
    p {
      font-size: 50px;
      color: white;
      font-weight: 1000;
      text-align: center;
      margin:0;
    }
  }
`;

const LoginContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
`;

const LoginBox = styled.div`
  /* max-width: 400px;
  background-color: yellow;
  display: flex;
  flex-direction: row;
  align-items: center; */
  margin: 0 auto;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  /* img {
    width: 50px;
    height: 50px;
    margin: 10px;
  } */

  div {
    width: 100%;
  }
`;

const LoginWrapper = styled.div`
  max-width: 700px;
  height: 100vh;
  margin: 0 auto;
  /* background-color: red; */
  overflow: hidden;
  .title {
    height: auto;
    p {
      font-size: 50px;
      color: white;
      font-weight: 1000;
      text-align: center;
      margin: 100px;
    }
  }

  .box {
    p {
      font-size: 22px;
      color: white;
      font-weight: 800;
      text-align: center;
      margin-top: 20px;
    }
  }
`;

export { OpenBoxWrapper, OpenBoxContent, LoginContent, LoginBox, LoginWrapper };

// @media ${props => props.theme.mobile} {
//   margin-top: 5px;
// }
