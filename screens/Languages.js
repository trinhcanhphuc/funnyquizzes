import React, { Component } from "react";
import {
  Image,
  StyleSheet,
} from "react-native";
import { AppLoading } from "expo";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { ScrollView } from "react-native-gesture-handler";
import * as Font from 'expo-font';

import { Button, Block, Text } from "../components";
import { theme } from "../constants";
import { lang } from "../constants";
import { UpdateSetting } from "../services/setting";


class Languages extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super()
    this.state = {
      lang: "en",
      fontLoaded: false
    }
  }

  componentDidMount() {
    this.loadFontAsync()
    const { navigation } = this.props
    this.setState({
      lang: navigation.state.params.lang
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

  saveSetting = (lang) => {
    this.setState({
      lang: lang
    });
    UpdateSetting(null, lang);
  };

  render() {
    if ( !this.state.fontLoaded )
      return <AppLoading />
    const { navigation } = this.props
    const langs = lang.langs
    return (
      <Block
        style={styles.container}
      >
        <Button
          onPress={() => {
              navigation.goBack()
              navigation.state.params.onGoBack({ lang: this.state.lang });
            }
          }
          style={ styles.navigation }
          >
          <Image source={require("../assets/icons/back.png")}></Image>
          <Text style={ styles.navigation_text }> Lists</Text>
        </Button>
        <Text style={ styles.title }>Languages</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <RadioForm
            formHorizontal={false}
            animation={true}
            initial={0}
          />
            {
              langs.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i} >
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={this.state.lang === obj.value}
                    onPress={(obj) => { 
                      this.saveSetting(obj);
                    }}
                    borderWidth={2}
                    buttonInnerColor={theme.colors.light.orange}
                    buttonOuterColor={this.state.lang === obj.value ? theme.colors.light.orange : theme.colors.light.gray2}
                    buttonStyle={ styles.radio_input }
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={(obj) => { 
                      this.saveSetting(obj);
                    }}
                    labelStyle={{fontSize: theme.sizes.body, color: theme.colors.light.black}}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))
            }  
        </ScrollView>
      </Block>
    );
  }F
}

Languages.defaultProps = {
  langs: lang.langs
};

export default Languages;

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
    marginBottom: theme.sizes.base,
    padding: theme.sizes.base
  },
  section_text: {
    fontSize: theme.sizes.body
  }
});
