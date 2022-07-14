import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReactiveConfigActions } from './reactive-config.actions';
import { getValue } from './reactive-config.selectors';
import { ReactiveConfigState } from './reactive-config.state';

@Injectable()
export class ReactiveConfigFacade<ConfigModel> {
  constructor(private store: Store<ReactiveConfigState>) {}

  public setValue(key: keyof ConfigModel, value: ConfigModel[keyof ConfigModel]): void {
    this.store.dispatch(ReactiveConfigActions.setValue({ key, value }));
  }

  public getValue(key: keyof ConfigModel) {
    return this.store.select(getValue(key));
  }

  public init(config: ReactiveConfigState) {
    this.store.dispatch(ReactiveConfigActions.initConfig({ config }));
  }
}
