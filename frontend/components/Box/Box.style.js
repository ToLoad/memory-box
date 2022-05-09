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
    svg {
      padding-top: 5px;
      margin-left: 10px;
      color: red;
      cursor: pointer;
    }
  }
  .box-date {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    font-size: 18px;
    font-weight: bold;
    color: white;
    padding: 0 20px;
  }
  @media ${props => props.theme.tablet} {
    .box-title {
      font-size: 20px;
      color: white;
    }
    .box-date {
      font-size: 12px;
    }
  }
`;

const BoxContent = styled.div`
  border-radius: 20px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  .box-content {
    display: flex;
    width: auto;
  }
  .box-content-card {
    position: relative;
    &:hover .box-content-card-user {
      opacity: 1;
      transition: 0.5s ease-in-out;
    }
  }
  img,
  video,
  audio {
    border-radius: 20px;
    width: 100%;
  }
  .box-content-card-user {
    opacity: 0;
    position: absolute;
    top: -15px;
    right: -15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    background-color: lightgray;
    border: 2px solid white;
    z-index: 10;
    img {
      height: 100%;
      object-fit: cover;
    }
  }
`;

const BoxTextCard = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  font-size: 25px;
  font-family: 'restart';
  background-color: ${props => props.color};
  min-height: 100px;
  @media ${props => props.theme.tablet} {
    font-size: 20px;
  }
`;

const BoxMapContainer = styled.div`
  height: 70vh;
  #map {
    width: 100%;
    height: 100%;
  }
  .overlay {
    border: 2.5px solid black;
    border-radius: 10px;
    /* box-shadow: 0px 0px 4px black; */
    background-color: white;
    padding: 5px 10px;
    text-align: center;
    font-weight: bold;
  }
`;

export { BoxContainer, BoxHeader, BoxContent, BoxTextCard, BoxMapContainer };
