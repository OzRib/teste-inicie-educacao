import React from 'react';
import clientApi from '@services/clientApi';
import type { PublicPostPayload } from '@roadmap/actions/publicComments';

const ackonwledgementActions = {
  sayEnd: async (payload: PublicPostPayload) => {
    const { userId } = payload;
    await clientApi.delete(`/users/${userId}`);

    return {
      message: (
        <React.Fragment>
          Chegamos ao fim...
        </React.Fragment>
      ),
      payload,
      helper: null
    };
  },
  askGoodbye: (payload: any) => ({
    message: (
      <React.Fragment>
        Isso é um adeus?
      </React.Fragment>
    ),
    payload,
    helper: null
  }),
  hopeNo: (payload: any) => ({
    message: (
      <React.Fragment>
        Bem... Espero que não!
      </React.Fragment>
    ),
    payload,
    helper: null
  }),
  waitForYou: (payload: any) => ({
    message: (
      <React.Fragment>
        Te vejo em breve! &#x01f60a;
      </React.Fragment>
    ),
    payload,
    helper: null
  }),
  greetting: (payload: any) => ({
    message: (
      <React.Fragment>
        Obrigado!
      </React.Fragment>
    ),
    payload,
    helper: null
  })
};

export default ackonwledgementActions;
