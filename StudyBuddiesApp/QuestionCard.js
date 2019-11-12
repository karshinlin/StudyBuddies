import React, { Component } from 'react';
import {
    View, Button, Platform, TouchableHighlight, Image, TextInput, Text, StyleSheet } from 'react-native';
import { cDarkBlue, cLightBlue, cWhite } from "./App";
import stylesheet from './styles.js';
import { Auth } from 'aws-amplify';
import CustomButton from './CustomButton'

const wrapperWidth = 405;

export default class QuestionCard extends Component {
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
        console.log(this.state.id + " id; answer: " + this.state.answer);
        console.log(JSON.stringify({
            "userId": Auth.user.attributes.sub.toString(),
            "questionId": parseInt(this.state.id),
            "answerText": this.state.answer.toString(),
        }));
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
        .then((response) => response.json())
        .then((response) => {
            this.setState({answer:''});
            console.log(JSON.stringify(response));
            this.props.removeSelfFunction(this.props.id);
        })
        .catch((error) => {
            console.log(error);
        });
	}
    render () {
        let {onPress} = this.props;
        
        return (
            <View key={this.props.id} style={[this.props.style, {borderBottomWidth: 10, borderBottomColor: "transparent", padding: 20, flexWrap: "wrap"}]}>
                <TouchableHighlight style={{}}
                    onPress={onPress}
                    underlayColor={cLightBlue}
                    >
                    <View style={stylesheet.container}>
                        <View style={styles.wrapper}>
                            <View style={styles.infoArea}>
                                <View>
                                    <Text style={styles.hotelName}>{this.props.questionText}</Text>
                                </View>
                            </View> 
                            <View style={styles.textbox}>
								<TextInput style={styles.questionAnswer} placeholder="Type your answer here" 
                                    multiline={true}
                                    numberOfLines={3}
                                    value={this.state.answer}
									onChangeText={(text) => this.setState({answer: text})}>
								</TextInput>
                                <Button 
                                style={styles.submit}
                                onPress={() => this.submitAnswer()}
                                title="Submit"
								/>
                            </View>                       
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        backgroundColor: '#F2F2F2', 
        padding: 30,
        justifyContent: "center",
        borderRadius: 25,
        flex: 1,
        shadowColor: "#c9cdd4",
        shadowRadius: 10,
        shadowOpacity: 1,
        width: "100%",
        ...Platform.select({
            ios: {
              
              
              
            },
            android: {
              
            },
          }),
    },
    infoArea: {
        width: "100%",
        justifyContent: "space-between",
        marginTop: 10,
        padding: 5
    },
    hotelName: {
        fontFamily: "Arial",
        fontSize: 21,
        color: "#363636",
        maxWidth: 230,
        marginTop: 4
    },
    questionAnswer: {
        textAlign: "left",
        fontSize: 16,
        marginTop: -1,
        width: '100%',
        opacity: 0.7,
        marginBottom: 5,
        marginLeft: 5,
    },
    textbox: {
        height: 100, 
        width: 250,
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