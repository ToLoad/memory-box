import styled from 'styled-components';

const LandingWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LandingBlock = styled.div`
  margin: 150px 0 100px 0;
  width: 60vw;
  height: auto;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 1vw;
  border: 5px solid white;
  display: flex;
  align-items: center;
  flex-direction: column;
  word-break: keep-all;
  @media ${props => props.theme.laptopS} {
    width: 95%;
    margin: 10px 0 10px 0;
  } ;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    cursor: pointer;
    margin-top: 20px;
    width: 250px;
    height: 120px;
  }
  #subTitle {
    margin-top: 20px;
    font-size: 58px;
    color: white;
  }
  #content {
    margin-top: 20px;
    text-align: center;
    font-size: 25px;
  }
  #toggle {
    margin-top: 50px;
    .ant-switch {
      margin: 4px 8px;
      width: 130px;
      height: 50px;
    }
    .ant-switch-handle {
      top: 5px;
      left: 5px;
      width: 40px;
      height: 40px;
    }
    .ant-switch-checked .ant-switch-handle {
      left: calc(100% - 40px - 5px);
    }
    .ant-switch-handle::before {
      border-radius: 20px;
    }
    .ant-switch-inner {
      padding-left: 10px;
      font-size: 18px;
    }
    .ant-switch-checked .ant-switch-inner {
      padding-left: 0;
      padding-right: 10px;
      font-size: 18px;
    }
    .ant-switch-checked {
      background-color: #ffa53a;
    }
    .ant-switch-checked:focus {
      box-shadow: none;
    }
  }
  @media ${props => props.theme.laptopS} {
    img {
      margin-top: 20px;
      width: 120px;
      height: 60px;
    }
    #subTitle {
      margin-top: 20px;
      font-size: 30px;
      color: white;
    }
    #content {
      text-align: center;
      font-size: 15px;
    }
    #toggle {
      margin-top: 20px;
      .ant-switch {
        margin: 4px 8px;
        width: 80px;
        height: 22px;
      }
      .ant-switch-handle {
        top: 2px;
        left: 2px;
        width: 18px;
        height: 18px;
      }
      .ant-switch-inner {
        padding-left: 0px;
        font-size: 13px;
      }
      .ant-switch-checked .ant-switch-inner {
        padding-right: 0px;
        font-size: 13px;
      }
      .ant-switch-checked .ant-switch-handle {
        left: calc(100% - 18px - 2px);
      }
      .ant-switch-handle::before {
        border-radius: 20px;
      }
      .ant-switch-checked {
        background-color: #ffa53a;
      }
      .ant-switch-checked:focus {
        box-shadow: none;
      }
    }
  }
`;

const ContentBlock = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  width: 95%;
  .content {
    display: flex;
    font-size: 20px;
    margin: 50px 0;
    img {
      width: 50%;
      padding: 0 10px;
    }
    div {
      width: 50%;
      padding: 0 10px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      word-break: keep-all;
    }
  }
  @media ${props => props.theme.laptopS} {
    margin-top: 10px;
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 15px;
      margin: 20px 0;
      img {
        width: 95%;
      }
      div {
        margin-top: 20px;
        width: 95%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        word-break: normal;
      }
    }
    #right {
      flex-direction: column-reverse;
    }
  }
`;

export { LandingWrapper, LandingBlock, TitleBlock, ContentBlock };
