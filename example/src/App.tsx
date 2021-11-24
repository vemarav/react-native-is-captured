import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { useIsCaptured } from 'react-native-is-captured';

export default function App() {
  const isCaptured = useIsCaptured();
  
  return (
    <View style={styles.container}>
      <Text style={[styles.text, isCaptured ? styles.active : styles.inactive]}>
        Is Screen being Captured? { isCaptured ? "Yes" : "No"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  text: {fontSize: 20, fontWeight: 'bold'},
  active : {color : '#FC3d39'},
  inactive : {color : '#767676'}
});
