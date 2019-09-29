import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, withNavigation } from 'react-navigation';
import AskScreen from "./Ask.js";
import QuestionnaireScreen from "./Questionnaire.js";
import AnswerScreen from './Answer.js';
import HomeScreen from './HomeView.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import SignOutButton from './SignOutButton.js';
import React from 'react';

const SignoutButtonNav = withNavigation(SignOutButton);

const AppNavigator = createStackNavigator({
    SignIn: SignIn,
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
  Ask: AskScreen,
  Answer: {
    screen: AnswerScreen,
    navigationOptions: {
      headerStyle: {
        height: 30
      },
    },
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;