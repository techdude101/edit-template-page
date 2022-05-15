import React, { Component } from 'react';

import { getTemplateFromLocalStorage, saveTemplateToLocalStorage } from '../utils/storage';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      template: `*Description:*
<description>
    
<project>-<code>
    
*Steps to Recreate:*
<steps>
    
*Actual Result:*
    
*Expected Result:*
    
*Versions:*
`
    }
  }

  componentDidMount() {
    this.getTemplate();
  }

  getTemplate() {
    const template = getTemplateFromLocalStorage();
    if (template === null && this.state && this.state.template) {
      this.saveTemplate(this.state.template);
    } else if (template) {
      this.setState({ template })
    }
  }

  saveTemplate(template) {
    const saveSuccessful = saveTemplateToLocalStorage(template);
    if (!saveSuccessful) {
      console.error("Error saving template to local storage");
    } else {
      console.log("Save template to local storage successful");
    }
  }

  handleSave(e) {
    e.preventDefault();
    console.log("Save");
    this.saveTemplate(this.state.template);
  }

  handleCancel(e) {
    e.preventDefault();
    console.log("Cancel");
    this.getTemplate();
    window.location = document.referrer;
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ template: value })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.dir(e);
  }

  render() {
    return (
      <form className="form-container" onSubmit={this.handleSubmit}>
        <label htmlFor="textarea-template">
          Template
        </label>
        <textarea name="textarea-template" className="p-1" rows="20" onChange={this.handleChange} value={this.state.template}>
        </textarea>
        <div className="button-container pad-top-bottom-1">
          <button
            className="color-secondary min-width-10 mr-1"
            name="cancelButton"
            id="cancelButton"
            onClick={this.handleCancel}
          >
            Cancel
          </button>
          <button
            className="color-primary min-width-10"
            name="saveButton"
            id="saveButton"
            onClick={this.handleSave}
          >
            Save
          </button>
        </div>
      </form>
    )
  }
}

export default EditForm;