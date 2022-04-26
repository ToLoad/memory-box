import styled from 'styled-components';

const ProfileCardWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  max-width: 700px;
  height: 280px;
  margin: auto;
  @media ${props => props.theme.mobile} {
    height: 420px;
  }
`;

const ProfileContent = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(13px);
  border-radius: 10px;
`;

const UserInfo = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;

  @media ${props => props.theme.mobile} {
    flex-direction: column;
    height: auto;
  }

  p {
    margin: 0;
    margin-top: 4px;
    color: rgba(93, 94, 97, 1);
  }

  h1 {
    margin: 0;
    margin-bottom: 5px;
  }

  h3 {
    margin: 0;
  }

  .img {
    width: 35%;
    height: 100%;
    display: flex;
    @media ${props => props.theme.mobile} {
      width: 100%;
      margin: 20px 0;
    }
    img {
      width: 120px;
      height: 120px;
      border-radius: 100%;
      margin: auto;
    }
  }

  .content {
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    @media ${props => props.theme.mobile} {
      width: 90%;
      margin: 0 auto;
      align-items: center;
    }
  }
`;

const ButtonContent = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  @media ${props => props.theme.mobile} {
    justify-content: center;
  }

  .editprofile {
    cursor: pointer;
    width: 120px;
    height: 45px;
    border-radius: 10px;
    background-color: #ffa53a;
    text-align: center;
    margin-left: 30px;
    line-height: 45px;
    font-size: 18px;
    font-weight: 800;
    @media ${props => props.theme.mobile} {
      margin-left: 0px;
    }
    :hover {
      background-color: #e8993c;
    }

    :checked {
      background-color: #e8993c;
    }
  }
`;

export { ProfileCardWrapper, ProfileContent, UserInfo, ButtonContent };
