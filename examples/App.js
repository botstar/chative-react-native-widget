import ChativeWidget from '@chative.io/react-native-widget';
import React, { useRef } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';

export default function App() {
  const chativeWidgetRef = useRef(null);
  const channelId = 's49f3a621-2f07-45a4-8019-92663014b997'; // Replace with your channel id

  const handleOpenModal = () => {
    chativeWidgetRef.current.show();
  };

  const handleCloseModal = () => {
    // chativeWidgetRef.current.hide();
  };

  const onLoaded = () => {
    console.log('onLoaded');
  };

  const onNewMessage = () => {
    console.log('onNewMessage');
  }

  const onError = (error) => {
    console.log('Error:', error);
  }

  const user = {
    user_id: 'UNIQUE_USER_ID',
    user: {
      email: 'abc@gmail.com',
      first_name: 'Chative',
      last_name: 'User',
      phone: '1234567890',
    },
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button onPress={handleOpenModal} title="Open" />
      </View>
      <ChativeWidget
        ref={chativeWidgetRef}
        channelId={channelId}
        user={user}
        onLoaded={onLoaded}
        onClosed={handleCloseModal}
        onNewMessage={onNewMessage}
        onError={onError}
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
