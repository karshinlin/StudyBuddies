import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, withNavigation } from 'react-navigation';
import AskScreen from "./Ask.js";
import QuestionnaireScreen from "./Questionnaire.js";
import AnswerScreen from './Answer.js';
import LeaderboardScreen from './Leaderboard';
import HomeScreen from './HomeView.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import SignOutButton from './SignOutButton.js';
import HomeButton from './HomeButton';
import React from 'react';
import Conversation from './src/Conversation.js';
import ChallengeScreen from './Challenge.js';
import QuestionHistoryScreen from './QuestionHistory.js';
import ConfirmationCode from './ConfirmationCode.js';

const SignoutButtonNav = withNavigation(SignOutButton);
const HomeButtonNav = withNavigation(HomeButton);

const AppNavigator = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null
    }
  },
  SignUp: SignUp,
	Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerRight: <SignoutButtonNav />,
      headerLeft: null
    }
  },
  Survey: {
    screen: QuestionnaireScreen,
    navigationOptions: {
      header: null
    }
  },
  Ask: {
    screen: AskScreen,
    navigationOptions: {
      headerRight: <SignoutButtonNav />,
      headerLeft: <HomeButtonNav />
    }
  },
  Answer: {
    screen: AnswerScreen,
    navigationOptions: {
      headerRight: <SignoutButtonNav />,
      headerLeft: <HomeButtonNav />
    }
  },
  Leaderboard: {
    screen: LeaderboardScreen,
    navigationOptions: {
      headerRight: <SignoutButtonNav />,
      headerLeft: <HomeButtonNav />
    }
  },
  Chat: {
    screen: Conversation
  },
  Challenge: {
    screen: ChallengeScreen,
    navigationOptions: {
      headerRight: <SignoutButtonNav />,
      headerLeft: <HomeButtonNav />
    }
  }, 
  QuestionHistory: {
    screen: QuestionHistoryScreen,
    navigationOptions: {
      headerRight: <SignoutButtonNav />,
      headerLeft: <HomeButtonNav />
    }
  },
  ConfirmationCode: {
    screen: ConfirmationCode
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;