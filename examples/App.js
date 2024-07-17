import ChativeWidget from 'chative-react-native-sdk';
import React, { useRef } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';

export default function App() {
  const chativeWidgetRef = useRef(null);

  const handleOpenModal = () => {
    chativeWidgetRef.current.show();
  };

  const handleCloseModal = () => {
    chativeWidgetRef.current.hide();
  };

  const onLoaded = () => {
    console.log('onLoaded');
  };

  const onNewMessage = () => {
    console.log('onNewMessage');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button onPress={handleOpenModal} title="Open" />
      </View>
      <ChativeWidget
        ref={chativeWidgetRef}
        channelId="sacfa6e20-cf0a-11ee-a51c-59f486eae982"
        onLoaded={onLoaded}
        onClosed={handleCloseModal}
        onNewMessage={onNewMessage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
