import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CustomTable from './CustomTable';
import { url } from "./global";
import React from 'react';
import { Text } from "react-native";



export default class Members extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null,
            selectedUserId: null,
        }
        // this.changeSelectedUser = this.changeSelectedGroup.bind(this);
        // this.deleteUser = this.deleteUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        return fetch(url + 'getAllMembers')
            .then(response => response.json())
            .then(users => {
                this.setState({
                    users: users
                })
            })
    }

    // changeSelectedUser(userId) {
    //     if (this.state.selectedUser != userId) {
    //         this.setState({
    //             selectedUser: userId
    //         })
    //     }
    // }

    // deleteUser(userId) {
    //     let deleteUrl = url + 'deleteUser?userId=' + userId 
    //     return fetch(deleteUrl)
    //         .then(response => response.json())
    //         .then(response => {
    //             console.log(response);
    //             delete this.state.users[userId]
    //             this.setState({
    //                 selectedUserId: null,
    //             });
    //         });
    // }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={this.props.classes.paper}>
                            {
                                !this.state.users ?
                                    <Text>No users currently in the system.</Text> :
                                    <CustomTable
                                        cols={['userId', 'name']}
                                        data={Object.keys(this.state.users).map(userId => [userId, this.state.users[userId]])}
                                        onClick={this.changeSelectedUser}
                                        title={'Users'}
                                    />
                            }
                        </Paper>
                </Grid>
            </Grid>
        );
    }
}

