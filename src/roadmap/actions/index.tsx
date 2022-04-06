import presentation from '@roadmap/actions/presentation';
import infos from '@roadmap/actions/infos';
import users from '@roadmap/actions/users';
import posts from '@roadmap/actions/posts';
import comments from '@roadmap/actions/comments';
import publicComments from '@roadmap/actions/publicComments';
import acknowledgement from '@roadmap/actions/acknowledgement';
import type { ReactNode, ReactElement } from 'react';

const actions = {
  ...presentation,
  ...infos,
  ...users,
  ...posts,
  ...comments,
  ...publicComments,
  ...acknowledgement
};

export interface ActionResponse {
  message: ReactNode
  payload: any
  helper: ReactElement<any, any> | null
  showInfo?: boolean
}

export interface Action {
  (payload: any): Promise<ActionResponse> | ActionResponse
}

export type Actions = {
  [key in keyof typeof actions]: Action;
};

export type ActionsKeys = keyof Actions;

export const steps: ActionsKeys[] = Object.keys(actions) as ActionsKeys[];

export default actions;
