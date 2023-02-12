import { Action, createReducer, on } from '@ngrx/store';
import { ReactiveConfigActions } from './reactive-config.actions';
import { reactiveConfigInitialState, ReactiveConfigState } from './reactive-config.state';

const reducer = createReducer(
  reactiveConfigInitialState,
  on(ReactiveConfigActions.initConfig, (_state, action) => {
    return action.config;
  }),
  on(ReactiveConfigActions.setValue, (state, action) => {
    return {
      ...state,
      [action.key]: action.value,
    };
  }),
);

export const reactiveConfigReducer = (state: ReactiveConfigState | undefined, action: Action): ReactiveConfigState => {
  return reducer(state, action);
};
