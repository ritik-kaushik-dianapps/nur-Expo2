import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoNurApi2.web.ts
// and on native platforms to ExpoNurApi2.ts
import ExpoNurApi2Module from './ExpoNurApi2Module';
import ExpoNurApi2View from './ExpoNurApi2View';
import { ChangeEventPayload, ExpoNurApi2ViewProps } from './ExpoNurApi2.types';

// Get the native constant value.
export const PI = ExpoNurApi2Module.PI;

export function hello(): string {
  return ExpoNurApi2Module.hello();
}

export function startScan(): string {
  return ExpoNurApi2Module.startScan();
}

export async function setValueAsync(value: string) {
  return await ExpoNurApi2Module.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoNurApi2Module ?? NativeModulesProxy.ExpoNurApi2);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export function addDeviceListener(listener: (event: any) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onDeviceFound', listener);
}

export function addScanListener(listener: (event: any) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onScanFinished', listener);
}

export function addScanErrorListener(listener: (event: any) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onScanError', listener);
}
export { ExpoNurApi2View, ExpoNurApi2ViewProps, ChangeEventPayload };
