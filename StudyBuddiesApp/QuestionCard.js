import React, { Component } from 'react';
import {
    View, Platform, TouchableHighlight, Image, TextInput, Text, StyleSheet } from 'react-native';
import { cDarkBlue, cLightBlue, cWhite } from "./App";
import { Button } from 'react-native-elements';

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
		console.log(this.state.id + " id; answer: " + this.state.answer);
	}
    render () {
        let {onPress, isRipple, rippleColor, children, style} = this.props;
        
        return (
            <View style={[this.props.style, {borderBottomWidth: 10, borderBottomColor: "#F4F4F4", padding: 20}]}>
                <TouchableHighlight style={{}}
                    onPress={onPress}
                    underlayColor={cLightBlue}
                    >
                    <View style={{width: "100%"}}>
                        <View style={styles.wrapper}>
                            <View style={styles.infoArea}>
                                <View style={styles.name_stars}>
                                    <Text style={styles.hotelName}>{this.props.questionText}</Text>
                                </View>
                            </View> 
                            <View style={{width: '100%', flexDirection: 'column'}}>
								<TextInput style={styles.questionAnswer} placeholder="Can you answer this question?" 
									multiline={true}
									onChangeText={(text) => this.setState({answer: text})}>
								</TextInput>
								<Button onPress={() => this.submitAnswer()} title='Submit Answer'>
								</Button>
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
        backgroundColor: "#42f5bc",
        padding: 30,
        justifyContent: "center",
        ...Platform.select({
            ios: {
              
              
              
            },
            android: {
              
            },
          }),
    },
    heroImg: {
        width: Platform.OS === 'ios' ? '100%' : "100%",
        height: 195,
        borderRadius: 13,
    },
    infoArea: {
        flexDirection: "row",
        width: Platform.OS === 'ios' ? '100%' : wrapperWidth,
        justifyContent: "space-between",
        marginTop: 10,
        padding: 5
    },
    name_stars: {
        flexDirection: "column"
    },
    price_area: {
        flexDirection: "column",
        justifyContent: "center",
        alignSelf: "flex-start",
        marginTop: 5
    },
    hotelName: {
        fontFamily: "Arial",
        fontSize: 21,
        color: "#363636",
        maxWidth: 230,
        marginTop: 4
    },
    hotelStars: {

    },
    price: {
        fontSize: 27,
        fontFamily: "Arial",
        color: "#3EAAFA"
    },
    nightText: {
        alignSelf: "flex-end",
        marginTop: Platform.OS === 'ios' ? -2 : -6,
        fontSize: 13,
        opacity: 0.8
    },
    questionAnswer: {
        textAlign: "left",
        fontSize: 16,
        marginTop: -1,
        width: '100%',
        opacity: 0.7,
        marginBottom: 5,
        marginLeft: 5,
    }
});