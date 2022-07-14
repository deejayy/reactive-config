[![npm](https://img.shields.io/npm/v/@deejayy/reactive-config?label=reactive-config)](https://www.npmjs.com/package/@deejayy/reactive-config)

# Runtime Reactive Configuration handler for Angular

## Install

```
npm i @deejayy/reactive-config
```

## Define your configuration type

```ts
export class ConfigVars {
  public apiUrl!: string;
}
```

## Add module to imports

```ts
imports: [
  ...
  ReactiveConfigModule.forRoot(ConfigVars, { configPath: '/assets/config-new.json' }),
],
```

## Create configuration file with the fields defined in your type

/assets/config-new.json:


```json
{
  "apiUrl": "http://localhost"
}
```

## Use the config values from anywhere

```html
Static variable: {{ apiUrl }}
Reactive variable: {{ apiUrl$ | async }}
```

```ts
public apiUrl: string = this.config.get('apiUrl'); // gets the latest value statically
public apiUrl$: Observable<string> = this.config.getStream('apiUrl'); // get values reactively with streams

constructor (private config: ReactiveConfigService<ConfigVars>) {}
```

## Update the values runtime

```html
<button (click)="updateVar()">change</button>
```

```ts
public updateVar() {
  this.config.set('apiUrl', 'new value');
}
```
