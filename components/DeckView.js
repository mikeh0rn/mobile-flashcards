import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { getDeck, getDecks } from '../utils/api';
import styled from 'styled-components/native'


function GenerateButton ({ text, onPress }) {
  return (
    <TouchableOpacityButton onPress={onPress}>
        <Text>{text}</Text>
    </TouchableOpacityButton>
  )
}

export default class Deck extends Component {
  state = {
    deck: null
  }

  onGoBack = () => {
    const deck = this.props.navigation.state.params.deck;

    getDeck(deck.id).then((result) =>
      this.setState({
        deck: result
      })
    )
  }

  render() {
    const deck = this.state.deck || this.props.navigation.state.params.deck;

    return (
      <MainContainer>
        <DeckView>
          <DeckTitleText>{deck.title}</DeckTitleText>
          <CardCountText>{deck.cards.length} cards</CardCountText>
        </DeckView>
        <GenerateButton text='Add New Card' onPress={() => this.props.navigation.navigate(
          'NewQuestion',
          {
            deck,
            onGoBack: this.onGoBack
           }
        )} />
        {deck.cards.length > 0 &&
          <GenerateButton text='Begin Quiz' onPress={() => this.props.navigation.navigate(
            'QuizView',
            { deck }
          )} />
        }
      </MainContainer>
    )
  }
}

const MainContainer = styled.View`
  align-items: center;
  justify-content: center;
`

const DeckView = styled.View`
  align-items: center;
  padding-top: 50;
  padding-bottom: 150;
`

const DeckTitleText = styled.Text`
  font-size: 30;
  margin-bottom: 10;
`
const CardCountText = styled.Text`
  color: gray;
  font-size: 16;
`

const TouchableOpacityButton = styled.TouchableOpacity`
  border-radius: 5;
  padding: 10px;
  padding-right: 40;
  padding-left: 40;
  background-color: white;
  border-width: 1;
  margin-bottom: 10;
`
