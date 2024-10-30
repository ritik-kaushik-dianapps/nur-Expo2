import * as React from 'react';

import { ExpoNurApi2ViewProps } from './ExpoNurApi2.types';

export default function ExpoNurApi2View(props: ExpoNurApi2ViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
