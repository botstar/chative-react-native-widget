import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { WIDGET_URL } from './constants';
import { generateScript, safeParse } from './utils';

const propTypes = {
  channelId: PropTypes.string.isRequired,
  onLoaded: PropTypes.func,
  onClosedWidget: PropTypes.func,
  onNewMessage: PropTypes.func,
};

const WebViewComponent = forwardRef(({ channelId, onLoaded, onClosedWidget, onNewMessage }, ref) => {
  const webViewRef = useRef(null);

  const javascript = generateScript();

  useImperativeHandle(ref, () => ({
    injectJavaScript: (script) => {
      webViewRef.current?.injectJavaScript(script);
    },
    reload: () => {
      webViewRef.current?.reload();
    },
  }));

  return (
    <WebView
      ref={webViewRef}
      style={styles.webViewContainer}
      source={{
        uri: `${WIDGET_URL}/${channelId}?mode=livechat`,
      }}
      onLoadEnd={() => {
        webViewRef.current?.injectJavaScript(javascript);
        onLoaded();
      }}
      onMessage={(event) => {
        const { data } = event.nativeEvent;
        const parsedData = safeParse(data);

        if (parsedData.event === 'closed') {
          onClosedWidget && onClosedWidget();
        }

        if (parsedData.event === 'new-agent-message') {
          onNewMessage && onNewMessage();
        }
      }}
    />
  );
});

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
});

WebViewComponent.propTypes = propTypes;

export default WebViewComponent;
