import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Modal,
  StyleSheet,
  ImageBackground
} from "react-native";

import { Button, Block, Text } from "../components";
import { theme } from "../constants";
import Term from  "./Term";

const { width, height } = Dimensions.get("window");

class Home extends Component {
  static navigationOptions = {
    header: null
  };

  scrollX = new Animated.Value(0);

  constructor() {
    super()
    this.state = {
      showTerms: false
    };
  }
  renderButtons() {
    return (
      <Block middle flex={0.5} margin={[0, theme.sizes.padding * 4]}>
        <Button>
        {/* <ImageBackground source={require("../assets/images/button_play.png")} style={{width: '100%', height: '100%', resizeMode: "cover"}}>
          <Text center semibold white transform="uppercase" color="white">
              Play
            </Text>
        </ImageBackground> */}
        </Button>
        <Button color="green" onPress={() => navigation.navigate("Challenges")} style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <Text center semibold white transform="uppercase" color="white">
            Play
          </Text>
          <Image source={require("../assets/icons/play.png")} style={{width: 25, height: 25, justifyContent: "flex-end"}}></Image>
        </Button>
        <Button color="yellow" shadow onPress={() => navigation.navigate("Setting")}>
          <Text center semibold  transform="uppercase" color="white">
            Setting
          </Text>
        </Button>
        <Button color="red" shadow onPress={() => navigation.navigate("Exit")}>
          <Text center semibold transform="uppercase" color="white">
            Exit
          </Text>
        </Button>
        <Button onPress={() => this.setState({ showTerms: true })}>
          <Text center caption gray>
            Terms of service
          </Text>
        </Button>
      </Block>
    )
  }

  renderPopupExit() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showTerms}
        onRequestClose={() => this.setState({ showTerms: false })}
      >
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h2 light>
            Terms of Service
          </Text>

          <Term></Term>
          
          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button
              gradient
              onPress={() => this.setState({ showTerms: false })}
            >
              <Text center white>
                I understand
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  }
  
  render() {
    const { navigation } = this.props;

    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h1 center bold primary>
            Funny Quizzes
          </Text>
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
            Enjoy the experience.
          </Text>
        </Block>
        {this.renderButtons()}
        {this.renderPopupExit()}
      </Block>
    );
  }
}

Home.defaultProps = {
  // icons: mocks.icons
};

export default Home;

const styles = StyleSheet.create({
});
