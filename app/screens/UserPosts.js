import React from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import Card from "../components/Card"

const UserPosts = ({ route }) => {
  return (
    <View>
      <FlatList
        data={route.params}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card item={item} />}
      />
    </View>
  )
}

export default UserPosts

const styles = StyleSheet.create({})
