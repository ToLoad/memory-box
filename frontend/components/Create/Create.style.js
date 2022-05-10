import styled from 'styled-components';

const CreateWrapper = styled.div`
  text-align: center;
  padding: 100px 0;
`;

const CreateBlock = styled.div`
  display: inline-block;
  height: 670px;
  width: 540px;
  min-width: 350px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 60px;
  font-size: 15px;
  .create-title {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 15px;
    text-align: center;
    color: white;
  }
  .create-person {
    justify-content: space-between;
  }

  @media ${props => props.theme.tablet} {
    padding: 30px 20px;
    transform: none;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: auto;
    border-radius: 0;
  }
`;

const CreateItem = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  position: relative;
  input,
  textarea {
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 20px;
    padding: 12px 18px;
    border: none;
    outline: none;
    resize: none;
  }
  .create-button {
    margin-top: ${props => (props.state ? '10px' : '50px')};
  }
`;

const CreateAddress = styled.div`
  ${props => {
    if (props.state) {
      return {
        animation: 'fadein 1s',
        display: 'block',
      };
    }
    return {
      display: 'none',
    };
  }}
  input {
    cursor: pointer;
  }
  .create-address-icon {
    position: absolute;
    right: 20px;
    top: 18px;
    font-size: 28px;
    color: gray;
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const CreateDate = styled.div`
  padding: 10px 0;
  .ant-picker {
    background-color: inherit;
    width: 100%;
    padding: 0;
    box-shadow: none;
    border: none;
  }
  .ant-picker:hover {
    box-shadow: none;
  }
  .ant-picker-input {
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 20px;
    padding: 12px 18px;
    & > input {
      font-size: 15px;
      ::placeholder {
        color: gray;
      }
    }
  }
  .ant-picker-suffix {
    font-size: 25px;
    margin-right: 5px;
    color: gray;
  }
  .ant-picker-clear {
    font-size: 25px;
    margin-right: 22px;
  }
`;

const CreatePerson = styled.div`
  background-color: ${props => (props.selected ? '#ffebd2' : 'white')};
  border-radius: 20px;
  padding: 12px 15px;
  width: 47%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  svg {
    color: ${props => (props.selected ? '#ffa53a' : 'gray')};
    font-size: 26px;
    margin-right: 5px;
  }
  &:hover {
    background-color: #ffebd2;
    transition: 0.3s;
    svg {
      color: #ffa53a;
    }
  }
`;

const CreateToggle = styled.div`
  padding-top: 10px;
  display: flex;
  .ant-switch {
    margin: 0 8px;
  }
  .ant-switch-checked {
    background-color: #ffa53a;
  }
  .ant-switch-checked:focus {
    box-shadow: none;
  }
`;

export {
  CreateWrapper,
  CreateBlock,
  CreateItem,
  CreateAddress,
  CreateDate,
  CreatePerson,
  CreateToggle,
};
