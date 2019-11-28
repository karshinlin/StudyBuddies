import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CustomTable from './CustomTable';
import React from 'react';
import clsx from 'clsx';
import { Text } from "react-native";
import { url } from "./global";
import Typography from '@material-ui/core/Typography';
import Title from './Title';




export default class Groups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: {},
            selectedGroup: null
        }

        this.changeSelectedGroup = this.changeSelectedGroup.bind(this);
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
                this.setState({
                    groups: newGroups
                })
            })
    }

    changeSelectedGroup(groupNum) {
        this.setState({
            selectedGroup: groupNum
        })
    }

    getSelectedGroupMetadata(field) {
        return this.state.groups[this.state.selectedGroup][field]
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
                {this.state.selectedGroup == null ? null :
                    <Grid item xs={12}>
                        <Paper className={this.props.classes.paper}>
                            <React.Fragment>
                                <Title>[#{this.state.selectedGroup}] {this.getSelectedGroupMetadata('groupName')}</Title>
                                <Text>Exam: {this.getSelectedGroupMetadata('exam')}</Text>
                            </React.Fragment>
                        </Paper>
                    </Grid>
                }



            </Grid>
        );
    }
}

