import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { WIDGET_URL } from './constants';
import { generateScript, generateScriptGetError, safeParse } from './utils';

const propTypes = {
  channelId: PropTypes.string.isRequired,
  user: PropTypes.object,
  onLoaded: PropTypes.func,
  onClosedWidget: PropTypes.func,
  onNewMessage: PropTypes.func,
  onError: PropTypes.func,
};

const WebViewComponent = forwardRef(({ channelId, user, onLoaded, onClosedWidget, onNewMessage, onError }, ref) => {
  const webViewRef = useRef(null);
  const javascriptInit = React.useMemo(() => generateScript(user), [user]);
  const errorScript = React.useMemo(() => generateScriptGetError(), []);

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
      injectedJavaScript={errorScript}
      source={{
        uri: `${WIDGET_URL}/${channelId}?mode=livechat&state=${user ? 'off' : 'on'}`,
      }}
      onLoadEnd={() => {
        webViewRef.current?.injectJavaScript(javascriptInit);
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

        if (parsedData.event === 'ready') {
          onLoaded && onLoaded();
        }

        if (parsedData.event === 'error') {
          onError && onError(parsedData.message);
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

export default React.memo(WebViewComponent);
