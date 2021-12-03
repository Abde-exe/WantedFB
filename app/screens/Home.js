import React, { Component } from "react"
import { Linking, View, Pressable, StyleSheet } from "react-native"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import colors from "../../config/colors"
import { fetchUser, fetchUserPosts } from "../../redux/actions/index"
import AppText from "../components/AppText"
import Screen from "../components/Screen"
import Icon from "../components/Icon"

export class Home extends Component {
  componentDidMount() {
    this.props.fetchUser()
    this.props.fetchUserPosts()
  }

  _handleOpenWithLinking = () => {
    Linking.openURL("exp://gk-wc9.abdeebda.wantedfb.exp.direct:80/Feed")
  }
  render() {
    return (
      <Screen>
        <View style={{ flexDirection: "column", flex: 1 }}>
          {this.props.currentUser && (
            <AppText style={{ fontSize: 32, marginLeft: 16 }}>
              Bonjour {this.props.currentUser.name}
            </AppText>
          )}
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Pressable
              style={styles.view}
              onPress={() => this.props.navigation.navigate("Feed")}
            >
              <Icon
                size={80}
                name="account-child"
                iconColor={colors.secondary}
                backgroundColor="white"
              />
              <AppText style2={styles.text}>Disparitions</AppText>
            </Pressable>
            <Pressable
              style={styles.view}
              onPress={() => this.props.navigation.navigate("Feed2")}
            >
              <Icon
                size={80}
                name="school"
                iconColor={colors.secondary}
                backgroundColor="white"
              />
              <AppText style2={styles.text}>Etudiants</AppText>
            </Pressable>
          </View>
        </View>
      </Screen>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    color: colors.white,
    fontSize: 32,
    marginLeft: 8,
    alignSelf: "flex-start",
  },
  text: {
    textAlign: "center",
    color: colors.white,
  },
  view: {
    backgroundColor: colors.primary,
    width: "50%",
    height: "25%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
})
