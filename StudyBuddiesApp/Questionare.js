import React, { Component } from 'react';
import {Platform, StyleSheet, Picker, Button, Text, TextInput, View, TouchableHighlight, Dimensions} from 'react-native';
import DatePicker from 'react-native-datepicker';

class QuestionareScreen extends React.Component {
    constructor(){
        super();
        this.state={
            exam: ' ',
            date: ' '
        }
    }

    componentDidMount() {
        var date = new Date().getDate(); 
        var month = new Date().getMonth() + 1; 
        var year = new Date().getFullYear(); 
        this.setState({   
          date:
            year + '-' + month + '-' + date,
        });
    }

    render() {
        return (
            <View style = {styles.container} >
                <Text style={styles.title}>Questionnaire</Text>
                <Picker selectedValue = {this.state.exam} 
                style={{height: 50, width: 100}} 
                onValueChange = {(itemValue, itemIndex) => this.setState({exam: itemValue})}>
                    <Picker.Item label = "Exam1" value = "exam1" />
                    <Picker.Item label = "Exam2" value = "exam2" />
                    <Picker.Item label = "Exam3" value = "exam3" />
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
                    onDateChange={(date) => {this.setState({date: date})}}/>
                </View>    
                <View style = {styles.button}>
                    <Button style={styles.button} title="Continue" onPress={() => {this.props.navigation.navigate('Home')}}></Button>
                </View>          
            </View>
        );
    }
}

export default QuestionareScreen;

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