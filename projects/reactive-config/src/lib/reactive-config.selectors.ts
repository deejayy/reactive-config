import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReactiveConfigState } from './reactive-config.state';

export const getReactiveConfigState = createFeatureSelector<ReactiveConfigState>('reactive-config');

export const getValue = <ConfigModel>(key: keyof ConfigModel) =>
  createSelector(getReactiveConfigState, (state) => state[key]);
