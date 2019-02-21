import React from 'react';
import initialData from './initial-data';

export default class Form extends React.Component {

    state = {
        titleValue: 'event name',
        areaValue: 'description for event',
        imgPath: '',
        formState: false
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
        let state = this.state;
        initialData.tasks[state.titleValue] = {
            id: state.titleValue,
            content: { ...state },
        };
        initialData.columns['column-1'].taskIds.push(state.titleValue);
        this.setState({ formState: !this.state.formState });
        this.props.onAdd(initialData);
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
                            <input type="text" value={this.state.titleValue} onChange={this.handleTitleChange} required />
                        </label>
                        <label>Enter description for event
                            <textarea value={this.state.areaValue} onChange={this.handleAreaChange} required />
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