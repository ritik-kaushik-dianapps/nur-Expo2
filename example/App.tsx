import { StyleSheet, Text, View } from "react-native";

import * as ExpoNurApi2 from "expo-nur-api2";
import { useEffect } from "react";

export default function App() {
  
  const startScan = async () => {
    ExpoNurApi2.startScan();
  };

  const stopScan = async () => {
    ExpoNurApi2.startScan();
  };

  useEffect(() => {
    const subscription1 = ExpoNurApi2.addDeviceListener((e) => {
      console.log('addDeviceListener',e);
      
    });
    const subscription2 = ExpoNurApi2.addScanErrorListener((e) => {
      console.log('addScanErrorListener',e);

    });
    const subscription3 = ExpoNurApi2.addScanListener((e) => {
      console.log('addScanListener',e);

    });
    const subscription4 = ExpoNurApi2.addChangeListener((e) => {
      console.log('addChangeListener',e);

    });

    return () => {
      subscription1.remove();
      subscription2.remove();
      subscription3.remove();
      subscription4.remove();
    };
  }, []);

  useEffect(() => {
    startScan();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{ExpoNurApi2.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
