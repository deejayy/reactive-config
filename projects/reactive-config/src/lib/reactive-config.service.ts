import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReactiveConfigState } from 'projects/reactive-config/src/lib/reactive-config.state';
import { catchError, map, Observable, of, shareReplay, take } from 'rxjs';
import { ReactiveConfigFacade } from './reactive-config.facade';

const DEFAULT_CONFIG_PATH = '/assets/config.json';

@Injectable()
export class ReactiveConfigService<ConfigModel extends ReactiveConfigState> {
  private appConfig: ConfigModel = {} as ConfigModel;
  private configPath: string = '';

  constructor(private http: HttpClient, private facade: ReactiveConfigFacade<ConfigModel>) {}

  public loadAppConfig(configPath: string = DEFAULT_CONFIG_PATH): Observable<ConfigModel> {
    this.configPath = configPath;
    return this.http.get<ConfigModel>(`${configPath}?cache=${new Date().getTime()}`).pipe(
      map((data) => {
        // this is an ugly solution, deep clone may fit more instead of spreading
        this.appConfig = { ...data };
        return data;
      }),
      shareReplay(),
      catchError((err) => {
        console.error('Error when loading configuration:', err);
        return of();
      }),
    );
  }

  public init(config$: Observable<ConfigModel>) {
    config$.pipe(take(1)).subscribe((config) => this.facade.init(config));
  }

  public reload() {
    const result = this.loadAppConfig(this.configPath);
    this.init(result);
  }

  public get(key: keyof ConfigModel): ConfigModel[keyof ConfigModel] {
    if (!this.appConfig) {
      throw Error('Config is not ready!');
    }

    return this.appConfig[key];
  }

  public set(key: keyof ConfigModel, value: ConfigModel[keyof ConfigModel]): void {
    this.appConfig[key] = value;
    this.facade.setValue(key, value);
  }

  public getStream(key: keyof ConfigModel): Observable<ConfigModel[keyof ConfigModel]> {
    return this.facade.getValue(key);
  }
}
