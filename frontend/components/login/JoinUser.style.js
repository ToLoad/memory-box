import styled from 'styled-components';

const JoinUserWrapper = styled.div`
  max-width: 680px;
  height: 60vh;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  z-index: 0;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(13px);
  padding: 2%;
  border-radius: 10px;
  @media ${props => props.theme.mobile} {
    height: fit-content;
    /* position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto 0px 0px 0px; */
  }
`;

const JoinUserContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  color: white;
  margin-bottom: 50px;
  h1 {
    font-size: 25px;
  }

  h2 {
    font-size: 30px;
  }

  h4 {
    font-size: 18px;
  }

  .content {
    margin: 0 auto;
    width: 50%;
  }
`;

export { JoinUserWrapper, JoinUserContent };
