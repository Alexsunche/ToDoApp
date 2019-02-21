import React from 'react';
import ReactDOM from 'react-dom';
import Column from './column';
import initialData from './initial-data';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Form from './form';

import * as serviceWorker from './serviceWorker';



class App extends React.Component {
    state = initialData;

    onDragEnd = result => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            };
            this.setState(newState);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            }
        };

        this.setState(newState);
        initialData = {...this.state}
        return;
    }
    addEvent = (data) => {
        console.log(data);
        
        this.setState(data);
    }
    editData = (data) => {
        console.log(data);
        
        this.setState(data);
    }
    render() {
        return (
            <React.Fragment>
                <Form onAdd = {this.addEvent}/>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {
                        this.state.columnOrder.map(columnId => {
                            const column = this.state.columns[columnId];
                            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                            return <Column key={columnId} column={column} tasks={tasks} editData = {this.editData} />
                        })
                    }
                </DragDropContext>
                </React.Fragment>    
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));




serviceWorker.unregister();
