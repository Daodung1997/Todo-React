import React, { Component } from 'react';
import { fromJS } from 'immutable';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { v4 as uuidv4 } from 'uuid' ;
import './style.scss';
import Column from './components/Column/';
import AddNewModal from './components/AddNewModal/';
import Task from './components/Task/';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class App extends Component {

    state = {
        displayModal: false,
        selectedColumn: '',
        taskContent: '',
        columns: fromJS([
            { id: 'td', title: 'TO DO', tasks: [{id: 1, content: 'Demo task', time: '04/15/2019, 9:25:35 PM'}] },
            { id: 'ip', title: 'IN PROGRESS', tasks: [] },
            { id: 'de', title: 'DONE', tasks: [] }
        ]),
        editingTaskIndex: null,
        editedTaskId: null
    }

    componentDidMount() {
        const columns = localStorage.getItem('columns');
        if (columns) {
            this.setState({ columns: fromJS(JSON.parse(columns)) });
        }
    }

    handleToggleModal =(chooseColumn) => ()=>{
        this.setState(prevState => ({
            displayModal: !prevState.displayModal,
            selectedColumn: chooseColumn
        }))
    }
    handleChangeSelectedColumn = (selectedColumn) => () =>{
        this.setState({selectedColumn: selectedColumn})
    }

    handleChangeEditingColumnIndex = (editingColumnIndex) => () => this.setState({ editingColumnIndex: editingColumnIndex })


    handleChangeTaskContent =(e)=> this.setState({taskContent: e.target.value})


    handleAddNewTask = () => {
        const { taskContent } = this.state
        if (taskContent.trim() === '') {
            return toastr.warning('Please enter your task', 'Notice', { timeOut: 2000 });
        }

        const { selectedColumn, columns } = this.state;

        const newTask = fromJS({
            id: uuidv4(),
            content: taskContent,
            time: new Date().toLocaleString()
        });
        const columnIndex = columns.findIndex(column => column.get('id') === selectedColumn);

        const updatedColumn = columns.updateIn(
            [columnIndex, 'tasks'],
            tasks => tasks.push(newTask)
        );

        this.setState({
            displayModal: false,
            selectedColumn: '',
            taskContent: '',
            columns: fromJS(updatedColumn)
        })
    }

    handleDeleteTask = (columnIndex, taskIndex) => () => {
        const result = window.confirm('Are your sure to delete this task?');
        if (result) {
            const { columns } = this.state;
            const updatedColumn = columns.updateIn(
                [columnIndex, 'tasks'],
                tasks => tasks.remove(taskIndex));
            this.setState({ columns: fromJS(updatedColumn) }, () => {
                localStorage.setItem('columns', JSON.stringify(updatedColumn.toJS()));
                toastr.success('Delete task success', 'Notice', { timeOut: 2000 });
            });
        }
    }

    handleChooseEditTask = (columnIndex, taskIndex, taskId) => () => {
        this.setState({
            editingColumnIndex: columnIndex,
            editingTaskIndex: taskIndex,
            editedTaskId: taskId
        })
    }
    handleEdit = () => {
        const { columns, editingColumnIndex, taskContent, editingTaskIndex } = this.state;
        const updatedColumn = columns.updateIn(
            [editingColumnIndex, 'tasks'],
            tasks => tasks.setIn([editingTaskIndex, 'content'], taskContent)
        );
        this.setState({
            editingColumnIndex: '',
            taskContent: '',
            editedTaskId: null,
            editingTaskIndex: null,
            columns: fromJS(updatedColumn)
        }, () => {
            localStorage.setItem('columns', JSON.stringify(updatedColumn.toJS()));
        });
    }

    handleCancelEdit = () => {
        this.setState({
            editingColumnIndex: '',
            taskContent: '',
            editedTaskId: null,
            editingTaskIndex: null
        });
    }

    handleSaveDrag = (result) => {
        const { source, destination, reason } = result;
        if (reason === 'DROP' && destination) {
            const { columns } = this.state;
            const sourceColumnIndex = columns.findIndex(column => column.get('id') === source.droppableId);
            const task = columns.getIn([sourceColumnIndex, 'tasks', source.index]);
            let updatedColumn = columns.updateIn(
                [sourceColumnIndex, 'tasks'],
                tasks => tasks.remove(source.index)
            );
            const destinationColumnIndex = columns.findIndex(column => column.get('id') === destination.droppableId);
            updatedColumn = updatedColumn.updateIn(
                [destinationColumnIndex, 'tasks'],
                tasks => tasks.insert(destination.index, task)
            );
            this.setState({
                columns: fromJS(updatedColumn)
            }, () => {
                localStorage.setItem('columns', JSON.stringify(updatedColumn.toJS()));
            });
        }
    }


    render() {
        const { columns, displayModal, taskContent , editingColumnIndex, editedTaskId } = this.state;

        return (
            <div className="App">
                <h1 className="App__title">TO DO LIST</h1>
                <DragDropContext onDragEnd={this.handleSaveDrag}>
                <div className="App__content">
                    {
                        columns.map((column,columnIndex) => (
                            <Column
                                key={column.get('id')}
                                column={column}
                                handleAddNewTask = {this.handleToggleModal}>
                                <Droppable droppableId={column.get('id')}>
                                    {
                                        provided => (
                                            <div ref={provided.innerRef}
                                                 {...provided.droppableProps}
                                                 style={{ minHeight: '300px' }}
                                            >
                                                {
                                                    column.get('tasks').map((task, taskIndex) => (
                                                        <Task key={task.get('id')}
                                                              index={taskIndex}
                                                              isEditing={task.get('id') === editedTaskId}
                                                              handleChangeTaskContent={this.handleChangeTaskContent}
                                                              task={task}
                                                              handleEdit={this.handleEdit}
                                                              handleCancelEdit={this.handleCancelEdit}
                                                              handleChooseEditTask={this.handleChooseEditTask(columnIndex, taskIndex, task.get('id'))}
                                                              handleDeleteTask={this.handleDeleteTask(columnIndex, taskIndex)} />
                                                    ))
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }
                                </Droppable>
                            </Column>
                        ))
                    }
                </div>
                </DragDropContext>
                {displayModal &&
                <AddNewModal
                    handleToogleModal={this.handleToggleModal}
                    selectedColumn={this.state.selectedColumn}
                    handleChangeSelectedColumn={this.handleChangeSelectedColumn}
                    taskContent={taskContent}
                    handleChangeTaskContent={this.handleChangeTaskContent}
                    handleAddNewTask ={this.handleAddNewTask}
                    handleChangeEditingColumnIndex={this.handleChangeEditingColumnIndex}
                    editingColumnIndex={editingColumnIndex}

                />}
            </div>
        );
    }
}

export default App;
