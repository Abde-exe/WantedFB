import React, { useRef } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import AppText from "../AppText"
import ImageInput from "./ImageInput"

export default function ImageInputList({
  imageUris = [],
  onRemoveImage,
  onAddImage,
}) {
  const scrollView = useRef()

  return (
    <View style={{ marginHorizontal: 16 }}>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
        //permet le scroll auto tout à droite quand le component change de taille (quand on ajoute une image)
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View style={styles.image} key={uri}>
              <ImageInput imageUri={uri} onChange={() => onRemoveImage(uri)} />
            </View>
          ))}
          <ImageInput onChange={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
})
