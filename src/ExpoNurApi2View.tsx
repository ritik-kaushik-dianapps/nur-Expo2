import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoNurApi2ViewProps } from './ExpoNurApi2.types';

const NativeView: React.ComponentType<ExpoNurApi2ViewProps> =
  requireNativeViewManager('ExpoNurApi2');

export default function ExpoNurApi2View(props: ExpoNurApi2ViewProps) {
  return <NativeView {...props} />;
}
