import React, { Component } from "react"
import { Text, StyleSheet, View } from "react-native"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import firebase from "firebase"
import { fetchUser } from "../../redux/actions/index"
import AppButton from "../components/AppButton"
export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser()
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
  render() {
    return (
      <View>
        {this.props.currentUser && (
          <Text> Bonjour {this.props.currentUser.name} !</Text>
        )}

        <AppButton title="Deconnect" onPress={this.onSignOut} />
        <AppButton
          title="Feed"
          onPress={() => this.props.navigation.navigate("AppTab")}
        />
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
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(Main)
