import Paper from '@material-ui/core/Paper';
import CustomTable from './CustomTable';
import React from 'react';
import { Text } from "react-native";
import { url } from "./global";
import Title from './Title';
import GroupUser from './GroupUser';

export default class GroupManager extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: null
        }

        this.changeSelectedUser = this.changeSelectedUser.bind(this);
    }

    componentDidMount() {
        this.getUsersInGroup();
    }

    componentDidUpdate(prevProps) {
        if (this.props.group['groupID'] !== prevProps.group['groupID']) {
            this.getUsersInGroup();
        }
    }

    getUsersInGroup() {
        const req_url = url + 'getUsersInGroup?groupId=' + this.props.group['groupID'];
        return fetch(req_url)
            .then(response => response.json())
            .then(response => {
                return response.reduce(function (map, obj) {
                    map[obj['userID']] = obj;
                    return map;
                }, {});
            }).then(users => {
                this.setState({
                    users: users
                });
            });
    }

    changeSelectedUser(userId) {
        this.props.selectUser(this.state.users[userId]);
    }

    render() {
        return (
                <Paper className={this.props.classes.paper}>
                    <React.Fragment>
                        <Title>[#{this.props.group['groupID']}] {this.props.group['groupName']}</Title>
                        <Text>Exam: {this.props.group['exam']}</Text>
                        {
                            this.state.users ?
                                <CustomTable
                                    key={'groupID'}
                                    cols={Object.keys(Object.values(this.state.users)[0])}
                                    data={Object.values(this.state.users).map(user => Object.values(user))}
                                    onClick={this.changeSelectedUser}
                                /> : null
                        }

                    </React.Fragment>
                </Paper>
        )
    }
}