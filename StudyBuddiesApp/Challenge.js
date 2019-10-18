import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, Button, Alert, View, ActivityIndicator} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Auth } from 'aws-amplify';
import ChallengeCard from './ChallengeCard';

class ChallengeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            questions: [],
            counter: 0,
            questionState: true,
            answerState: false  
        };
        this.params = this.props.params;
    }

    async fetchQuestions() {
      this.setState({refreshing: true})
      var url = global.url + "getChallengeQuestions?userId=" + Auth.user.attributes.sub;
      console.log("url:" + url)
      let response = await fetch(url)
          .then(response => response.json())
          .then(response=> {
              const questionList = response.questions;
              this.setState({
                  questions: questionList,
                  isLoading: false
              })
          })
          .catch((error) => {
            this.setState({
              isLoading: true,
            })
          });
      return response;
    }


    resetStates() {
      this.setState({
          questionState: true,
          answerState: false
      })
    }

    decrementCounter() {
      if(this.state.counter > 0) {
          this.setState({counter: this.state.counter - 1})
      } 
    }

    incrementCounter() {
      if(this.state.counter < this.state.questions.length - 1){
          this.setState({counter: this.state.counter + 1})
      } else {
          Alert.alert('There are no more Questions');
      }
    }

    componentDidMount() {
      this.fetchQuestions();
    }

    render() {
      if (this.state.isLoading) {
        return (
          <View style={{ flex: 1, paddingTop: 25 }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Challenge</Text>
                <ChallengeCard currQuestion={this.state.questions[this.state.counter].question} 
                               currAnswer={this.state.questions[this.state.counter].answer}
                               questionState={this.state.questionState}
                               answerState={this.state.answerState}  
                />
                <Button
                    style={styles.buttoncontainer}
                    onPress={() => {
                        this.setState({questionState: false})
                        this.setState({answerState: true})
                    }}
                    title="Check"
                />
                <Button
                    style={styles.buttoncontainer}
                    onPress={() => {
                        this.resetStates();
                        this.incrementCounter();
                    }}
                    title="Next"
			          />
                <Button
                    style={styles.buttoncontainer}
                    onPress={() => {
                        this.resetStates();
                        this.decrementCounter();
                    }}
                    title="Before"
			          />
            </View>
        )
    }
}

export default ChallengeScreen;


const styles = StyleSheet.create({
    title: {
      flex: 0.15,
      justifyContent: 'center',
      fontSize: 40,
      margin: 10
    },
    normal: {
      flex: 0.1,
      fontSize: 30,
      margin: 10,
      alignItems: 'center'
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#F5FCFF',
    },
    textbox: {
      height: 200, 
      width: '90%',
      borderWidth: 1,
      padding: 5
    },
    buttoncontainer: {
      color: "white",
      padding: 15,
      width: '30%',
      alignItems: 'center',
      fontSize: 15
    }
  });

