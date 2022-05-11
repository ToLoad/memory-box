import styled from 'styled-components';

const CartegoriWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 20px;
  height: 50px;
  /* background-color: yellow; */
  border-bottom: 2px solid white;
`;

const CartegoriContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: white;
  .content {
    cursor: pointer;
    font-size: 22px;
    width: 80px;
    height: 35px;
    text-align: center;
    margin: auto 0;
    :hover {
      /* background-image: linear-gradient(
        180deg,
        #e37239 0%,
        rgba(249, 188, 113, 1) 100%
      );
      background-repeat: no-repeat;
      background-size: 100% 50%;
      background-position: 0 100%; */
      transition: background-image 0.23s ease-in;
      /* text-shadow: -1.5px 0px whitesmoke, 0px 1.5px whitesmoke,
        1.5px 0px whitesmoke, 0px -1.5px whitesmoke; */
      color: #e37239;
    }
  }

  .click {
    font-size: 21px;
    font-weight: 1000;
    height: 100%;
    color: #e37239;
    /* background-color: white; */
    text-shadow: -1.5px 0px whitesmoke, 0px 1.5px whitesmoke,
      1.5px 0px whitesmoke, 0px -1.5px whitesmoke;
    /* background-image: linear-gradient(
      180deg,
      #e37239 0%,
      rgba(249, 188, 113, 1) 100%
    );
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 0 88%; */
    transition: color 0.5s ease-in;
  }
`;

export { CartegoriWrapper, CartegoriContent };
