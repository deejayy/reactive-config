import { createAction, props } from '@ngrx/store';
import { ReactiveConfigState } from './reactive-config.state';

export class ReactiveConfigActions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static setValue = createAction('[ReactiveConfig] Set value', props<{ key: string | number | symbol; value: any }>());
  public static initConfig = createAction('[ReactiveConfig] Initialization', props<{ config: ReactiveConfigState }>());
}
