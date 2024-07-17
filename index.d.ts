// index.d.ts

import { ReactElement } from 'react';
import { ViewStyle } from 'react-native';

declare module '@chative.io/react-native-widget' {
  export interface ChativeWidgetProps {
    channelId: string;
    headerComponent?: ReactElement;
    containerStyle?: ViewStyle;
    insetTop?: number;
    insetBottom?: number;
    onClosed?: () => void;
    onLoaded?: () => void;
    onNewMessage?: (message: any) => void;
  }

  export interface ChativeWidgetRef {
    show: () => void;
    hide: () => void;
    injectJavaScript: (script: string) => void;
    reload: () => void;
  }

  const ChativeWidget: React.ForwardRefExoticComponent<
    ChativeWidgetProps & React.RefAttributes<ChativeWidgetRef>
  >;

  export default ChativeWidget;
}