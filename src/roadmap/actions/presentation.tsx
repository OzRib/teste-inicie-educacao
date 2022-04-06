import React from "react";

const presentationActions = {
  presentation1: () => ({
    message: (
      <React.Fragment>
        Bem vindo ao teste de admissão de Ozeias!
      </React.Fragment>
    ),
    payload: null,
    helper: null
  }),
  presentation2: () => ({
    message: (
      <React.Fragment>
        Este teste foi feito para uma vaga de Programador Backend Pleno NodeJS.<br />
        Porém, eu, Ozeias Ribeiro sempre quero fazer mais!
      </React.Fragment>
    ),
    payload: null,
    helper: null
  }),
  presentation3: () => ({
    message: (
      <React.Fragment>
        Por isso, decidi fazer além do que me pediram!
      </React.Fragment>
    ),
    payload: null,
    helper: null
  })
};

export default presentationActions;
