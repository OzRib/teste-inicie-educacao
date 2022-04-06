import React from 'react';
import HelperShow from '@components/HelperShow';

const infosActions = {
  infosPresentation: () => ({
    message: (
      <React.Fragment>
        Claro, durante todo o processo estarão disponíveis as informações necessárias para você acompanhar o processo.
      </React.Fragment>
    ),
    payload: null,
    helper: null
  }),
  infosLinks: () => ({
    message: (
      <React.Fragment>
        Os links do projeto no GitHub e da API GoRest estarão logo abaixo do botão "Continuar".
      </React.Fragment>
    ),
    payload: null,
    helper: null,
    showInfo: true
  }),
  infosHelpArea: () => ({
    message: (
      <React.Fragment>
        Uma área de ajuda para exibir as informações necessárias aparecerá na área em destaque.
      </React.Fragment>
    ),
    payload: null,
    helper: (
      <HelperShow />
    ),
    showInfo: true
  })
};

export default infosActions;
