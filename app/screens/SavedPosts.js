import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import firebase from "firebase"
import { useSelector } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"

import Screen from "../components/Screen"
import Card3 from "../components/Card3"
import NoResult from "../components/NoResult"

const SavedPosts = () => {
  let posts = useSelector((state) => state.user.savedPosts)
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key")
      if (value !== null) {
        if (posts.length === 0) posts = value.savedPosts
      }
    } catch (e) {
      // error reading value
    }
  }
  return (
    <Screen>
      <View>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Card3 post={item} />}
          ListEmptyComponent={() => <NoResult />}
        />
      </View>
    </Screen>
  )
}

export default SavedPosts
