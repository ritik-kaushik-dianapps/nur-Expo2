import { StyleSheet, Text, View } from 'react-native';

import * as ExpoNurApi2 from 'expo-nur-api2';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoNurApi2.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
