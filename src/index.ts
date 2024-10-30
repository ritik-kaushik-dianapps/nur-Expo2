import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoNurApi2.web.ts
// and on native platforms to ExpoNurApi2.ts
import ExpoNurApi2Module from './ExpoNurApi2Module';

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

export function addDeviceListener(listener: (event: any) => void): Subscription {
  return emitter.addListener<any>('onDeviceFound', listener);
}

export function addScanListener(listener: (event: any) => void): Subscription {
  return emitter.addListener<any>('onScanFinished', listener);
}

export function addScanErrorListener(listener: (event: any) => void): Subscription {
  return emitter.addListener<any>('onScanError', listener);
}