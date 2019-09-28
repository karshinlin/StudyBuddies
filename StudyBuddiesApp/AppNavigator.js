import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import AskScreen from "./Ask.js";
import QuestionnaireScreen from "./Questionnaire.js";
import AnswerScreen from './Answer.js';
import HomeScreen from './HomeView.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';

const AppNavigator = createStackNavigator({
    SignIn: SignIn,
    SignUp: SignUp,
	Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
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
        height: 20,
      },
    },
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;