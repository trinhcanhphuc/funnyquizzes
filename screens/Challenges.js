import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  View
} from "react-native";
import Carousel from "react-native-snap-carousel";
import * as NavigationService from "../services/navigator";
import * as SQLite from "expo-sqlite";

import { Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import { CreateTableScore, CreateScore, GetScore } from "../services/score";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const db = SQLite.openDatabase('funnyquizzes.db');

scrollX = new Animated.Value(0);

class Challenges extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super()
    this.state = {
      currentChallenge: 0
    };
  }

  componentDidMount() {
    CreateTableScore().then((result) => {
      CreateScore(0);
    });
  }

  renderItem ({item, index}) {
    return (
      <Button
        style={ index + 1 <= parseInt(this.state.currentChallenge)  ? styles.cartActive : styles.cartInactive }
        onPress={() => this.props.navigation.navigate("Challenge", {
          challengeId: item.id
        })}
      >
        <Text style={styles.content} numberOfLines={2}>
          { item.question }
        </Text>
      </Button>
    );
  }

  renderChallenges() {
    const { challenges } = this.props;
    GetScore().then((result) => {
      if(result){
        this.setState({currentChallenge: result.challenge_id})
      }
    });

    return (
      <Carousel
        sliderWidth={SCREEN_WIDTH}
        sliderHeight={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH - 60}
        data={challenges}
        renderItem={this.renderItem.bind(this)}
      />
    );
  }

  render() {
    return (
      <Block>
        <Block center bottom flex={0.4} style={{marginBottom: 100}}>
          <Text h1 center bold>
            Challenges
          </Text>
        </Block>
        <Block center middle>
          {this.renderChallenges()}
        </Block>
      </Block>
    );
  }
}

Challenges.defaultProps = {
  challenges: mocks.challenges
};

export default Challenges;

const styles = StyleSheet.create({
  cartActive: {
    width: SCREEN_WIDTH - 60,
    height: SCREEN_WIDTH - 60,
    backgroundColor: theme.colors.red,
    borderRadius: 20
  },
  cartInactive: {
    width: SCREEN_WIDTH - 60,
    height: SCREEN_WIDTH - 60,
    backgroundColor: theme.colors.gray,
    borderRadius: 20
  },
  content: {
    height: "100%",
    fontSize: theme.fonts.h2.fontSize,
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center"
  }
})
