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
import * as SQLite from "expo-sqlite";

import { theme } from "../constants";
import { GetChallengeById, CountChallenges } from "../services/challenge";

const { width, height } = Dimensions.get("window");
const db = SQLite.openDatabase('funnyquizzes.db');

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

  playNextChallenge(challenge) {
    this.updateScore(challenge);
    challenge.id == CountChallenges() ?
      this.setState({showChampion: true}) :
      this.setState({showCorrect: true});
  }

  updateScore(challenge) {
    db.transaction(tx => {
      tx.executeSql("UPDATE score SET challenge_id = ? WHERE id = 1", [challenge.id]);
    });
  }

  renderOptions(challenge) {
    return (
      <Block row center middle style={styles.container}>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          data={challenge.options.split(',')}
          renderItem={({ item }) => (
            <Button color="green" card
            style={{width: 70, height: 70, margin: 10 }}
            onPress={() => {
                parseInt(item) == parseInt(challenge.answer) ? this.playNextChallenge(challenge) : this.setState({ showWrong: true })
              }
            }
            >
              <Text h2 center bold white style={styles.content}>
                { item }
              </Text>
            </Button>
          )}
        />
      </Block>
    );
  }

  renderCorrect(challenge) {
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
            <Button color="red" shadow icon style={{paddingLeft: 50}} onPress={() => {
                this.setState({showCorrect: false});
                navigation.navigate("Challenge", {
                  challengeId: parseInt(challenge.id) + 1
                });
              }}>
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
    const { navigation } = this.props
    const challengeId = navigation.state.params.challengeId
    const challenge = GetChallengeById(challengeId);
    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h1 center bold color="red">
            Challenge {challenge.id}
          </Text>
        </Block>
        <Block center>
          <Text h1 center bold>
            {challenge.question}
          </Text>
        </Block>
        <Block>
          {this.renderOptions(challenge)}
          {this.renderCorrect(challenge)}
          {this.renderWrong()}
          {this.renderChampion(navigation)}
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
