import React, { useState } from 'react';
import { Tooltip } from '@mui/material';

export default function UserProfile(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  return (
    <>
      {props.value.userProfileImage ? (
        <>
          <Tooltip
            disableFocusListener
            title={props.value.userNickname}
            placement="top"
            arrow
          >
            <img
              className="userImage"
              src={props.value.userProfileImage}
              onClick={handleTooltipOpen}
            />
          </Tooltip>
        </>
      ) : (
        <Tooltip
          disableFocusListener
          title={props.value.userNickname}
          placement="top"
          arrow
        >
          <img src="혼구리2.png" alt="사진없노" />
        </Tooltip>
      )}
    </>
  );
}

// open={tooltipOpen}
// onClose={handleTooltipClose}
