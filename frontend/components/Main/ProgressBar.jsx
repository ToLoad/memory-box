import * as React from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { ProgressWrapper } from './Main.style';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    background: 'linear-gradient(90deg,#fcfc60 20%, #ffff00 50%, #ffae00 100%)',
    // theme.palette.mode === 'light'
    //   ? 'linear-gradient(90deg, #ceff1b 0%, #57e3ff 33%)'
    //   : '#95aabd',
  },
}));

export default function ProgressBar(props) {
  const nowPercent = Number(props.percent);
  return (
    <ProgressWrapper>
      <div className="icon">
        <div>📍</div> <div>🎁</div>
      </div>
      <BorderLinearProgress variant="determinate" value={nowPercent} />
    </ProgressWrapper>
  );
}
