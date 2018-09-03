import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { getDecks } from '../utils/api';
import styled from 'styled-components/native'
import { AsyncStorage } from 'react-native'
// import { getMetricMetaInfo, timeToString } from './helpers'

export default class DeckList extends Component {
  state = {
    decks: []
  }

  componentDidMount() {
    this.getDecks();

    this._sub = this.props.navigation.addListener(
      'didFocus',
      this.getDecks
    );
  }

  componentWillUnmount() {
    this._sub.remove();
  }

  getDecks = () => {
    getDecks().then((results) =>
      this.setState({
        decks: results
      })
    )
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacityDeckView onPress={() => this.props.navigation.navigate(
        'DeckView',
        { deck: item }
      )}>
        <DeckTitleText>
          {item.title}
        </DeckTitleText>
        <CardCountText>
          {item.cards.length} {item.cards.length === 1 ? 'Card' : 'Cards'}
        </CardCountText>
      </TouchableOpacityDeckView>
    )
  }

  render() {
    const { decks } = this.state;

    return (
      <View style={decks.length === 0 ? styles.textContainer : null}>
        {decks.length === 0 &&
          <NoDecksText>You have no decks!</NoDecksText>
        }
        {decks.length > 0 &&
          <FlatList data={decks} renderItem={this.renderItem} keyExtractor={(item, index) => index.toString()} />
        }
      </View>
    )
  }
}

const TouchableOpacityDeckView = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding-top: 50;
  padding-bottom: 50;
  border-bottom-width: 1;
`

const DeckTitleText = styled.Text`
  font-size: 30;
  margin-bottom: 10;
`

const CardCountText = styled.Text`
  color: gray;
  font-size: 16;
`

const NoDecksText = styled.Text`
  color: gray;
  font-size: 20;
`

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
