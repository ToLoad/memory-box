import styled from 'styled-components';

const BoxContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  margin-top: 80px;
  padding: 0 20px;
  padding-bottom: 20px;
`;

const BoxHeader = styled.div`
  .box-title {
    font-size: 30px;
    font-weight: bold;
    color: white;
    text-align: center;
    padding: 10px;
  }
  .box-date {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    font-size: 18px;
    font-weight: bold;
    color: #e37239;
    padding: 0 20px;
  }
`;

const BoxContent = styled.div`
  border-radius: 20px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  .box-content {
    column-count: 3;
    column-gap: 20px;
  }
  .box-content-card {
    display: inline-block;
    margin: 0;
    margin-bottom: 20px;

    img {
      width: 100%;
      border-radius: 20px;
    }
    video {
      width: 100%;
      border-radius: 20px;
    }
    p {
      background-color: white;
      padding: 20px;
      border-radius: 20px;
    }
  }
`;

export { BoxContainer, BoxHeader, BoxContent };
