import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  View
} from "react-native";
import Carousel from 'react-native-snap-carousel';
import * as NavigationService from '../services/navigator';

import { Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

scrollX = new Animated.Value(0);

class Challenges extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super()
    this.state = {
    };
  }

  renderItem ({item, index}) {
    return (
      <Button
        style={ index > 0 ? styles.cartInactive : styles.cartActive }
        onPress={() => this.props.navigation.navigate("Challenge")}
      >
        <Text style={styles.content} numberOfLines={2}>
          { item.question }
        </Text>
      </Button>
    );
  }

  renderChallenges() {
    const { challenges } = this.props;

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
