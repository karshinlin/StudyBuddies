import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CustomTable from './CustomTable';
import React from 'react';
import { Text } from "react-native";
import { url } from "./global";
import GroupManager from './GroupManager';
import GroupUser from './GroupUser';


export default class Groups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: {},
            selectedGroupId: null,
            selectedUser: null,
            groupManagerUpdateSwitch: false
        }

        this.changeSelectedGroup = this.changeSelectedGroup.bind(this);
        this.changeSelectedUser = this.changeSelectedUser.bind(this);
        this.getGroupData = this.getGroupData.bind(this);
    }

    componentDidMount() {
        this.getGroupData();
    }

    getGroupData() {
        return fetch(url + 'getGroupData')
            .then(response => response.json())
            .then(groups => {
                const newGroups = groups.reduce(function (map, obj) {
                    map[obj['groupID']] = obj;
                    return map;
                }, {});

                let newSelectedGroup = null;
                if (this.state.selectedGroupId in newGroups) {
                    newSelectedGroup = this.state.selectedGroupId;
                }
                return this.setState({
                    groups: newGroups,
                    selectedUser: null,
                    selectedGroupId: newSelectedGroup,
                    groupManagerUpdateSwitch: !this.state.groupManagerUpdateSwitch
                })
            })
    }

    changeSelectedGroup(groupNum) {
        if (this.state.selectedGroupId != groupNum) {
            this.setState({
                selectedGroupId: groupNum,
                selectedUser: null
            })
        }
    }

    changeSelectedUser(userObj) {
        this.setState({
            selectedUser: userObj
        })
    }

    getSelectedGroupMetadata(field) {
        return this.state.groups[this.state.selectedGroupId][field]
    }

    getExamOfSelectedGroup() {
        return this.state.groups[this.state.selectedGroupId]['exam'];
    }

    render() {
        return (
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Paper className={this.props.classes.paper}>
                        {
                            Object.keys(this.state.groups).length === 0 ?
                                <Text>No groups currently in the system.</Text> :
                                <CustomTable
                                    cols={Object.keys(Object.values(this.state.groups)[0])}
                                    data={Object.values(this.state.groups).map(group => Object.values(group))}
                                    onClick={this.changeSelectedGroup}
                                    title={'Groups'}
                                />
                        }
                    </Paper>
                </Grid>
                {this.state.selectedGroupId ?
                    <Grid item xs={12}>
                        <GroupManager 
                            group={this.state.groups[this.state.selectedGroupId]}
                            classes={this.props.classes}
                            selectUser={this.changeSelectedUser}
                            updateSwitch={this.state.groupManagerUpdateSwitch}
                        />
                    </Grid>
                    : null
                }
                {this.state.selectedUser ?
                    <Grid item xs={12}>
                        <GroupUser 
                            classes={this.props.classes} 
                            user={this.state.selectedUser} 
                            exam={this.getExamOfSelectedGroup()}
                            potentialGroups={
                                Object.values(this.state.groups)
                                .filter(group => {
                                    return group['exam'] === this.getExamOfSelectedGroup()
                                        && group['groupID'] != this.state.selectedUser['groupID'];
                                })}
                            onUpdate={this.getGroupData}
                        />
                    </Grid>
                    : null
                }
            </Grid>
        );
    }
}

