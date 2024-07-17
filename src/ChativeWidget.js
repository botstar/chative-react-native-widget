import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import WebViewComponent from './WebView';
import { WidgetApi } from './helper';

const propTypes = {
  channelId: PropTypes.string.isRequired,
  headerComponent: PropTypes.element,
  containerStyle: PropTypes.object,
  insetTop: PropTypes.number,
  insetBottom: PropTypes.number,
  onClosed: PropTypes.func,
  onLoaded: PropTypes.func,
  onNewMessage: PropTypes.func,
};

const ChativeWidget = forwardRef(({
  channelId,
  headerComponent,
  containerStyle,
  insetTop = Platform.OS === 'ios' ? 50 : 20,
  insetBottom = Platform.OS === 'ios' ? 50 : 20,
  onClosed,
  onLoaded,
  onNewMessage,
}, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const webViewRef = useRef(null);

  const modalStyleDynamic = {
    zIndex: isModalVisible ? 999 : -1,
    opacity: isModalVisible ? 1 : 0,
  };

  const safeStyle = {
    marginTop: insetTop,
    marginBottom: insetBottom,
  };

  const handleClose = () => {
    setIsModalVisible(false);
    onClosed && onClosed();
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      setIsModalVisible(true);
      webViewRef.current?.injectJavaScript(WidgetApi('openChatWindow'));
    },
    hide: () => {
      setIsModalVisible(false);
      webViewRef.current?.injectJavaScript(WidgetApi('openChatWindow'));
    },
    injectJavaScript: (script) => {
      webViewRef.current?.injectJavaScript(script);
    },
    reload: () => {
      webViewRef.current?.reload();
    },
  }));

  return (
    <SafeAreaView style={[styles.modal, safeStyle, modalStyleDynamic]} >
      <View style={[styles.mainView, containerStyle]}>
        {headerComponent}
        <WebViewComponent
          ref={webViewRef}
          channelId={channelId}
          onLoaded={onLoaded}
          onNewMessage={onNewMessage}
          onClosedWidget={handleClose}
        />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
  },
  mainView: {
    flex: 1,
  },
});

ChativeWidget.propTypes = propTypes;

export default ChativeWidget;