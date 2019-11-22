import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import {  cLightBlue } from "./App";
import stylesheet from './styles.js';

export default class AnsweredQuestionCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
			answer: ''
		};
    }
    
    render () {
        let {onPress} = this.props;
        
        return (
            <View style={[this.props.style, {borderBottomWidth: 10, borderBottomColor: "white", padding: 20}]}>
                <TouchableHighlight style={{}}
                    onPress={onPress}
                    underlayColor={cLightBlue}
                    >
                    <View style={{width: "100%"}}>
                        <View style={styles.wrapper}>
                            <View style={{width: '100%'}}>
                                <Text style={styles.question}>
                                    {this.props.questionText}
                                </Text>
                                <Text style={styles.author}>
                                    {this.props.groupMembers[this.props.askedBy]} on {this.props.askDate}
                                </Text>
                                <Divider style={{ backgroundColor: 'black' }} />
                                {this.props.answers.map(answer => {
                                    return (
                                        <View>
                                            <Text style={styles.answer}>
                                                {answer.answerText}
                                            </Text>
                                            <Text style={styles.author}>
                                                {this.props.groupMembers[answer.answeredBy]} on {answer.answerDate}
                                            </Text>
                                        </View>
                                    )
                                })}
                                
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
    }
});