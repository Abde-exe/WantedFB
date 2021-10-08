import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native"
import ListItem from "../components/lists/ListItem"
import ListItemDelete from "../components/lists/ListItemDelete"
import Screen from "../components/Screen"
import Separator from "../components/Separator"

const msg = [
  {
    id: 1,
    title: "T1",
    description: "D1",
    image: require("../../assets/pp.png"),
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image: require("../../assets/pp.png"),
  },
]
const Messages = () => {
  const [messages, setMessages] = useState(msg)
  const [refreshing, setRefreshing] = useState(false)

  const handleDelete = (message) => {
    //Delete the message from messages
    setMessages(messages.filter((light) => light.id != message.id))
  }
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={messages}
        ItemSeparatorComponent={Separator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            ...messages,
            {
              id: 3,
              title: "T3",
              description: "D3",
              image: require("../../assets/pp.png"),
            },
          ])
          setRefreshing(false)
        }}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            image={item.image}
            title={item.title}
            subTitle={item.description}
            onPress={() => console.log(`navigation`)}
            renderRightActions={() => (
              <ListItemDelete onPress={() => handleDelete(item)} />
            )}
          />
        )}
      />
    </Screen>
  )
}

export default Messages

const styles = StyleSheet.create({
  screen: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "yellow",
  },
})
