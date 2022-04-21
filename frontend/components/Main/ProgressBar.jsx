import { Progress } from 'antd';
import React from 'react';
import { ProgressWrapper } from './Main.style';

export default function ProgressBar(props) {
  const nowPercent = props.percent;
  return (
    <div>
      <ProgressWrapper>
        <div className="icon">
          <div>📍</div> <div>🎁</div>
        </div>
        <Progress
          strokeColor={{
            '0%': '#ff91ed',
            '100%': '#6c34fa',
          }}
          percent={nowPercent}
          showInfo={false}
        />
      </ProgressWrapper>
    </div>
  );
}
