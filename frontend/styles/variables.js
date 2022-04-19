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
export { Wrapper, MapContainer };
