import React, { Component } from 'react';
import {Platform, StyleSheet, Picker, Button, Text, TextInput, View, TouchableHighlight, Dimensions} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Auth } from 'aws-amplify';

class QuestionnaireScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            exam: ' ',
            date: new Date(),
            exams: []
        }
    }

    async fetchExams() {
        var url = global.url + "get_all_exams";
        console.log("url:" + url);
        let response = await fetch(url)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                let exams = Object.values(response);
                this.setState({
                    exams: exams,
                    exam: exams[0]
                })
            .catch(error => console.log(error))
        })
        return response;
    }

    getFillSurveyUrl(userId, exam, month, year) {
        return global.url + "fillSurvey?userId=" + userId + "&month=" + month
            + "&year=" + year + "&exam=" + exam;
    }

    fillSurvey() {
        console.log(this.state);
        let date = new Date(this.state.date)
        console.log(date)
        let month = date.getMonth()
        let year = date.getFullYear()
        let url = this.getFillSurveyUrl(Auth.user.attributes.sub, this.state.exam, month, year)
        console.log(url)
        return fetch(url, {method: 'POST'});
    }

    componentDidMount() {
        this.setState({
          date:new Date()
        });
        this.fetchExams();
    }

    render() {
        return (
            <View style = {styles.container} >
                <Text style={styles.title}>Questionnaire</Text>
                <Picker selectedValue = {this.state.exam} 
                style={{height: 50, width: 100}} 
                onValueChange = {itemValue => this.setState({exam: itemValue})}>
                {this.state.exams.map(
                    item => {return (<Picker.Item label={item} value={item} key={item}/>)})}
                </Picker>
                <View style = {styles.dateContainer}>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate= {this.state.date}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={date => {this.setState({date: date})}}/>
                </View>    
                <View style = {styles.button}>
                    <Button style={styles.button} title="Continue" onPress={() => {
                        this.fillSurvey();
                        this.props.navigation.navigate('Home');
                        }}></Button>
                </View>          
            </View>
        );
    }
}

export default QuestionnaireScreen;

const styles = StyleSheet.create({
    title: {
      flex: 0.15, 
      justifyContent: 'center',
      fontSize: 40,
      margin: 10
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#F5FCFF',
    },
    button: {
        position: 'absolute',
        bottom: 100
    },
    dateContainer: {
        position: "absolute",
        alignContent: "space-around",
        marginTop: 50,
        top: 300
    }
  });