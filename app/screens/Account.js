import React, { useContext, useState, useEffect } from "react"
import {
  FlatList,
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native"
import firebase from "firebase"
import { connect } from "react-redux"

import Icon from "../components/Icon"
import ListItem from "../components/lists/ListItem"
import Screen from "../components/Screen"
import Separator from "../components/Separator"
import ProfileComponent from "../components/ProfileComponent"
import UpdateProfile from "./UpdateProfile"

const Account = ({ currentUser, navigation }) => {
  const [modal, setModal] = useState(false)
  const [userPosts, setUserPosts] = useState([])
  const [user, setUser] = useState(null)

  const menuItems = [
    {
      title: "Mes Posts",
      icon: {
        name: "format-list-bulleted",
        iconColor: "white",
        backgroundColor: "blue",
      },
      navigate: "UserPosts",
    },
    {
      title: "Mes Messages",
      icon: {
        name: "email",
        iconColor: "white",
        backgroundColor: "red",
      },
      navigate: "Messages",
    },
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
          buttonTitle="Modifier"
          buttonAction={() => setModal(true)}
        />
        <View style={styles.container}>
          <FlatList
            scrollEnabled={false}
            data={menuItems}
            keyExtractor={(item) => item.title}
            ItemSeparatorComponent={Separator}
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
        <ListItem
          onPress={onSignOut}
          title="Déconnexion"
          ImageComponent={<Icon backgroundColor="yellow" name="logout" />}
        />
      </Screen>
      <View style={styles.centeredView}>
        <UpdateProfile modal={modal} setModal={setModal} />
      </View>
    </>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
})
export default connect(mapStateToProps, null)(Account)
const styles = StyleSheet.create({
  container: {
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
