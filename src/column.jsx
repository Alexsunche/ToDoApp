import React from 'react';
import Task from './task';
import { Droppable } from 'react-beautiful-dnd';

export default class Column extends React.Component {
    onEdit = (data) => {
        this.props.editData(data);
    }
    render(){
        return (
            <div className = "column-container">
                <h3 className="title">{this.props.column.title}</h3>
                <Droppable droppableId = {this.props.column.id}>
                    {
                        (provided) => (
                            <ul className="tasks-list" {...provided.droppableProps} ref = {provided.innerRef}>
                                { this.props.tasks.map((task, index) => <Task key={task.id} task={task} onEdit = {this.onEdit} index = {index} column = {this.props.column.id} />) }
                                {provided.placeholder}
                            </ul>
                        )
                    }

                </Droppable>
            </div>
        )
    }
}



