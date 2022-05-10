import styled from 'styled-components';

const LandingWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LandingBlock = styled.div`
  margin-top: 150px;
  width: 50vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 1vw;
  border: 5px solid white;
  display: flex;
  align-items: center;
  flex-direction: column;
  img {
    margin-top: 20px;
    width: 200px;
    height: 90px;
  }
  div {
    margin-top: 20px;
  }
  #subTitle {
    font-size: 3vw;
    color: white;
  }
  #content {
    text-align: center;
  }
`;

export { LandingWrapper, LandingBlock };
