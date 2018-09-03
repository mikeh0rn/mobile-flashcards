import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Card from './Card'
import { clearLocalNotification, setLocalNotification } from './../utils/helpers';
import { AsyncStorage } from 'react-native'
import styled from 'styled-components/native'
// import { getMetricMetaInfo, timeToString } from './helpers'

export default class QuizView extends Component {
  state = {
    cards: [],
    index: 0,
    score: 0,
    questionsCompleted: 0
  }

  componentDidMount() {
    const deck = this.props.navigation.state.params.deck;

    this.setState({
      deck: deck,
      cards: deck.cards,
      score: 0,
      index: 0
    });

    clearLocalNotification()
      .then(setLocalNotification);
  }

  onSelect = (correct) => {
    this.setState({
      index: this.state.index + 1,
      score: correct ? this.state.score + 1 : this.state.score
    });
  }

  restart = () => {
    this.setState({
      index: 0,
      score: 0,
      questionsCompleted: 0
    });
  }

  render() {
    const { deck, cards, index, score } = this.state;
    const displayScore = index === cards.length;
    const displayCard = cards && cards.length && !displayScore;

    return (
      <MainContainer>
        {!!displayCard &&
          <View>
            <ProgressText>
              {index + 1} / {cards.length}
            </ProgressText>
            <Card card={cards[index]} onSelect={this.onSelect} />
          </View>}
        {!!displayScore &&
          <ScoreView>
            <ScoreNumOutOfTotalView>
              <ScoreNumOutOfTotalText>Score: {score}/{cards.length}</ScoreNumOutOfTotalText>
            </ScoreNumOutOfTotalView>
            <TouchableOpacity onPress={() => this.restart()}>
              <BlueBoldText>Restart Quiz</BlueBoldText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.goBack() }>
              <BlueBoldText>Go Back to Deck</BlueBoldText>
            </TouchableOpacity>
          </ScoreView>}
      </MainContainer>
    )
  }
}


const MainContainer = styled.View`
  flex: 1;
`

const ProgressText = styled.Text`
  font-size: 16;
  padding: 15px;
`

const ScoreView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const ScoreNumOutOfTotalView = styled.View`
  margin-bottom: 20;
`

const ScoreNumOutOfTotalText = styled.Text`
  font-size: 30;
`

const BlueBoldText = styled.Text`
  margin-bottom: 15;
  color: blue;
  font-weight: bold;
  font-size: 16;
`
