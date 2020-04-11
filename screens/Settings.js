import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Switch,
} from "react-native";
import { AppLoading } from "expo";
import { ScrollView } from "react-native-gesture-handler";
import * as Font from 'expo-font';

import { Button, Block, Text } from "../components";
import { theme } from "../constants";
import { lang } from "../constants";
import { CreateTableSetting, CreateSetting, GetSetting, UpdateSetting } from "../services/setting";


class Settings extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super()
    this.state = {
      sound: true,
      lang: "en",
      fontLoaded: false
    }
  }

  componentDidMount() {
    this.loadFontAsync()
    CreateTableSetting().then((result) => {
      CreateSetting(true, "en");
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

  loadFontAsync = async () => {
    await Font.loadAsync({
      'sf-pro-display-regular': require('../assets/fonts/SF-Pro-Display-Regular.otf'),
      'sf-pro-display-bold': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
      'sf-pro-rounded-bold': require('../assets/fonts/SF-Pro-Rounded-Bold.otf'),
    })
    this.setState({ fontLoaded: true })
  }

  saveSetting = (sound) => {
    this.setState({
      sound: sound
    });
    UpdateSetting(sound == true ? 1 : 0, null)
  };

  onGoBack = data => {
    this.setState(data)
  };

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
          <Text style={ styles.navigation_text }> Lists</Text>
        </Button>
        <Text style={styles.title}>Settings</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <Block color="white"
            style={styles.section}>
            <Text style={ styles.section_text }>Sound</Text>
            <Switch
              onValueChange = { () =>
                this.saveSetting(!this.state.sound, null)
              }
              value = { this.state.sound }
            />
          </Block>
          <Button color="white"
            onPress={() => this.props.navigation.navigate("Languages", {
              lang: this.state.lang,
              onGoBack: this.onGoBack
            })}
            style={styles.section}>
            <Text style={ styles.section_text }>Language</Text>
            <Image source={require("../assets/icons/next.png")}></Image>
          </Button>
          <Button color="white"
            style={styles.section}>
            <Text style={ styles.section_text }>Reset score</Text>
            <Image source={require("../assets/icons/next.png")}></Image>
          </Button>
        </ScrollView>
      </Block>
    );
  }
}

Settings.defaultProps = {
  langs: lang.langs
};

export default Settings;

const styles = StyleSheet.create({
  modal: {
    width: '100%'
  },
  setting: {
    backgroundColor: theme.colors.light.gray,
    padding: theme.sizes.padding
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
  title: {
    fontSize: theme.sizes.title,
    color: theme.colors.light.orange,
    fontFamily: 'sf-pro-rounded-bold',
    fontWeight: 'bold',
    marginBottom: 20
  },
  radio_input: {
    margin: 5,
    marginLeft: 0
  },
  radio_label: {
    color: theme.colors.light.gray
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: theme.sizes.maxHeight,
    borderRadius: theme.sizes.radius,
    backgroundColor: theme.colors.light.white,
    marginTop: theme.sizes.base,
    marginBottom: 0,
    padding: theme.sizes.base
  },
  section_text: {
    fontSize: theme.sizes.body
  }
});
