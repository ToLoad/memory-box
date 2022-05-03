import styled from 'styled-components';

const UserListWrapper = styled.div`
  max-width: 700px;
  height: 60vh;
  padding: 30px;
  overflow-y: scroll;
  color: black;
  text-align: center;
  ::-webkit-scrollbar {
    width: 5px; /*스크롤바의 너비*/
  }

  ::-webkit-scrollbar-thumb {
    background-color: #e37239; /*스크롤바의 색상*/
  }

  ::-webkit-scrollbar-track {
    background-color: background-color: rgba(255, 255, 255, 0.3); /*스크롤바 트랙 색상*/
  }

  .userLength {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    margin-bottom: 10px;
    
    h2 {
      margin: 0;
    }

    h3 {
      margin:0;
    }
  }
`;

const UserListContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const UserListContent = styled.div`
  width: 180px;
  height: 60px;
  background-color: rgba(220, 220, 220, 0.5);
  border-radius: 8px;
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  .text {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    p {
      margin: 0;
    }
    h3 {
      margin: 0;
    }
  }
  img {
    width: 50px;
    height: 50px;
    margin: auto 5px;
    border-radius: 100%;
  }
`;

export { UserListWrapper, UserListContent, UserListContentWrapper };
