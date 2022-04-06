import React from 'react';
import actions, { steps } from "@roadmap/actions";
import createInitialRoadmap from '@roadmap/index';
import type { Action } from '@roadmap/actions';
import type { Roadmap } from '@roadmap/index';
import type { ReactNode } from 'react';

interface RoadmapContextType {
  roadmap: Roadmap
  nextStep: (callbackTimeout: number) => Promise<boolean> | boolean
}

interface RoadmapProviderProps {
  children: ReactNode
}

export const RoadmapContext = React.createContext<RoadmapContextType>({
  roadmap: createInitialRoadmap(),
  nextStep: () => true
});

export default function RoadmapProvider({ children }: RoadmapProviderProps) {
  const [roadmap, setRoadmap] = React.useState(createInitialRoadmap());

  async function nextStep(callbackTimeout: number): Promise<boolean> {
    const { stepIndex, stepData } = roadmap;
    const { payload } = stepData;
    const nextStepIndex = stepIndex + 1;
    const nextStepName = steps[nextStepIndex];

    if (nextStepName === undefined)
      return false;

    const nextStepAction: Action = actions[nextStepName];
    
    const nextStepData = await nextStepAction(payload);
    setTimeout(() => setRoadmap({
      stepName: nextStepName,
      stepIndex: nextStepIndex,
      stepData: nextStepData
    }), callbackTimeout);

    const haveStepAfter = Boolean(steps[nextStepIndex + 1]);
    return haveStepAfter;
  }

  return (
    <RoadmapContext.Provider
      value={{
        roadmap,
        nextStep
      }}
    >
      {children}
    </RoadmapContext.Provider>
  )
}

export function useRoadmap() {
  return React.useContext(RoadmapContext);
}
