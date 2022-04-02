import React from "react";
import type { ReactNode } from 'react';

const actions = {
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

export interface ActionResponse {
  message: ReactNode
  payload: any
  helper: ReactNode
}

export interface Action {
  (payload: any): ActionResponse
}

export type Actions = {
  [key in keyof typeof actions]: Action;
};

export type ActionsKeys = keyof Actions;

export const steps: ActionsKeys[] = Object.keys(actions) as ActionsKeys[];

export default actions;
