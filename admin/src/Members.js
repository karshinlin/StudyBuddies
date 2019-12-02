import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CustomTable from './CustomTable';
import { url } from "./global";
import React from 'react';

export default class Members extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: {},
            selectedUserId: null,
        }
        this.changeSelectedUser = this.changeSelectedGroup.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        this.getAllUsers();
        const req_url = url + 'getAllMembers';
        return fetch(req_url)
            .then(response => response.json())
            .then(users => {
                const newUsers = users.reduce(function (map, obj) {
                    map[obj['userId']] = obj;
                    return map;
                }, {});

                let newSelectedUser= null;
                if (this.state.selectedUserId in newUsers) {
                    newSelectedUser = this.state.selectedUserId;
                }
                return this.setState({
                    users: newSelectedUser,
                    selectedUserId: null,
                })
            })
    }

    changeSelectedUser(userId) {
        if (this.state.selectedUser !== userId) {
            this.setState({
                selectedUser: userId
            })
        }
    }

    deleteUser(userId) {
        let deleteUrl = url + 'deleteUser?userId=' + userId 
        return fetch(deleteUrl)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                delete this.state.users[userId]
                this.setState({
                    selectedUserId: null,
                });
            });
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={this.props.classes.paper}>
                        {
                            <CustomTable>
                                cols={Object.keys(Object.values(this.state.users)[0])}
                                data={Object.values(this.state.users).map(group => Object.values(user))}
                                onClick={this.changeSelectedUser}
                                title={'Users'}
                            </CustomTable>
                        }
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

