import { useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
interface Contacts {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
}

export default function Index() {
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchContact();
  }, []);
  const fetchContact = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=10");

      const data = await response.json();

      const users: Contacts[] = data.results.map(
        (user: any, index: number) => ({
          id: index.toString(),
          name: user.name.first,
          avatar: user.picture.large,
          lastMessage: "hey, how are you!",
        }),
      );

      setContacts(users);
      console.log(users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterContacts = useMemo(()=>{
    if(!search.trim()) return contacts;
    return contacts.filter((item)=>(
      item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    ))
  },[contacts, search])

  const renderItem = ({ item }: { item: Contacts }) => (
    <TouchableOpacity style={styles.contacts}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Whatsapp</Text>
        <TextInput placeholder="Search" value={search} onChangeText={setSearch} style={styles.search}/>
      </View>
      
      <FlatList
        data={filterContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 100,
    backgroundColor: "#075E54",
    padding: 12,
   
  },
  headerText: {
    color: "#FFF",
    fontSize: 18,
    paddingBottom:5
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  contacts: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: "600",
  },
  message: {
    color: "#777",
    marginTop: 4,
    fontSize: 14,
  },
  search: {
    backgroundColor: "#fff",
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});
