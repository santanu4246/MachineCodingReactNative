import { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

interface ItemType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const LIMIT = 20;

export default function Index() {
  const [data, setData] = useState<ItemType[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);

  const fetchData = async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      const start = page * LIMIT;
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${LIMIT}`
      );
      const result: ItemType[] = await res.json();
      if (result.length > 0) {
        setData((prev) => [...prev, ...result]);
        setPage((p) => p + 1);
      }
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator style={styles.loader} color="#25D366" />
      )}
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          const isMe = index % 2 === 0;
          return (
            <View
              style={[
                styles.bubble,
                isMe ? styles.bubbleRight : styles.bubbleLeft,
              ]}
            >
              <Text style={styles.body}>{item.body}</Text>
            </View>
          );
        }}
        inverted
        onEndReached={fetchData}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECE5DD",
  },
  list: {
    flex: 1,
    paddingHorizontal: 12,
  },
  loader: {
    paddingVertical: 8,
  },
  bubble: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 2,
    maxWidth: "75%",
  },
  bubbleLeft: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
  },
  bubbleRight: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  body: {
    fontSize: 15,
    color: "#111",
    lineHeight: 20,
  },
});
