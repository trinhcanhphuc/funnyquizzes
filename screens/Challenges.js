import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  View
} from "react-native";
import { AppLoading } from "expo";
import Carousel from "react-native-snap-carousel";
import * as NavigationService from "../services/navigator";
import * as SQLite from "expo-sqlite";
import * as Font from 'expo-font';

import { Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import { CreateTableScore, CreateScore, GetScore } from "../services/score";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const db = SQLite.openDatabase('funnyquizzes.db');
const shadowOpt = {
  width:100,
  height:100,
  color:"#000",
  border:2,
  radius:3,
  opacity:0.2,
  x:0,
  y:3,
  style:{marginVertical:5}
}

scrollX = new Animated.Value(0);

class Challenges extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super()
    this.state = {
      currentChallenge: 0,
      fontLoaded: false
    };
  }

  componentDidMount() {
    this.loadFontAsync()
    CreateTableScore().then((result) => {
      CreateScore(0);
    });
  }

  loadFontAsync = async () => {
    await Font.loadAsync({
      'sf-pro-display-regular': require('../assets/fonts/SF-Pro-Display-Regular.otf'),
      'sf-pro-display-bold': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
      'sf-pro-rounded-bold': require('../assets/fonts/SF-Pro-Rounded-Bold.otf'),
    })
    this.setState({ fontLoaded: true })
  }

  renderItem ({item, index}) {
    return (
      <Button setting={shadowOpt}
        style={ index + 1 <= parseInt(this.state.currentChallenge)  ? styles.cartActive : styles.cartInactive }
        onPress={() => this.props.navigation.navigate("Challenge", {
          challengeId: item.id
        })}
      >
        <Text style={styles.content} numberOfLines={2} setting={shadowOpt}>
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
    if ( !this.state.fontLoaded )
      return <AppLoading />
    const { navigation } = this.props
    return (
      <Block style={ styles.setting }>
        <Button
          onPress={() => navigation.goBack() }
          style={ styles.navigation }
          >
          <Image source={require("../assets/icons/back.png")}></Image>
          <Text style={ styles.navigation_text }> Challenges</Text>
        </Button>
        <Block center bottom flex={0.4} style={{marginBottom: 100}}>
          <Text h1 center bold style={{ fontFamily: 'sf-pro-rounded-bold' }}>
            Challenges
          </Text>
        </Block>
        <Block center middle style={ styles.challenges_list }>
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
  setting: {
    padding: theme.sizes.padding,
    marginBottom: 50
  },
  container: {
    backgroundColor: theme.colors.light.white,
    padding: theme.sizes.padding
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent'
  },
  navigation_text: {
    color: theme.colors.light.blue,
    fontSize: theme.sizes.navigation,
  },
  challenges_list: {
    marginBottom: 100
  },
  cartActive: {
    width: SCREEN_WIDTH - 60,
    height: SCREEN_WIDTH - 60,
    backgroundColor: theme.colors.light.red,
    borderRadius: 20,
    flex: 1,
    shadowOffset:{  width: 5,  height: 5 },
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1.0,
    elevation: 3,
  },
  cartInactive: {
    width: SCREEN_WIDTH - 60,
    height: SCREEN_WIDTH - 60,
    backgroundColor: theme.colors.light.gray,
    borderRadius: 20,
    flex: 1,
    shadowOffset:{  width: 2,  height: 2 },
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1.0,
    elevation: 3,
  },
  content: {
    fontSize: theme.fonts.h1.fontSize,
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
    shadowOffset:{  width: 3,  height: 3 },
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 1.0,
    fontFamily: 'sf-pro-rounded-bold',
    elevation: 3,
  }
})
