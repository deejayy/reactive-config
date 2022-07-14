import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Type,
} from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ReactiveConfigFacade } from './reactive-config.facade';
import { reactiveConfigReducer } from './reactive-config.reducer';
import { ReactiveConfigService } from './reactive-config.service';

interface ConfigSettings {
  configPath: string;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('reactive-config', reactiveConfigReducer),
  ],
  providers: [ReactiveConfigService, ReactiveConfigFacade],
})
export class ReactiveConfigModule {
  public static forRoot<ConfigModel>(
    configurationType: Type<ConfigModel>,
    options?: ConfigSettings
  ): ModuleWithProviders<ReactiveConfigModule> {
    return {
      ngModule: ReactiveConfigModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          multi: true,
          deps: [ReactiveConfigService],
          useFactory: (configService: ReactiveConfigService<ConfigModel>) => {
            return () => {
              const configPath = options?.configPath || '/assets/config.json';
              const result = configService.loadAppConfig(configPath);
              configService.init(result);
              return result;
            };
          },
        },
      ],
    };
  }
}
