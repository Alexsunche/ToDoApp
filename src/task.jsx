import  React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import initialData from './initial-data';

export default class Task extends React.Component {
    state = {
        descriptionState: true,
        newTitle: this.props.task.content.titleValue,
        newDescription: this.props.task.content.areaValue,

  
    }

    editTask = (e) => {
        e.preventDefault();           
            let newTitle = this.state.newTitle;
            let oldTitle = this.props.task.content.titleValue;
            let newDescription = this.state.newDescription;
            let oldId = this.props.task.id;
            let newId = newTitle;
            let newTitleObj = {
                id: newId,
                content: {
                    titleValue: newTitle,
                    areaValue: newDescription,
                    imgPath: this.props.task.content.imgPath
                }
            };
            delete initialData.tasks[oldTitle];
            initialData.tasks[newTitle] = {...newTitleObj};
            let taskIndex = initialData.columns[this.props.column].taskIds.indexOf(oldId);
            initialData.columns[this.props.column].taskIds[taskIndex] = newId;
            console.log(initialData);
            this.props.onEdit(initialData);     
            this.setState({descriptionState : !this.state.descriptionState});
    }

    handleTitleChange = (e) => {
        this.setState({newTitle: e.target.value});
    }
    handleAreaChange = (e) => {
        this.setState({newDescription: e.target.value});
    }
    handleChoseImgChange = (e) => {
        let file = e.target.files[0];
        let path = (window.URL || window.webkitURL).createObjectURL(file);
        this.setState({ imgPath: path });
    }
    changeState = (e) => {
        e.preventDefault();
        this.setState({descriptionState : !this.state.descriptionState});
    }
    render(){
        let descriptionBox;
        if (this.state.descriptionState) {
            descriptionBox =  <div className="event-description">
                                <h4>{ this.props.task.content.titleValue }</h4>
                                <p>{ this.props.task.content.areaValue }</p>
                                <button onClick = {this.changeState}>Edit</button>
                              </div>;
        } else {
            descriptionBox = <div className="event-description">
                                <input type="text" placeholder="new title" value={this.state.newTitle} onChange={this.handleTitleChange}/>
                                <textarea placeholder="new description" value={this.state.newDescription} onChange={this.handleAreaChange} />
                                <input type="file" onChange={this.handleChoseImgChange} accept="image/jpeg,image/png,image/gif" />
                                <button onClick = {this.editTask}>OK</button>
                             </div>
        }
        return(
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {
                    (provided, snapshot) => (
                        <li className="task-container" 
                          {...provided.draggableProps} 
                          {...provided.dragHandleProps} 
                          ref = {provided.innerRef}
                        >
                            <img src={ this.props.task.content.imgPath} alt="noImg" height="65px" width="65px"/>
                            {descriptionBox}
                        </li>
                    )
                }
            </Draggable>
        )
    }
}
