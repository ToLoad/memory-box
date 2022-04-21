import styled from 'styled-components';

const DetailBoxWrapper = styled.div`
  max-width: 700px;
  padding: 1%;
  height: 100%;
  min-height: 150px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0 auto;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow-y: visible;
  color: white;
`;

const DetailBoxContent = styled.div`
  width: 100%;
`;

const DayWrapper = styled.div`
  width: 92%;
  margin: 0 auto;
  height: 25px;
  /* background-color: red; */
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  .date {
    font-size: 18px;
  }
`;

const DetailContentWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  height: auto;
  min-height: 100px;
`;

const BoxDetailContent = styled.div`
  width: 100%;
  padding: 10px;

  p {
    word-break: keep-all;
    font-size: 18px;
    color: white;
    @media ${props => props.theme.mobile} {
      font-size: 14px;
    }
  }
`;

const DetailInfoWrapper = styled.div`
  width: 95%;
  /* background-color: red; */
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  @media ${props => props.theme.mobile} {
    flex-direction: column;
  }
`;

const MapInfoWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-bottom: 10px;
  min-height: 150px;
  height: 95%;
  font-size: 18px;
  color: white;
  font-weight: 1000;
  @media ${props => props.theme.mobile} {
    width: 100%;
  }
  .map {
    width: 95%;
    margin-top: 10px;
    border-radius: 10px;
    background-color: red;
    min-height: 150px;
    height: auto;
  }
`;

const GroupInfoWrapper = styled.div`
  width: ${props => (props.mapInfo ? '40%' : '100%')};
  margin: 0 auto;
  margin-bottom: 20px;
  min-height: 60px;
  height: 95%;
  font-size: 18px;
  color: white;
  font-weight: 1000;
  @media ${props => props.theme.mobile} {
    width: 100%;
  }
  .group {
    width: 95%;
    margin-top: 10px;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;

    .groupUserImage {
      width: 30px;
      height: 30px;
      border-radius: 100%;
      margin: 5px;
    }
  }
`;

export {
  DetailBoxWrapper,
  DetailBoxContent,
  DayWrapper,
  DetailContentWrapper,
  BoxDetailContent,
  DetailInfoWrapper,
  MapInfoWrapper,
  GroupInfoWrapper,
};
