import React from 'react';


export default class Form extends React.Component {

    state = {
        titleValue: '',
        areaValue: '',
        imgPath: '',
        formState: false,
        titlesArr: []
    }

    handleTitleChange = (event) => {
        this.setState({ titleValue: event.target.value });
    }

    handleAreaChange = (event) => {
        this.setState({ areaValue: event.target.value });
    }

    handleChoseImgChange = (event) => {
        let file = event.target.files[0];
        let path = (window.URL || window.webkitURL).createObjectURL(file);
        this.setState({ imgPath: path });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.state.titleValue){
            alert("add title of your task");
            return;
        }
        
        let state = this.state;
        
        if (state.titlesArr.indexOf(state.titleValue) >= 0) {
            alert("Task with such name already exist");
            return;
        } 
        state.titlesArr.push(state.titleValue);
        
        let oldState = { ...this.props.stateData };
        oldState.tasks[state.titleValue] = {
            id: state.titleValue,
            content: { ...state },
        };
        oldState.titlesArr = state.titlesArr;
        oldState.columns['column-1'].taskIds.unshift(state.titleValue);
        this.setState({ formState: !this.state.formState });
        this.props.onAdd(oldState);
    }
    formStateChange = (e) => {
        e.preventDefault();
        this.setState({ formState: !this.state.formState });
    }
    render() {
        let addForm;
        if (!this.state.formState) {
            addForm = <form  className="addEventForm">
                            <input type="submit" value="Add event" onClick={this.formStateChange} /> 
                      </form>;
        } else {
            addForm = <form onSubmit={this.handleSubmit} className="addEventForm">
                        <label>Enter event name
                            <input type="text" value={this.state.titleValue} onChange={this.handleTitleChange} placeholder="Your task" />
                        </label>
                        <label>Enter description for event
                            <textarea value={this.state.areaValue} onChange={this.handleAreaChange} placeholder="Your description" />
                        </label>
                        <input type="file" onChange={this.handleChoseImgChange} accept="image/jpeg,image/png,image/gif" />
                        <input type="submit" value="Add event" />
                    </form> ;
        }

        return (
            addForm
        )
    }
}
