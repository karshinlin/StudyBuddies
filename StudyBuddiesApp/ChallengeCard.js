import React, { Component } from 'react';
import {View, Text, StyleSheet } from 'react-native';


export default class ChallengeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.params = this.props.params;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.accuracy}> 
                    Question # {this.props.questionIndex + 1} of {this.props.numQuestions}
                </Text>
                <Text style={styles.accuracy}> 
                    Accuracy: {this.props.numCorrect} / {this.props.totalAttempts}
                </Text>
                <Text style={styles.questionCard}>{this.props.question}</Text>
                {this.props.showAnswer ? <Text style={styles.answer}>{this.props.answer}</Text> : null}
            </View>)       
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    questionCard: { flex: 4, backgroundColor:'lightgreen', fontSize:30},
    answer: { flex: 2, backgroundColor:'lightblue', fontSize:20},
    accuracy: { flex: 1, fontSize:20}
});