import styled from 'styled-components';
import { motion } from 'framer-motion';

const MapModalWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.6);
`;

const MapModalContent = styled(motion.div)`
  position: absolute;
  right: 0;
  left: 0;
  top: 15px;
  bottom: 15px;
  max-width: 600px;
  height: 70vh;
  /* background-color: yellow; */
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(13px);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  margin: auto;
  @media ${props => props.theme.mobile} {
    bottom: 0;
    top: initial;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`;

const MapHeader = styled.div`
  width: 95%;
  padding: 2% 0;
  margin: 0 auto;
  height: 10%;
  text-align: center;
  p {
    font-size: 22px;
    font-weight: 1000;
  }
`;

const MapContent = styled.div`
  width: 95%;
  padding: 2% 0;
  margin: 0 auto;
  height: 70%;
  /* background-color: yellow; */
`;

const XIcon = styled.div`
  position: absolute;
  right: 20px;
`;

export { MapModalWrapper, MapModalContent, MapHeader, XIcon, MapContent };
