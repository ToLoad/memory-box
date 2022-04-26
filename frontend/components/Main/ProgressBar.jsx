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
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
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
