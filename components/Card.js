import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import styled from 'styled-components/native'

function ResponseButton ({ correct, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.color, {backgroundColor: correct ? 'green' : 'red'}]}
      onPress={onPress}>
        <WhiteButtonText>{correct ? 'Correct' : 'Incorrect'}</WhiteButtonText>
    </TouchableOpacity>
  )
}

export default class Card extends Component {
  state = {
      answerDisplayed: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.card !== nextProps.card) {
      this.setState({
        answerDisplayed: false
      });
    }
  }

  flipCard = () => {
    this.setState({
      answerDisplayed: !this.state.answerDisplayed
    })
  }

  render() {
    const { card, onSelect } = this.props;
    const { answerDisplayed } = this.state;

    return (
      <MainContainer>
        <QuestionView>
          <AnswerText>{answerDisplayed ? card.answer : card.question }</AnswerText>
          <TouchableOpacity onPress={() => this.flipCard() }>
            <AnswerButtonText>{answerDisplayed ? 'Question' : 'Answer' }</AnswerButtonText>
          </TouchableOpacity>
        </QuestionView>
        <ResponseButton correct={true} onPress={() =>
          onSelect(true)
        } />
        <ResponseButton correct={false} onPress={() =>
          onSelect(false)
        } />
      </MainContainer>
    )
  }
}

const MainContainer = styled.View`
  align-items: center;
  justify-content: center;
`

const QuestionView = styled.View`
  align-items: center;
  padding-top: 50;
  padding-bottom: 150;
`

const AnswerText = styled.Text`
  font-size: 30;
  margin-bottom: 10;
  text-align: center;
  width: 300;
`

const AnswerButtonText = styled.Text`
  color: red;
  font-weight: bold;
  font-size: 16;
`

const WhiteButtonText = styled.Text`
  color: white;
`

const styles = StyleSheet.create({
  color: {
    borderRadius: 5,
    padding: 10,
    width: 150,
    marginBottom: 10,
    alignItems: 'center'
  }
})
