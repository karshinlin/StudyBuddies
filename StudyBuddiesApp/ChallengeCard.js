import React, { Component } from 'react';
import {
    View, TouchableHighlight, TextInput, Text, StyleSheet
} from 'react-native';
import { cLightBlue } from "./App";

export default class ChallengeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.params = this.props.params;
    }

    render() {
        return (
            <View>
                <TouchableHighlight style={{}} underlayColor={cLightBlue}>
                    <View style={styles.wrapper}>
                        <Text>Question: {this.props.questionIndex + 1} of {this.props.numQuestions}</Text>
                        <Text>Accuracy: {this.props.numCorrect} / {this.props.totalAttempts}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={{}} underlayColor={cLightBlue}>
                    <View style={{ width: "100%" }}>
                        <View style={styles.wrapper}>

                            <View style={styles.content}>
                                <Text style={styles.hotelName}>{this.props.question}</Text>
                            </View>
                            {this.props.showAnswer ?
                                <View style={styles.content}>
                                    <Text style={styles.questionAnswer}>
                                        {this.props.answer} 
                                    </Text>
                                </View>
                            : null}
                            <View style={styles.content}>
                                <TextInput style={styles.questionAnswer} placeholder="Can you answer this question?"
                                    multiline={true}
                                    value={this.state.answer}
                                    onChangeText={(text) => this.setState({ answer: text })}>
                                </TextInput>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    content: { 
        width: '100%', 
        flexDirection: 'column', 
        justifyContent: "center",
    },
    wrapper: {
        flexDirection: "column",
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        padding: 15,
        margin: 15,
        justifyContent: "center",
        borderRadius: 25,
        shadowColor: "#c9cdd4",
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    hotelName: {
        fontFamily: "Arial",
        fontSize: 21,
        color: "#363636",
        marginVertical: 4,
        textAlign: "center"
    },
    questionAnswer: {
        textAlign: "center",
        fontSize: 14,
        marginVertical: 4, 
        textAlign: "center"
    },
    submit: {
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: "center",
        borderRadius: 13,
        color: '#275DA7',
    }
});