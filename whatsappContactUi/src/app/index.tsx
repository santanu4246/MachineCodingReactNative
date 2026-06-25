import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Whatsapp</Text>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height:100,
    backgroundColor:"#222",
    padding:12
  },
  headerText: {
    color: "#FFF",
    fontSize:18
  }
  
});
