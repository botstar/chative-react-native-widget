import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const propTypes = {
  channelId: PropTypes.string.isRequired,
  url: PropTypes.string,
  isModalVisible: PropTypes.bool,
};

const WebViewComponent = ({ channelId, url, isModalVisible }) => {
  const webViewRef = useRef(null);

  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        if (webViewRef.current) {
          webViewRef.current.injectJavaScript(`window.openChatWindow();`);
        }
      }, 500); // Delay to ensure WebView is fully loaded
    }
  }, [isModalVisible]);

  return (
    <WebView
      ref={webViewRef}
      scalesPageToFit
      style={styles.webViewContainer}
      source={{
        uri: url ? url : 'https://messenger.stg.chative.io/site/sacfa6e20-cf0a-11ee-a51c-59f486eae982?mode=livechat',
      }}
      injectedJavaScriptBeforeContentLoaded={`
        window.openChatWindow = function() {
          window.ChativeApi('openChatWindow');
        };
        true;
      `}
    />
  );
};

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
});

WebViewComponent.propTypes = propTypes;

export default WebViewComponent;
