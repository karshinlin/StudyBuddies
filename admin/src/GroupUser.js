import React from 'react';
import { url } from "./global";
import Title from './Title';
import { Button, ButtonGroup, Select, MenuItem, Grid, Paper, Divider } from '@material-ui/core';
import Text from './Text';

export default class GroupUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedNewGroup: 'ungrouped'
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleOnSubmit() {
        let body = {};
        let req_url = '';
        if (this.state.selectedNewGroup == 'ungrouped') {
            req_url = url + 'ungroupUser';
            body = {userId: this.props.user['userID']}
        } else {
            req_url = url + 'moveUser';
            body = {
                userId: this.props.user['userID'],
                destGroupId: this.state.selectedNewGroup,
            }
        }
        console.log(body);
        fetch(req_url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)		
        })
        .then(() => this.props.onUpdate())
    }

    handleChange(event) {
        this.setState({selectedNewGroup: event.target.value});
    };

    render() {
        return (
            <Paper className={this.props.classes.paper}>
                            <React.Fragment>
                                <Title>{this.props.user['name']}</Title>
                                <Text>Exam: {this.props.exam}</Text>
                                <Text>Date: {this.props.user['examMonth']}/{this.props.user['examYear']}</Text>
                                <Grid container alignContent={'flex-start'}>
                                    <Button color="primary" fullWidth={false}>Manage User Profile</Button>
                                </Grid>
                                <Divider />
                                <Grid container>
                                    <Grid item xs>
                                    <Text>Move To: </Text>
                                    </Grid>
                                    <Grid item xs align-items-xs-center justify-xs-flex-end>
                                        <Select
                                            value={this.state.selectedNewGroup}
                                            onChange={this.handleChange}>
                                        <MenuItem value={'ungrouped'}>Ungrouped</MenuItem>
                                    {this.props.potentialGroups ? 
                                        this.props.potentialGroups.map(group => {
                                            return (
                                                <MenuItem value={group['groupID']}>
                                                    [{group['groupID']}] {group['groupName']}
                                                </MenuItem>);
                                        })
                                        : null}
                                </Select>
                                    </Grid>
                                    <Grid item xs>
                                        <Button color="primary" onClick={this.handleOnSubmit}>Submit Move</Button>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        </Paper>
        )
    }
}