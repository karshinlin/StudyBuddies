import React, { Component } from 'react';
import { TouchableHighlight, Text, View } from 'react-native';

class CustomButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight
                style={{
                    backgroundColor: this.props.color,
                    borderColor: this.props.borderColor,
                    borderRadius: 2,
                    borderWidth: 0.5,
                    padding: 5,
                    margin: 5,
                }}
                onPress={this.props.onPress}
            >
                <View>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        textAlign: "center"
                    }}>
                        {this.props.text}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}

export default CustomButton;