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

const { width, height } = Dimensions.get("window");

class Challenge extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super()
    this.state = {
      showCorrect: false,
      showChampion: false,
      showWrong: false
    };
  }

  renderOptions() {
    return (
      <Block row center middle style={styles.container}>
        <Button color="green" card style={{width: 70, height: 70, margin: 10 }} onPress={() => this.setState({ showCorrect: true })}>
          <Text h2 center bold white style={styles.content}>
            16
          </Text>
        </Button>
        <Button color="green" card style={{width: 70, height: 70, margin: 10 }} onPress={() => this.setState({ showWrong: true })}>
          <Text h2 center bold white style={styles.content}>
            20
          </Text>
        </Button>
        <Button color="green" card style={{width: 70, height: 70, margin: 10 }} onPress={() => this.setState({ showChampion: true })}>
          <Text h2 center bold white style={styles.content}>
            32
          </Text>
        </Button>
        <Button color="green" card style={{width: 70, height: 70, margin: 10 }}>
          <Text h2 center bold white style={styles.content}>
            40
          </Text>
        </Button>
      </Block>
    );
  }

  renderCorrect() {
    const { navigation } = this.props;
    return(
      <Modal
        animationType="slide"
        visible={this.state.showCorrect}
        onRequestClose={() => this.setState({ showCorrect: false })}
      >
        <Block style={{marginTop: 100}}>
          <Block center>
            <Image source={require("../assets/icons/correct.png")} style={{width:"30%", height:"32%"}}>
            </Image>
            <Text h1 center bold black>
              Congrats
            </Text>
            <Text h3 center bold black>
              Your answer is correct
            </Text>
          </Block>
          <Block middle style={{width: "60%", marginLeft: 100}}>
            <Button color="red" shadow icon style={{paddingLeft: 50}} onPress={() => navigation.navigate("Challenges")}>
              <Text center semibold white transform="uppercase" color="white">
                NEXT CHALLENGE
              </Text>
              <Image source={require("../assets/icons/next.png")} style={styles.btnIcon}></Image>
            </Button>
          </Block>
        </Block>
      </Modal>
    )
  }

  renderChampion() {
    const { navigation } = this.props;
    return(
      <Modal
        animationType="slide"
        visible={this.state.showChampion}
        onRequestClose={() => this.setState({ showChampion: false })}
      >
        <Block style={{marginTop: 100}}>
          <Block center>
            <Image source={require("../assets/icons/cup.png")} style={{width:"30%", height:"32%"}}>
            </Image>
            <Text h1 center bold black>
              Congrats
            </Text>
            <Text h3 center bold black>
              You are championship
            </Text>
          </Block>
          <Block middle style={{width: "60%", marginLeft: 100}}>
            <Button color="red" shadow icon style={{paddingLeft: 60}} onPress={() => navigation.navigate("Home")}>
              <Text center semibold white transform="uppercase" color="white">
                RETURN HOME
              </Text>
              <Image source={require("../assets/icons/home.png")} style={styles.btnIcon}></Image>
            </Button>
          </Block>
        </Block>
      </Modal>
    )
  }

  renderWrong() {
    const { navigation } = this.props;
    return(
      <Modal
        animationType="slide"
        visible={this.state.showWrong}
        onRequestClose={() => this.setState({ showWrong: false })}
      >
        <Block style={{marginTop: 100}}>
          <Block center>
            <Image source={require("../assets/icons/wrong.png")} style={{width:"30%", height:"32%"}}>
            </Image>
            <Text h1 center bold black>
              Wrong
            </Text>
            <Text h3 center bold black>
              Your answer is wrong
            </Text>
          </Block>
          <Block middle style={{width: "60%", marginLeft: 100}}>
            <Button color="red" shadow icon style={{paddingLeft: 100}} onPress={() => this.setState({ showWrong: false })}>
              <Text center semibold white transform="uppercase" color="white">
                RETRY
              </Text>
              <Image source={require("../assets/icons/retry.png")} style={styles.btnIcon}></Image>
            </Button>
          </Block>
        </Block>
      </Modal>
    )
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h1 center bold color="red">
            Challenge 1
          </Text>
        </Block>
        <Block center>
          <Text h1 center bold>
            4, 8, 16, ?
          </Text>
        </Block>
        <Block>
          {this.renderOptions()}
          {this.renderCorrect()}
          {this.renderWrong()}
          {this.renderChampion()}
        </Block>
      </Block>
    );
  }
}

Challenge.defaultProps = {
};

export default Challenge;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  content: {
    height: "100%",
    fontSize: theme.fonts.h2.fontSize,
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center"
  }
});
