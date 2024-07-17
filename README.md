# ChativeWidget for React Native

ChativeWidget is a React Native component that provides an easy-to-use chat widget for your mobile applications. It allows you to integrate a customizable chat interface with minimal setup.

## Features

- Customizable chat interface
- Easy to show/hide programmatically
- Supports custom header components
- Adjustable insets for different device sizes
- TypeScript support

## Installation

```bash
npm install chative-react-native-sdk
# or
yarn add chative-react-native-sdk
```

## Usage

Here's a basic example of how to use the ChativeWidget in your React Native application:

```jsx
import React, { useRef } from 'react';
import { Button, View } from 'react-native';
import ChativeWidget from 'chative-react-native-sdk';

export default function App() {
  const widgetRef = useRef(null);

  const handleOpenChat = () => {
    widgetRef.current?.show();
  };

  const handleCloseChat = () => {
    widgetRef.current?.hide();
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Open Chat" onPress={handleOpenChat} />
      <ChativeWidget
        ref={widgetRef}
        channelId="your-channel-id"
        onClosed={handleCloseChat}
        onLoaded={() => console.log('Widget loaded')}
        onNewMessage={(message) => console.log('New message:', message)}
      />
    </View>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| channelId | string | Yes | The ID of the chat channel |
| headerComponent | ReactElement | No | Custom header component |
| containerStyle | ViewStyle | No | Custom style for the container |
| insetTop | number | No | Top inset (default: 50 for iOS, 20 for Android) |
| insetBottom | number | No | Bottom inset (default: 50 for iOS, 20 for Android) |
| onClosed | () => void | No | Callback when the widget is closed |
| onLoaded | () => void | No | Callback when the widget is loaded |
| onNewMessage | (message: any) => void | No | Callback when a new message is received |

## Methods

The following methods are available via the ref:

- `show()`: Display the chat widget
- `hide()`: Hide the chat widget
- `injectJavaScript(script: string)`: Inject custom JavaScript into the widget
- `reload()`: Reload the widget

## Customization

You can customize the appearance of the widget by providing a custom header component and container style:

```jsx
<ChativeWidget
  ref={widgetRef}
  channelId="your-channel-id"
  headerComponent={<YourCustomHeader />}
  containerStyle={{ backgroundColor: 'lightgray' }}
/>
```

## TypeScript Support

This module includes TypeScript declarations. You can import types like this:

```typescript
import ChativeWidget, { ChativeWidgetRef } from 'chative-react-native-sdk';
```

## License

[MIT License](LICENSE)

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.