import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Text, StyleSheet, TextInput, Button
} from 'react-native';
import { Divider } from 'react-native-elements';
import stylesheet from './styles.js';
import { Auth } from 'aws-amplify';


export default class AnsweredQuestionCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            answer: ''
        };

        this.submitAnswer = this.submitAnswer.bind(this);
    }

    submitAnswer() {
        if (!this.state.answer) {
            return;
        }
        var url = global.url + "answerQuestion";
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: Auth.user.attributes.sub.toString(),
                questionId: parseInt(this.state.id),
                answerText: this.state.answer.toString(),
            }),
        })
        .then(() => {
            if (this.props.removeSelfFunction) {
                this.props.removeSelfFunction(this.props.id);
            }
            this.setState({answer: ''})
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    nullNameCheck(name) {
        if (name) {
            return name;
        } else {
            return 'Unknown';
        }
    }

    render() {

        return (

            <View style={{ width: "100%" }}>
                <View style={styles.wrapper}>
                    <View style={{ width: '100%' }}>
                        <Text style={styles.question}>
                            {this.props.questionText}
                        </Text>
                        <Text style={styles.author}>
                            {this.nullNameCheck(this.props.groupMembers[this.props.askedBy])} on {this.props.askDate}
                        </Text>
                        <Divider style={{ backgroundColor: 'black' }} />
                        {this.props.answers.map(answer => {
                            return (
                                <View>
                                    <Text style={styles.answer}>
                                        {answer.answerText}
                                    </Text>
                                    <Text style={styles.author}>
                                        {this.nullNameCheck(this.props.groupMembers[answer.answeredBy])} on {answer.answerDate}
                                    </Text>
                                </View>
                            )
                        })}
                        {this.props.answerable ?
                            <View style={styles.textbox}>
                                <TextInput style={styles.questionAnswer} placeholder="Type your answer here"
                                    multiline={true}
                                    numberOfLines={3}
                                    value={this.state.answer}
                                    onChangeText={(text) => this.setState({ answer: text })}>
                                </TextInput>
                                <Button
                                    style={styles.submit}   
                                    onPress={this.submitAnswer}
                                    title="Submit"
                                />
                            </View>

                            : null

                        }
                    </View>
                </View>
                </View>
                )
            }
        }

const styles = StyleSheet.create({
                    wrapper: {
                    flexDirection: "column",
            alignItems: 'center',
            backgroundColor: "#F2F2F2",
            padding: 10,
            borderRadius: 25,
            shadowColor: "#c9cdd4",
            shadowRadius: 10,
            shadowOpacity: 1,
            justifyContent: "center",
        },
    question: {
                    textAlign: "left",
            fontSize: 20,
            width: '100%',
            margin: 4,
            fontWeight: 'bold'
        },
    author: {
                    textAlign: "left",
            fontSize: 11,
            width: '100%',
            opacity: 0.6,
            fontStyle: 'italic',
            margin:2,
            marginLeft: 4
        },
    answer: {
                    textAlign: "left",
            fontSize: 16,
            width: '100%',
            opacity: 0.7,
            margin: 4,
        },

        textbox: {
            height: 100, 
            padding: 5,
            borderRadius: 25,
            backgroundColor: '#F2F2F2', 
            textAlign: 'center',
            flex: 1 
        },
        submit: {
            width: '50%', 
            justifyContent: 'center',
            textAlign: "center",
            borderRadius: 13,
            color: '#275DA7', 
        },
});