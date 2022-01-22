import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import colors from "../../config/colors"
import AppText from "./AppText"
import AppTextInput from "./AppTextInput"
import IconButton from "./IconButton"

const Messages = () => {
  const messages = [
    {
      date: "12/01",
      message:
        "I'm trying to get data from an array and using map function to render content. Look at",
    },
    {
      date: "12/01",
      message: "Don't forget to return the mapped array , like:",
    },
  ]
  const [message, setMessage] = useState("")

  const renderMessages = () => {
    return messages.map((data) => {
      return (
        <View
          key={data.message}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            marginTop: 8,
            paddingVertical: 8,
          }}
        >
          <Text style={{ fontWeight: "400", color: colors.medium }}>
            {data.date}
          </Text>
          <AppText style2={{ width: "70%" }}>{data.message}</AppText>
          <IconButton name="close" size={20} />
        </View>
      )
    })
  }
  return (
    <View style={{ flex: 1 }}>
      <AppText>Mettre à jour</AppText>
      {renderMessages()}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 16,
        }}
      >
        <AppTextInput
          placeholder="Test"
          width={"80%"}
          onChangeText={(value) => setMessage(value)}
        />
        <IconButton
          name="send"
          size={35}
          color={colors.secondary}
          onPress={() =>
            console.log(messages.push({ date: "12/01", message: message }))
          }
        />
      </View>
    </View>
  )
}

export default Messages

const styles = StyleSheet.create({})
