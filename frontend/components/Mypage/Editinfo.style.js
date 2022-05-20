import styled from 'styled-components';

const EditWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  max-width: 700px;
  height: fit-content;
  max-height: 85%;
  z-index: 0;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(13px);
  border-radius: 20px;
  overflow: hidden;
  @media ${props => props.theme.mobile} {
    overflow: scroll;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto auto 0 auto;
    border-radius: 10px 10px 0 0;
    min-height: 70%;
  }
`;

const EditContent = styled.div`
  width: 95%;
  height: 100%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const Block = styled.div`
  width: 100%;
  min-height: 40%;
  /* background-color: red; */
  margin: 30px 0px;
  display: flex;
  @media ${props => props.theme.mobile} {
    flex-direction: column;
  }
  span {
    width: 40%;
    margin-left: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    @media ${props => props.theme.mobile} {
      width: 100%;
      text-align: center;
      margin-left: 0px;
    }
    h3 {
      /* margin-left: 30px; */

      color: red;
      @media ${props => props.theme.mobile} {
        margin-left: 0px;
      }
    }
    h2 {
      margin: 0;
      width: 100%;
    }
  }

  .container {
    width: 45%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    @media ${props => props.theme.mobile} {
      width: 100%;
      text-align: center;
    }
  }
`;

const ContentDiv = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: white; */
  border-radius: 10px;
`;

const ContentMain = styled.div`
  width: 100%;
  height: 80%;
  padding: 1%;
  text-align: center;
`;

const ContentFooter = styled.div`
  width: 100%;
  height: 20%;
  /* background-color: aliceblue; */
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  /* justify-content: flex-end; */
  justify-content: center;
  align-items: center;
  @media ${props => props.theme.mobile} {
    justify-content: center;
  }
  .button {
    color: black;
    font-weight: 1000;
    width: 35%;
    background-color: #ffebd2;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
    /* margin-right: 30px; */
    /* margin-bottom: 10px; */
    margin-top: 20px;
    cursor: pointer;
    &:hover {
      background-color: #ffa53a;
      transition: 0.3s;
    }
    @media ${props => props.theme.mobile} {
      margin-right: 0px;
      width: 50%;
    }
  }

  .delete {
    cursor: pointer;
    background-color: red;
  }

  .cant-delete {
    color: white;
    pointer-events: none;
    background-color: black;
  }
`;

const Blank = styled.div`
  width: 95%;
  height: 5px;
  border-bottom: 1px solid black;
  margin: 0 auto;
`;

const Warning = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  input {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  p {
    margin: 0;
  }
`;

const CreateToggle = styled.div`
  padding-top: 10px;
  display: flex;
  /* margin-left: 24px; */
  @media ${props => props.theme.mobile} {
    justify-content: center;
    margin-left: 0px;
  }
  .ant-switch {
    margin: 4px 8px;
    width: 50px;
  }
  .ant-switch-checked {
    background-color: #ffa53a;
  }
  .ant-switch-checked:focus {
    box-shadow: none;
  }
`;

const ProfileImgContent = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* margin-bottom: 20px; */
  @media ${props => props.theme.mobile} {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .button {
    color: black;
    font-weight: 1000;
    width: 35%;
    background-color: #ffebd2;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
    /* margin-right: 30px; */
    /* margin-bottom: 10px; */
    margin-top: 20px;
    cursor: pointer;
    &:hover {
      background-color: #ffa53a;
      transition: 0.3s;
    }
    @media ${props => props.theme.mobile} {
      margin-right: 0px;
      width: 50%;
    }
  }

  .img-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 200px;
      height: 200px;
      border-radius: 100%;
      object-fit: cover;
    }

    p {
      font-weight: 700;
    }
  }
`;

const BackButton = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  /* background-color: red; */
  text-align: center;
  padding: 20px;
  font-size: 30px;
  @media ${props => props.theme.mobile} {
    font-size: 30px;
    padding: 15px;
    text-align: left;
  }
`;

export {
  EditWrapper,
  EditContent,
  Block,
  Blank,
  ContentDiv,
  ContentMain,
  ContentFooter,
  Warning,
  CreateToggle,
  ProfileImgContent,
  BackButton,
};
