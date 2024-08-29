// index.d.ts

import { ReactElement } from 'react';
import { ViewStyle } from 'react-native';

declare module '@chative.io/react-native-widget' {
  export interface ChativeWidgetUser {
    user_id: string;
    user: {
      email?: string;
      first_name?: string;
      last_name?: string;
      phone?: string;
      [key: string]: any;
    };
  }
  export interface ChativeWidgetProps {
    channelId: string;
    user?: ChativeWidgetUser;
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