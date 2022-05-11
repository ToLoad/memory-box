import styled from 'styled-components';

const JoinUserWrapper = styled.div`
  max-width: 580px;
  height: 400px;
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
    height: 400px;
  }
`;

const JoinUserContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  margin-bottom: 50px;
  h1 {
    margin-top: 20px;
    font-size: 25px;
  }

  h2 {
    font-size: 30px;
  }

  h4 {
    font-size: 22px;
  }

  .content {
    margin: 0 auto;
    width: 80%;
  }
`;

export { JoinUserWrapper, JoinUserContent };
