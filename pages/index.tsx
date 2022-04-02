import React from 'react';
import Head from 'next/head';
import { styled } from '@mui/material';
import {
  Grid,
  Typography,
  Fade,
  Button
} from '@mui/material';
import { useRoadmap } from '@providers/roadmap';
import type { NextPage } from 'next';

const RootDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start'
});

const Home: NextPage = () => {
  const { roadmap, nextStep } = useRoadmap();
  const [showMessage, setShowMessage] = React.useState(true);
  const [buttonActive, setButtonActive] = React.useState(true);
  const animationDuration = 700;
  let endAnimation = false;

  function handleButtonClick() {
    if (endAnimation === false)
      return

    endAnimation = false;
    setShowMessage(false);
    const haveStepAfter = nextStep(animationDuration);
    setButtonActive(haveStepAfter);

    setTimeout(() => {
      setShowMessage(true);

      setTimeout(() => {
        endAnimation = true;
      }, animationDuration);
    }, animationDuration);
  }

  setTimeout(() => {
    endAnimation = true;
  }, animationDuration);

  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <RootDiv>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            style={{
              height: '40vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end'
            }}
          >
            <Fade
              timeout={animationDuration}
              in={showMessage}
            >
              <Typography align="center" variant="h5" color="primary">
                {roadmap.stepData.message}
              </Typography>
            </Fade>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Fade
              in={buttonActive}
              timeout={animationDuration}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleButtonClick}
              >
                Continuar
              </Button>
            </Fade>
          </Grid>
        </Grid>
      </RootDiv>
    </React.Fragment>
  )
}

export default Home
