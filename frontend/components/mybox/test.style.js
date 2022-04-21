import styled from 'styled-components';

const Cover = styled.div`
  max-width: 700px;
  margin: 20px auto;
  /* height: 100%; */
  /* background-color: black; */
`;

// 접히기
const TestBig = styled.div`
  width: 100%;
  /* min-height: 500px; */
  min-height: 0px;
  height: ${props => (props.click ? '10px' : '100%')};
  max-width: 700px;
  /* background-color: green; */
  animation: ${props => (props.click ? 'fadeOutDetail 1s' : 'fadeInDetail 1s')};
  overflow-y: hidden;
  .on {
    animation: OutDetailContent 2s;
  }

  .off {
    animation: InDetailContent 2s;
  }

  @keyframes fadeOutDetail {
    from {
      height: 100%;
    }

    to {
      height: 10%;
    }
  }
  @keyframes fadeInDetail {
    from {
      height: 10px;
    }
    to {
      height: 100%;
    }
  }

  @keyframes OutDetailContent {
    from {
      transform: translateY(0%);
    }
    to {
      transform: translateY(-100%);
    }
  }

  @keyframes InDetailContent {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0%);
    }
  }
`;

const TestSmall = styled.div`
  width: 100%;
  max-width: 700px;
  min-height: 0px;
  /* background-color: red; */
  overflow-y: hidden;
  height: ${props => (props.click ? '200px' : '10px')};
  /* animation: ${props => (props.click ? '' : 'fadeOut 1s')}; */
  animation: ${props =>
    !props.firstClick ? '' : props.click ? 'fadeIn 1s' : 'fadeOut 1s'};
  .on {
    animation: OutContent 2s;
  }
  .off {
    animation: ${props => (!props.firstClick ? '' : 'InContent 2s')};
  }
  @keyframes fadeIn {
    from {
      height: 10px;
    }
    to {
      height: 200px;
    }
  }
  @keyframes fadeOut {
    from {
      height: 200px;
    }
    to {
      height: 10px;
    }
  }
  @keyframes OutContent {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-200px);
    }
  }

  @keyframes InContent {
    from {
      transform: translateY(-200px);
    }
    to {
      transform: translateY(0px);
    }
  }
`;

export { TestSmall, TestBig, Cover };
