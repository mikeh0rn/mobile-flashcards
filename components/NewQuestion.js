import React, { Component } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { addCardToDeck } from '../utils/api';
import styled from 'styled-components/native'


export default class NewQuestion extends Component {
  state = {
    question: '',
    answer: ''
  }

  submit(question, answer) {
    const deck = this.props.navigation.state.params.deck;

    const card = {
      question,
      answer
    }

    if (question && answer) {
      addCardToDeck(deck.id, card).then(() => {
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();
      })
    }
  }

  render() {
    const { question, answer } = this.state;

    return (
      <KAView behavior='padding'>
        <InputView value={question} onChangeText={(input) =>
            this.setState({
              question: input
            })
          }
          placeholder="question"
        />
        <InputView value={answer} onChangeText={(input) =>
            this.setState({
              answer: input
            })
          }
          placeholder="answer"
        />
        <QuestionButton onPress={() => this.submit(question, answer)} />
      </KAView>
    )
  }
}

const QuestionButton = ({ onPress }) => (
  <TouchableOpacityQuestionButton onPress={onPress}>
      <SubmitTitleText>Submit</SubmitTitleText>
  </TouchableOpacityQuestionButton>
);

const SubmitTitleText = styled.Text`
  color: white;
  text-align: center;
`

const TouchableOpacityQuestionButton = styled.TouchableOpacity`
  background-color: green;
  border-radius: 5;
  padding: 10px;
  width: 100;
`

const KAView = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const InputView = styled.TextInput`
  width: 300;
  height: 44;
  padding: 8px;
  border-width: 1;
  border-radius: 5;
  margin-bottom: 40;
`
