import React from 'react';
import Head from 'next/head';
import { styled } from '@mui/material';
import {
  Grid,
  Typography,
  Fade,
  Link,
  Box,
  Button
} from '@mui/material';
import { useRoadmap } from '@providers/roadmap';
import type { NextPage } from 'next';

const RootBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start'
});

const Home: NextPage = () => {
  const { roadmap, nextStep } = useRoadmap();
  const [showMessage, setShowMessage] = React.useState(true);
  const [buttonActive, setButtonActive] = React.useState(true);
  const animationDuration = 500;
  let endAnimation = false;

  async function handleButtonClick() {
    if (endAnimation === false)
      return

    endAnimation = false;
    setShowMessage(false);
    const haveStepAfter = await nextStep(animationDuration);
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
      <RootBox>
        <Grid container spacing={2}>
          <Grid
            item
            xs={roadmap.stepData.helper ? 8 : 12}
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
              <Typography align="center" variant="h6" color="primary">
                {roadmap.stepData.message}
              </Typography>
            </Fade>
          </Grid>
          <Grid
            item
            xs={roadmap.stepData.helper ? 4 : false}
          >
            <Fade
              in={Boolean(roadmap.stepData.helper)}
              timeout={animationDuration}
            >
              <Box
                sx={{
                  display: roadmap.stepData.helper ? 'inherit' : 'none',
                  height: '90vh',
                  overflow: 'auto'
                }}
              >
                {roadmap.stepData.helper}
              </Box>
            </Fade>
          </Grid>
        </Grid>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            top: '60%'
          }}
        >
          <Fade
            in={buttonActive}
            timeout={animationDuration}
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                marginBottom: 16
              }}
              onClick={handleButtonClick}
            >
              Continuar
            </Button>
          </Fade>
          <Fade
            timeout={animationDuration}
            in={Boolean(roadmap.stepData.showInfo)}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Link href="https://github.com/OzRib/teste-inicie-educacao" target="_blank">
                Github do projeto
              </Link>
              <Link href="https://gorest.co.in" target="_blank">
                Api GoRest
              </Link>
            </Box>
          </Fade>
        </Box>
      </RootBox>
    </React.Fragment>
  )
}

export default Home;
