import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Image, TextInput, Text, StyleSheet } from 'react-native';
import { cDarkBlue, cLightBlue, cWhite } from "./App";
import { Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

//const wrapperWidth = 405;

export default class ChallengeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAnswer: "",
        };
        this.params = this.props.params;
    }

    render() {
        //let {onPress, isRipple, rippleColor, children, style} = this.props;
        if(this.props.questionState == true && this.props.answerState == false) {
            return (
                <View style={styles.container}>
                    <Text style={styles.normal}>Question</Text>
                    <Text style={styles.questionbox}>{this.props.currQuestion}</Text>
                    <Text style={styles.score}>Score: 3</Text>
                    <TextInput
                        style={styles.useranswerbox}
                        multiline = {true}
                        numberOfLines = {3}
                        placeholder="Answer the question here!"
                        onChangeText={(text) => this.setState({userAnswer : text})}
                    />
                </View>
            )       
        }
        if(this.props.answerState == true && this.props.questionState == false) {
            return (
                <View style={styles.container}>
                    <Text style={styles.normal}>Question</Text>
                    <Text style={styles.questionbox}>{this.props.currQuestion}</Text>
                    <Text style={styles.score}>Score: 3</Text>
                    <Text style = {styles.answerbox}>{this.state.userAnswer}</Text>
                    <Text style = {styles.answerbox}>{this.props.currAnswer}</Text>
                </View>
            ) 
        } else {
            return (
                console.log("Cannot have both answer and question state to be true")
            )
        }
    }
}

const styles = StyleSheet.create({
    // wrapper: {
    //     flexDirection: "column", 
    //     alignItems: 'center',
    //     backgroundColor: "#42f5bc",
    //     padding: 30,
    //     justifyContent: "center",
    // },
    normal: {
        flex: 0.15,
        justifyContent: 'center',
        fontSize: 20,
        margin: 10
      },
      questionbox: {
        width: '90%',
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#90ee90",
        justifyContent: 'flex-start'
      },
      score: {
        flex: 0.1,
        fontSize: 17,
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      answerbox: {
        width: '90%',
        borderWidth: 1,
        padding: 5,
        justifyContent: 'space-between'
      },
      useranswerbox: {
          height: 200,
          width: '90%',
          borderWidth: 1,
          padding: 5,
          alignItems: 'center',
          justifyContent: 'space-between'
      }
});