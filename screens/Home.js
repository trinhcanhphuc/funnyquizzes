import React, { Component } from "react";
import {
  Animated,
  Image,
  Modal,
  StyleSheet,
  ImageBackground,
  BackHandler
} from "react-native";

import { Button, Block, Text } from "../components";
import { theme } from "../constants";
import TermForm from  "./TermForm";

class Home extends Component {
  static navigationOptions = {
    header: null
  };

  scrollX = new Animated.Value(0);

  constructor() {
    super()
    this.state = {
      showTermForm: false,
      showExitForm: false
    };
  }

  renderButtons() {
    const { navigation } = this.props;

    return (
      <Block middle flex={0.5} margin={[0, theme.sizes.padding * 4]}>
        <Button color="green" shadow icon style={ styles.btn_home } 
          onPress={() => navigation.navigate("Challenges")}>
          <Text center semibold white transform="uppercase" color="white" style={ styles.btn_home_text, { marginRight: '30%', fontSize: theme.sizes.h3 } }>
            Play
          </Text>
          <Image source={require("../assets/icons/play.png")} style={styles.btnIcon}></Image>
        </Button>
        {/* <Button color="yellow" shadow icon style={ styles.btn_home }
          onPress={() => navigation.navigate("Settings")}>
          <Text center semibold transform="uppercase" color="white"
          style={ styles.btn_home_text, { marginRight: '22%', fontSize: theme.sizes.h3 } }>
            Setting
          </Text>
          <Image
            source={require("../assets/icons/setting.png")}
            style={styles.btnIcon}>
          </Image>
        </Button> */}
        <Button color="red" shadow icon style={ styles.btn_home }
          onPress={() => this.setState({ showExitForm: true })}>
          <Text center semibold transform="uppercase" color="white"
          style={ styles.btn_home_text, { marginRight: '30%', fontSize: theme.sizes.h3 } }>
            Exit
          </Text>
          <Image source={require("../assets/icons/exit.png")} style={styles.btnIcon}></Image>
        </Button>
        {/* <Text center body white style={{marginTop: 50}}
        onPress={() => this.setState({ showTermForm: true })} >
          Terms of service
        </Text> */}
      </Block>
    )
  }

  renderTermForm() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showTermForm}
        onRequestClose={() => this.setState({ showTermForm: false })}
      >
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h2 light>
            Terms of Service
          </Text>

          <TermForm></TermForm>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button
              color="green"
              onPress={() => this.setState({ showTermForm: false })}
            >
              <Text center white style={ styles.btn_home_text }>
                I understand
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  }

  renderExitForm() {
    return (
      <Modal
        animationType="fade"
        visible={this.state.showExitForm}
        onRequestClose={() => this.setState({ showExitForm: false })}
      >
        <ImageBackground source={require("../assets/images/exit_background.png")} style={{width:"100%", height:"100%"}}>
          <Block
            padding={[theme.sizes.padding * 2, theme.sizes.padding]}
            space="between"
            style={{
              marginTop: "70%"
            }}
          >
            <Text h2 white center>
              Do you want to exit?
            </Text>

            <Block middle padding={[theme.sizes.base / 2, 0]}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: "5%",
                paddingRight: "5%",
                marginTop: 50
              }}>
              <Button color="red" shadow icon
              style={{width:150, paddingLeft: "15%"}}
              onPress={() => BackHandler.exitApp()}
                >
                <Text left semibold white transform="uppercase" style={{  marginRight: '20%', fontSize: theme.sizes.h3 }}>
                  Yes
                </Text>
                <Image source={require("../assets/icons/yes.png")} style={styles.btnIcon}></Image>
              </Button>
              <Button color="white" shadow icon
              style={{width:150, paddingLeft: "15%"}}
              onPress={() => this.setState({ showExitForm: false })}>
                <Text center semibold black transform="uppercase" style={{  marginRight: '25%', fontSize: theme.sizes.h3 }}>
                  No
                </Text>
                <Image source={require("../assets/icons/no.png")} style={styles.btnIcon}></Image>
              </Button>
            </Block>
          </Block>
        </ImageBackground>
      </Modal>
    );
  }

  render() {

    return (
      <Block>
        <ImageBackground source={require("../assets/images/home_background.png")} style={{width:"100%", height:"100%"}}>
          <Block center bottom flex={0.4}>
            <Text h1 center bold white>
              Funny Quizzes
            </Text>
            <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
              Enjoy the experience.
            </Text>
          </Block>
          {this.renderButtons()}
          {/* {this.renderTermForm()} */}
          {this.renderExitForm()}
        </ImageBackground>
      </Block>
    );
  }
}

Home.defaultProps = {
};

export default Home;

const styles = StyleSheet.create({
  btn_home: {
    marginTop: theme.sizes.base,
    marginBottom: 0,
    justifyContent: "flex-end"
  },
  btn_home_text: {
    fontSize: theme.sizes.h3
  },
  btnIcon: {
    width: 25,
    height: 26
  }
});
