import React, { Component } from "react"
import { Text, Linking, View } from "react-native"
import { connect } from "react-redux"
import firebase from "firebase"
import { bindActionCreators } from "redux"
import { fetchUser, fetchUserPosts } from "../../redux/actions/index"
import AppButton from "../components/AppButton"

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser()
    this.props.fetchUserPosts()
  }
  onSignOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
  }
  _handleOpenWithLinking = () => {
    Linking.openURL("exp://gk-wc9.abdeebda.wantedfb.exp.direct:80/Feed")
  }
  render() {
    return (
      <View>
        {this.props.currentUser && (
          <Text> Bonjour {this.props.currentUser.name} !</Text>
        )}

        <AppButton
          title="Missings"
          onPress={() => this.props.navigation.navigate("Feed")}
        />
        <AppButton
          title="Students"
          onPress={() => this.props.navigation.navigate("Feed2")}
        />
        <AppButton title="Deconnect" onPress={this.onSignOut} />
      </View>
    )
  }
}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUser,
      fetchUserPosts,
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(Main)
