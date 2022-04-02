import React from 'react';
import steps, { ActionsKeys, ActionResponse } from '@roadmap/actions';

export interface Roadmap {
  stepName: ActionsKeys
  stepIndex: number
  stepData: ActionResponse
}

export default function createInitialRoadmap(): Roadmap {
  return {
    stepName: steps[0],
    stepIndex: 0,
    stepData: {
      message: (
        <React.Fragment>
          Olá!
        </React.Fragment>
      ),
      payload: null,
      helper: null
    }
  };
}
