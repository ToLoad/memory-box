import styled from 'styled-components';

const EditWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  max-width: 1000px;
  height: fit-content;
  max-height: 80%;
  z-index: 0;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(13px);
  border-radius: 10px;
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
    @media ${props => props.theme.mobile} {
      width: 100%;
      text-align: center;
    }
    h3 {
      margin-left: 30px;
      color: red;
    }
  }

  .container {
    width: 40%;
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
`;

const ContentFooter = styled.div`
  width: 100%;
  height: 20%;
  /* background-color: aliceblue; */
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media ${props => props.theme.mobile} {
    justify-content: center;
  }
  .button {
    color: white;
    font-weight: 1000;
    width: 20%;
    background-color: blue;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
    margin-right: 30px;
    margin-bottom: 10px;
    cursor: pointer;
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
    pointer-events: none;
    background-color: black;
  }
`;

const Blank = styled.div`
  width: 95%;
  height: 10px;
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
  margin-left: 30px;
  @media ${props => props.theme.mobile} {
    justify-content: center;
  }
  .ant-switch {
    margin: 4px 8px;
    width: 80px;
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
  align-items: flex-end;
  margin-bottom: 20px;
  @media ${props => props.theme.mobile} {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .button {
    /* margin-bottom: 30px; */
    margin-left: 30px;
    cursor: pointer;
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background-color: white;
    border-radius: 5px;
    border: 0.5px solid black;
    @media ${props => props.theme.mobile} {
      margin: 0;
      margin-top: 20px;
    }
  }

  .img-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 120px;
      height: 120px;
      border-radius: 100%;
      object-fit: cover;
    }

    p {
      font-weight: 700;
    }
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
};
