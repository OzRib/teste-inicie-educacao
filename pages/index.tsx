import React from 'react';
import Head from 'next/head';
import { styled } from '@mui/material';
import {
  Grid,
  Typography,
  Fade
} from '@mui/material';
import type { NextPage } from 'next';

const RootDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh'
});

const Home: NextPage = () => {
  const steps = ['presentation1', 'presentation2', 'presentation3']

  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <RootDiv>
        <Grid container spacing={1} maxWidth="md">
          <Grid item xs={12}>
            <Fade
              timeout={700}
              in={true}
            >
              <Typography align="center" variant="h5" color="primary">
                Olá!
              </Typography>
            </Fade>
          </Grid>
        </Grid>
      </RootDiv>
    </React.Fragment>
  )
}

export default Home
