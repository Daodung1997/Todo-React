import React, { Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './style.scss';

const Task = (props) => (
    <Draggable
        index={props.index}
        draggableId={props.task.get('id')}
        isDragDisabled={props.isEditing}
    >
        {
            provided => (
                <div className="Task"
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     ref={provided.innerRef}
                >
                    <Fragment>
                        <div className="Task__time">
                            <i className="far fa-calendar-alt"></i> {props.task.get('time')}
                        </div>
                        <div className="Task__main">
                            <div className="Task__content">
                                {props.task.get('content')}
                            </div>
                            <div className="Task__action">
                                <div className="Task__btn" onClick={props.handleChooseEditTask}>
                                    <i className="far fa-edit"></i>
                                </div>
                                <div className="Task__btn" onClick={props.handleDeleteTask}>
                                    <i className="far fa-trash-alt"></i>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                </div>
            )
        }
    </Draggable>
)

export default Task;
