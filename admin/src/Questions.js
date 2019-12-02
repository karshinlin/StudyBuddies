//import Grid from '@material-ui/core/Grid';
import React from 'react';
import MaterialTable from 'material-table';
import { url } from "./global";
import { forwardRef } from 'react';


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      };

export default class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionColumns: [
                { title: 'QuestionID', field: 'questionId', editable: 'never', type: 'numeric'},
                { title: 'Question', field: 'questionText', editable: 'onUpdate' },
                { title: 'Author', field: 'author', editable: 'never' },
                { title: 'Asked Date', field: 'askedDate', editable: 'never' },
            ],
            answerColumns: [
                { title: 'AnswerID', field: 'answerId', editable: 'never', type: 'numeric'},
                { title: 'Answer', field: 'answerText', editable: 'onUpdate' },
                { title: 'Author', field: 'author', editable: 'never' },
                { title: 'Answer Date', field: 'answerDate', editable: 'never' },
            ],
            selectedQuestion: null,
            members: {},
        }
        this.getAllQuestions = this.getAllQuestions.bind(this);
        this.editQuestion = this.editQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.editAnswer = this.editAnswer.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
        this.changeSelectedQuestion = this.changeSelectedQuestion.bind(this);
        this.changeSelectedAnswer = this.changeSelectedAnswer.bind(this);
    }

    componentDidMount() {
        this.getAllQuestions();
    }

    getAllQuestions() {
        return fetch(url + 'getAllQuestions')
            .then(response => response.json())
            .then(allQuestions => {
                let questionData = [];
                let answers = {}
                console.log(this);
                Object.keys(allQuestions).forEach((key) => {
                    let newRow = {};
                    newRow.questionId = key;
                    newRow.questionText = allQuestions[key].questionText;
                    newRow.author = allQuestions[key].askedByName;
                    newRow.askedDate = allQuestions[key].askedDate;
                    questionData.push(newRow);
                    allQuestions[key].answers.forEach(answer => {
                        let newAnswer = {};
                        newAnswer.answerId = parseInt(answer["answerId"]);
                        newAnswer.answerText = answer["answerText"];
                        newAnswer.answerDate = answer["answerDate"];
                        newAnswer.author = answer["answeredByName"];
                        if (key in answers) {
                            answers[key].push(newAnswer);
                        } else {
                            answers[key] = [];
                            answers[key].push(newAnswer);
                        }
                    });
                });
                this.setState({
                    questionData: questionData,
                    questions: allQuestions,
                    answerData: answers
                });
            });
    }

    deleteQuestion(questionId) {
        let deleteUrl = url + 'deleteQuestion?questionId=' + questionId 
        return fetch(deleteUrl)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                delete this.state.questions[questionId]
                this.setState({
                    selectedQuestion: null,
                });
            });
    }

    editQuestion(questionId, questionText) {
        let body = {questionId: questionId, questionText: questionText}
        fetch(url + 'editQuestion', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)		
        }).then(response => {
            this.state.questions[questionId].questionText = questionText;
        });
    }

    deleteAnswer(answerId) {
        let deleteUrl = url + 'deleteAnswer?answerId=' + answerId 
        return fetch(deleteUrl)
            .then(response => response.json())
            .then(response => {
                console.log(response);
            });
    }

    editAnswer(answerId, answerText) {
        let body = {answerId: answerId, answerText: answerText}
        fetch(url + 'editAnswer', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)		
        }).then(response => {
        });
    }

    changeSelectedQuestion(rowData) {
        this.setState({
            selectedQuestion: rowData.questionId,
        });
    }

    changeSelectedAnswer(rowData) {
        this.setState({
            selectedAnswer: rowData.answerId
        })
    }
    
    render() {
        return (
            <div>
            <MaterialTable
                onRowClick={(event, rowData) => this.changeSelectedQuestion(rowData)}
                icons={tableIcons}
                title="All Questions"
                columns={this.state.questionColumns}
                data={this.state.questionData}
                editable={{
                    onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                        resolve();
                        this.setState(prevState => {
                            const data = [...prevState.questionData];
                            data.push(newData);
                            return { ...prevState, data };
                        });
                        }, 600);
                    }),
                    onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                        resolve();
                        if (oldData) {
                            this.setState(prevState => {
                            var questionData = [...prevState.questionData];
                            questionData[questionData.indexOf(oldData)] = newData;
                            return { ...prevState, questionData };
                            });
                            this.editQuestion(newData.questionId, newData.questionText);
                        }
                        }, 600);
                    }),
                    onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                        resolve();
                        this.setState(prevState => {
                            var questionData = [...prevState.questionData];
                            questionData.splice(questionData.indexOf(oldData), 1);
                            return { ...prevState, questionData };
                        });
                        this.deleteQuestion(oldData.questionId);
                        }, 600);
                    }),
                }}
            />
            {this.state.selectedQuestion ? 
                <MaterialTable
                    icons={tableIcons}
                    title={"Answers for Question " + this.state.selectedQuestion}
                    columns={this.state.answerColumns}
                    data={this.state.answerData[this.state.selectedQuestion]}
                    editable={{
                        onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                            resolve();
                            this.setState(prevState => {
                                const data = [...prevState.answerData];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                            }, 600);
                        }),
                        onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                            if (oldData) {
                                this.setState(prevState => {
                                    var answerData = [...prevState.answerData[this.state.selectedQuestion]];
                                    answerData[answerData.indexOf(oldData)] = newData;
                                    return { answerData: {...prevState.answerData, [this.state.selectedQuestion]: answerData }};
                                });
                                resolve();
                                this.editAnswer(newData.answerId, newData.answerText);
                            }
                            }, 600);
                        }),
                        onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                            resolve();
                            this.setState(prevState => {
                                var answerData = [...prevState.answerData[this.state.selectedQuestion]];
                                answerData.splice(answerData.indexOf(oldData), 1);
                                return { answerData: {...prevState.answerData, [this.state.selectedQuestion]: answerData }};
                            });
                            this.deleteAnswer(oldData.answerId);
                            }, 600);
                        }),
                    }}
                />
                
            : null}
            </div>
        );
    }
}

