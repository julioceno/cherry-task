import { ReactElement } from 'react';
import { UseTRPCQueryResult } from '@trpc/react-query/dist/shared';
import { Loading } from './Loading';
import { HandleErrorPage } from './HandleErrorPage';

export function handleStateErrorsToRender<T>(
  state: any,
  component: ReactElement
): ReactElement {
  if (state.status === 'error') {
    return (
      <HandleErrorPage
        status={state.error.data?.httpStatus}
        error={state.error.message}
      />
    );
  }

  //state.status === 'loading'
  if (state.isLoading) {
    return <Loading />;
  }

  return component;
}
