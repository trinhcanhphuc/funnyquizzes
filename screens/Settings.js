import React, { Component } from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Switch,
} from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import ModalWrapper from 'react-native-modal-wrapper';
import { ScrollView } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";

import { Button, Block, Text } from "../components";
import { theme } from "../constants";
import { lang } from "../constants";
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
      lang: "en",
      showLangForm: false
    }
  }

  componentDidMount() {
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

  saveSetting = (sound, lang) => {
    this.setState({
      sound: sound,
      lang: lang
    });
    UpdateSetting(sound == true ? 1 : 0, lang);
  };

  renderLangForm() {
    const { langs } = this.props;
    return (
      <ModalWrapper
        onRequestClose={() => this.setState({ showLangForm: false })}
        containerStyle={{ flexDirection: 'row', justifyContent: 'flex-end' }}
        position="right"
        style={{ width: '100%' }}
        visible={this.state.showLangForm}>
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
        >
          <Block style={{ flexDirection: 'row', maxHeight: 100 }}>
            <Block style={{ flex: 1 }}>
              <Button
                onPress={() => {
                  this.setState({ showLangForm: false });
                }}
                style={{ flexDirection: 'row' }}
                >
                <Image source={require("../assets/icons/next.png")}
                  style={{ width: 40, marginLeft: -10 }}
                ></Image>
                <Text style={{ flex: 1, marginTop: 3, fontSize: theme.sizes.h2 }}>Back</Text>
              </Button>
            </Block>
            <Block style={{ flex: 1 }}>
              <Text style={{textAlign: 'center', marginTop: 11, fontSize: theme.sizes.h2 }}>Language</Text>
            </Block>
            <Block style={{ flex: 1 }}></Block>
          </Block>
          <Block>
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
                          this.saveSetting(this.state.sound, obj);
                        }}
                        borderWidth={2}
                        buttonInnerColor={'#e74c3c'}
                        buttonOuterColor={this.state.lang === i ? '#2196f3' : '#000'}
                        buttonStyle={{ marginTop: 10, marginBottom: 10}}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        onPress={(obj) => { 
                          this.saveSetting(this.state.sound, obj);
                        }}
                        labelStyle={{fontSize: 20, color: '#2ecc71'}}
                        labelWrapStyle={{}}
                      />
                    </RadioButton>
                  ))
                }  
            </ScrollView>
          </Block>
        </Block>
      </ModalWrapper>
    );
  }

  render() {
    const { navigation } = this.props
    return (
      <Block color="gray" padding={[100, 50]}>
        <Block color="white"
          style={styles.section}>
          <Text>Sound</Text>
          <Switch
             onValueChange = { () => 
              this.saveSetting(!this.state.sound, this.state.lang)
            }
             value = { this.state.sound }
          />
        </Block>
        <Block color="white"
          style={styles.section}>
          <Text>Language</Text>
          <Button onPress={() => this.setState({showLangForm: true})}>
            <Image source={require("../assets/icons/next.png")}></Image>
          </Button>
        </Block>
        <Block color="white"
          style={styles.section}>
          <Text>Reset score</Text>
          <Image source={require("../assets/icons/next.png")}></Image>
        </Block>
        { this.renderLangForm() }
      </Block>
    );
  }F
}

Settings.defaultProps = {
  langs: lang.langs
};

export default Settings;

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
    maxHeight: 80,
    borderRadius: 10,
    margin: 10,
  }
});
