import Paper from '@material-ui/core/Paper';
import CustomTable from './CustomTable';
import React from 'react';
import { Text } from "react-native";
import { url } from "./global";
import Title from './Title';

export default class GroupUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }

    }

    render() {
        return (
            <Paper className={this.props.classes.paper}>
                            <React.Fragment>
                                <Title>{this.props.user['name']}</Title>
                                <Text>Exam: {this.props.exam}</Text>
                                <Text>Date: {this.props.user['examMonth']}/{this.props.user['examYear']}</Text>
                            </React.Fragment>
                        </Paper>
        )
    }
}