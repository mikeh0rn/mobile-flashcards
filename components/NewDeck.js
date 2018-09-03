
// import { submitDeck, submitDeckQuestion } from '../utils/api'
// import { getMetricMetaInfo, timeToString } from './helpers'
import React, { Component } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { saveDeck } from '../utils/api';
import { AsyncStorage } from 'react-native'
import styled from 'styled-components/native'

export default class NewDeck extends Component {
  state = {
    title: ''
  }

  handleTextChange = (input) => {
    this.setState({
      title: input
    })
  }

  submit(title) {
    if (title) {
      saveDeck(title)
        .then((deck) => {
          this.setState({
            title: ''
          });

          this.props.navigation.navigate(
            'DeckView',
            { deck }
          )
        })
    }
  }

  render() {
    const { title } = this.state;
    return (
      <MainKeyboardAvoidingView behavior='padding'>
        <TitleText>Deck Title:</TitleText>
        <DeckTitleInput
          value={title}
          placeholder="deck title"
          onChangeText={this.handleTextChange}
        />
        <TitleButton onPress={() => this.submit(title)} />
      </MainKeyboardAvoidingView>
    )
  }
}

const TitleButton = ({ onPress }) => (
  <TouchableOpacityTitleButton onPress={onPress}>
      <SubmitTitleText>Submit</SubmitTitleText>
  </TouchableOpacityTitleButton>
);

const TouchableOpacityTitleButton = styled.TouchableOpacity`
  background-color: green;
  border-radius: 5;
  padding: 10px;
  width: 100;
`
const SubmitTitleText = styled.Text`
  color: white;
  text-align: center;
`
const MainKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const TitleText = styled.Text`
  font-size: 30;
  margin-bottom: 40;
  text-align: center;
  width: 300;
`

const DeckTitleInput = styled.TextInput`
  width: 300;
  height: 44;
  padding: 8px;
  border-width: 1;
  border-radius: 5;
  margin-bottom: 40;
`
