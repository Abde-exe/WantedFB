import React from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import Card from "../components/Card"

const UserPosts = ({ route }) => {
  if (route.params.length != 0) {
    return (
      <View>
        <FlatList
          data={route.params}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Card item={item} />}
        />
      </View>
    )
  } else {
    return (
      <View>
        <Text>Pas encore de post</Text>
      </View>
    )
  }
}

export default UserPosts

const styles = StyleSheet.create({})
