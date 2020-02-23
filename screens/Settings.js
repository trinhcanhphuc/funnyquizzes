import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Modal,
  StyleSheet,
  ImageBackground,
  Switch
} from "react-native";

import { Button, Block, Text } from "../components";
import * as SQLite from "expo-sqlite";

import { theme } from "../constants";
import { GetChallengeById, CountChallenges } from "../services/challenge";
import { CreateTableSetting, CreateSetting, GetSetting, UpdateSetting } from "../services/setting";

const { width, height } = Dimensions.get("window");
const db = SQLite.openDatabase('funnyquizzes.db');

class Settings extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super()
    this.state = {
      sound: true,
      lang: "en"
    }
  }

  componentDidMount() {
    CreateTableSetting().then((result) => {
    });
    CreateSetting(true, "en").then((result) => {
    });
    GetSetting().then((result) => {
      if (result) {
        this.setState({
          sound: parseInt(result.sound) == 1 ? true : false,
          lang: result.lang
        });
      }
    })
  }

  saveSetting = () => {
    const currentSound = this.state.sound;
    this.setState({
      sound: !currentSound
    });
    UpdateSetting(!currentSound == true ? 1 : 0, this.state.lang).then((result) => {
      GetSetting().then((result) => {
      });
    })
  };

  render() {
    const { navigation } = this.props
    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text>Sound</Text>
          <Switch
             onValueChange = { this.saveSetting }
             value = { this.state.sound }
          />
        </Block>
        <Block>
          <Text>Language</Text>
        </Block>
        <Block>
          <Text>Reset score</Text>
        </Block>
      </Block>
    );
  }
}

Settings.defaultProps = {
};

export default Settings;

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
