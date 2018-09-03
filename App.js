import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, HeaderBackButton } from 'react-navigation';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Card from './components/Card'
import NewQuestion from './components/NewQuestion'
import DeckView from './components/DeckView'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import QuizView from './components/QuizView'
import { setLocalNotification } from './utils/helpers'
import styled from 'styled-components/native'

const TabNav = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      title: 'Home',
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-playing-outline' size={25} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'New Deck',
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={25} color={tintColor} />
    },
  },
});

const MainNavigation = createStackNavigator({
  Home: {
    screen: TabNav
  },
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      title: 'Deck List'
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: ({navigation}) => ({
      title: '',
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Home')} />
    })
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      title: 'Add Card'
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      title: 'Quiz'
    }
  }
})


export default class App extends React.Component {
  componentDidMount() {
      setLocalNotification();
  }

  render() {
    return (
      <MainContainer>
        <MainNavigation />
      </MainContainer>
    );
  }
}

const MainContainer = styled.View`
  flex: 1;
  background-color: white;
`
