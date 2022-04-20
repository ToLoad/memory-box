import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 900px;
  @media ${props => props.theme.mobile} {
    max-width: 350px;
  }
`;
const MapContainer = styled.div`
  height: 100%;
`;

const Background = styled.div`
  /* height: 100%; */
  background-image: url('/assets/images/night.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  @media ${props => props.theme.mobile} {
    background-image: url('/assets/images/mobileNight.png');
  }
`;

export { Wrapper, MapContainer, Background };
