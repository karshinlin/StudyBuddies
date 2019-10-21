import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, Button, Alert, View, ActivityIndicator} from 'react-native';
import { Auth } from 'aws-amplify';
import ChallengeCard from './ChallengeCard';

export default class ChallengeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          questions:null,
          answers: null,
          questionIds: null,
          numCorrect: null,
          totalAttempts: null,
          counter: 0,
          showAnswer: false,
          userAnswer: ""
        };
        this.params = this.props.params;
        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this);
        this.resetStates = this.resetStates.bind(this);
    }

    async fetchQuestions() {
      var url = global.url + "getChallengeQuestions?userId=" + Auth.user.attributes.sub;
      console.log("url:" + url)
      let response = await fetch(url)
          .then(response => response.json())
          .then(response => {
              this.setState({
                questions: Object.values(response.question),
                answers: Object.values(response.answer),
                questionIds: Object.values(response.questionId).map(s => parseInt(s)),
                numCorrect: Object.values(response.numCorrect).map(s => parseInt(s)),
                totalAttempts: Object.values(response.totalAttempts).map(s => parseInt(s))
              })
          })
          .catch(error => {
            console.log(error);
          });
      return response;
    }

    async markChallengeResult(isCorrect, questionId) {
      var url = global.url + "answerChallenge";
      return fetch(url, {
        method: 'POST',
        headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
        body: JSON.stringify({
          userId: Auth.user.attributes.sub,
          questionId,
          isCorrect
        }),		
      })
      .then((response) => response.json())
      .then(response => console.log(response))
      .then(() => {
        this.setState(prevState => {
          const numCorrect = prevState.numCorrect.slice();
          if (isCorrect) {
            numCorrect[prevState.counter] = numCorrect[prevState.counter] + 1;
          }
          const numAttempts = prevState.totalAttempts.slice();
          numAttempts[prevState.counter] = numAttempts[prevState.counter] + 1;
          return {
            numCorrect: numCorrect,
            totalAttempts: numAttempts
          }
        })
      })
    }

    resetStates() {
      this.setState({
          showAnswer: false,
          userAnswer: ""
      })
    }

    decrementCounter() {
      this.setState(prevState => {
        const oldCounter = prevState.counter;
        const len = prevState.questions.length;
        return {counter: (oldCounter == 0 ? len - 1 : (oldCounter - 1))};
      });
    }

    incrementCounter() {
      this.setState(prevState => {
        const oldCounter = prevState.counter;
        const len = prevState.questions.length;
        return {counter: (oldCounter + 1) % len};
      });
    }

    componentDidMount() {
      this.fetchQuestions();
    }

    render() {
      return (<View style={styles.container}> 
        {this.state.questions ? 
          <View style={styles.container}>
            <Text style={styles.title}>Challenge</Text>
            <ChallengeCard 
              style={{
                flex:3,
                alignItems: 'stretch'}}
              question={this.state.questions[this.state.counter]} 
              answer={this.state.answers[this.state.counter]}
              numCorrect={this.state.numCorrect[this.state.counter]}
              totalAttempts={this.state.totalAttempts[this.state.counter]}
              showAnswer={this.state.showAnswer}
              questionIndex={this.state.counter}
              numQuestions={this.state.questions.length}
            />
            <TextInput
                    style={styles.userAnswer}
                    multiline = {true}
                    placeholder="Answer the question here!"
                    value={this.state.userAnswer}
                    onChangeText={text => this.setState({userAnswer: text})}
                />
            {this.state.showAnswer ? 
            <View>
              <Button
                style={styles.content}
                onPress={() => {
                  this.markChallengeResult(true, this.state.questionIds[this.state.counter])
                  .then(() => {
                    this.incrementCounter();
                    this.resetStates();
                  });
                }}
                title="I got it right!"
              />
              <Button
              style={styles.content}
              onPress={() => this.markChallengeResult(false, this.state.questionIds[this.state.counter])}
              title="I missed it this time."
            />
            </View>
            :
              <Button
                  style={styles.content}
                  onPress={() => this.setState({showAnswer: true})}
                  title="Check"
              />
              }
            <Button
                style={styles.content}
                onPress={() => {
                    this.resetStates();
                    this.incrementCounter();
                }}
                title="Next"
            />
            <Button
                style={styles.content}
                onPress={() => {
                    this.resetStates();
                    this.decrementCounter();
                }}
                title="Previous"
            />
          </View>
        :
        <View style={{ flex: 1, paddingTop: 25 }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
      }
      </View>);
    }
}

const styles = StyleSheet.create({
    title: {
      flex: 0.25,
      justifyContent: 'center',
      fontSize: 40,
      margin: 10
    },
    container: {
      flex: 1,
      alignItems: 'stretch'
    },
    content: {
        flex:1,
        alignItems: 'stretch'
    },
    userAnswer: { flex: 0.75, backgroundColor:'lightgray', fontSize:20}
  });

