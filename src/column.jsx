import React from 'react';
import Task from './task';
import { Droppable } from 'react-beautiful-dnd';

export default class Column extends React.Component {
    render(){
        return (
            <div className = "column-container">
                <h3 className="title">{this.props.column.title}</h3>
                <Droppable droppableId = {this.props.column.id}>
                    {
                        (provided) => (
                            <ul className="tasks-list" {...provided.droppableProps} ref = {provided.innerRef}>
                                { this.props.tasks.map((task, index) => <Task key={task.id} task={task} index = {index} />) }
                                {provided.placeholder}
                            </ul>
                        )
                    }

                </Droppable>
            </div>
        )
    }
}



