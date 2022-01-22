import React, { useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import firebase from "firebase"
import { useSelector } from "react-redux"

import Icon from "../components/Icon"
import ListItem from "../components/lists/ListItem"
import Screen from "../components/Screen"
import ProfileComponent from "../components/ProfileComponent"
import AppModal2 from "../components/AppModal2"
import colors from "../../config/colors"
const Account = ({ navigation }) => {
  const currentUser = useSelector((state) => state.user.currentUser)

  const [modal, setModal] = useState(false)

  const menuItems = [
    {
      title: "Mes Posts",
      icon: {
        name: "format-list-bulleted",
        iconColor: "white",
        backgroundColor: colors.primary,
      },
      navigate: "UserPosts",
    },
    {
      title: "Sauvegardés",
      icon: {
        name: "bookmark",
        iconColor: "white",
        backgroundColor: colors.primary,
      },
      navigate: "SavedPosts",
    },
    // {
    //   title: "Remarques/avis",
    //   icon: {
    //     name: "clipboard-alert",
    //     iconColor: "white",
    //     backgroundColor: colors.primary,
    //   },
    //   navigate: "Report",
    // },
    // {
    //   title: "Mes Messages",
    //   icon: {
    //     name: "email",
    //     iconColor: "white",
    //     backgroundColor: "red",
    //   },
    //   navigate: "Messages",
    // },
  ]
  const onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(`error`, error)
      })
  }
  if (!currentUser) {
    return <View></View>
  }
  return (
    <>
      <Screen>
        <ProfileComponent
          image={currentUser.image}
          title={currentUser.name}
          subTitle={currentUser.email}
          // buttonTitle="Modifier"
          // buttonAction={() => setModal(true)}
        />
        <View style={styles.container}>
          <FlatList
            scrollEnabled={false}
            data={menuItems}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <ListItem
                title={item.title}
                onPress={() => navigation.navigate(item.navigate)}
                ImageComponent={
                  <Icon
                    name={item.icon.name}
                    iconColor={item.icon.iconColor}
                    backgroundColor={item.icon.backgroundColor}
                  />
                }
              />
            )}
          />
        </View>

        <View
          style={{
            flex: 1,
            bottom: 200,
            position: "absolute",
            width: "100%",
          }}
        >
          <ListItem
            onPress={() => setModal(true)}
            title="Déconnexion"
            ImageComponent={
              <Icon backgroundColor={colors.danger} name="logout" />
            }
          />
        </View>
      </Screen>
      <AppModal2
        visible={modal}
        onClose={setModal}
        onPress={onSignOut}
        text="Confirmer la déconnexion ? "
        confirmText="Confirmer"
      />
    </>
  )
}

export default Account
const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginVertical: 40,
    marginBottom: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
})
