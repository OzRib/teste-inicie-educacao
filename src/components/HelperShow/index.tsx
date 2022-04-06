import React from 'react';
import { Box } from '@mui/material';
import type { ElementType } from 'react';

const HelperShow: ElementType = function() {
  return (
    <Box
      style={{
        backgroundColor: '#00ff004f',
        opacity: 0.5,
        width: '100%',
        height: '100%',
        animation: 'blink-animation 4s linear 1'
      }}
    />
  )
}

export default HelperShow;
