import React, { Component } from 'react';
import {StyleSheet, Picker, Button, Text, View, ActivityIndicator} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Auth } from 'aws-amplify';

class QuestionnaireScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            exam: ' ',
            date: new Date(),
            exams: [],
            isLoading: true
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

    fetchSurveyStatus() {        
        var url = global.url + "surveyStatus?userId=" + Auth.user.attributes.sub;
        console.log("url:" + url);
        return fetch(url)
            .then((response) => response.json())
            .then((response) => {
                if (response['surveyStatus'] === "True") {
                    this.props.navigation.navigate("Home");
                } else {
                    this.setState({isLoading: false});
                }})
            .catch((error) => {
                this.setState({isLoading: false});
            });
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
        this.fetchSurveyStatus();
        this.fetchExams();
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
            <View style = {styles.container} >
                <Text style={styles.title}>Questionnaire</Text>
                    <Picker 
                        selectedValue = {this.state.exam} 
                        onValueChange = {itemValue => this.setState({exam: itemValue})}
                        style={{height: 100, width: 300}}>
                        {this.state.exams.map(
                            item => {return (<Picker.Item label={item} value={item} key={item}/>)})}
                    </Picker>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate= {this.state.date}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={date => {this.setState({date: date})}}/> 
                <Button title="Continue" onPress={() => {
                    this.fillSurvey();
                    this.props.navigation.navigate('Home');
                    }}/>
                    <SignOutButton navigation={this.props.navigation}/>
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
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: '#F5FCFF',
    }
  });