import React, { Component } from 'react';
import {Platform, StyleSheet, Text, TextInput, View, TouchableHighlight, Dimensions} from 'react-native';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { createAppContainer, NavigationActions, withNavigation } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

class QuestionareScreen extends React.Component {
    render() {
        return (
            <View style = {styles.container} >
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        Button Dropdown
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                <Text style={styles.title}>Questionare</Text>
                <TextInput
                style={styles.textbox}
                multiline = {false}
                numberOfLines = {1}
                placeholder="  /  /    "
                onChangeText={(text) => this.setState({text})}
                />
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
    textbox: {
        height: 50, 
        width: '50%',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5
      }
  });