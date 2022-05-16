import React, { Component } from 'react';

import { getTemplateFromLocalStorage, saveTemplateToLocalStorage } from '../utils/storage';
import { saveSuccessMessage, saveErrorMessage, saveNoChangesMessage } from '../constants/messages';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      saveMessage: null,
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
      this.setState({ template });
    }
  }

  saveTemplate() {
    const template = getTemplateFromLocalStorage();
    this.setState({ saveMessage: null });
    if (template === this.state.template) {
      this.setState({ saveMessage: saveNoChangesMessage });
      return;
    }

    const saveSuccessful = saveTemplateToLocalStorage(this.state.template);

    if (!saveSuccessful) {
      this.setState({ saveMessage: saveErrorMessage });
    } else {
      this.setState({ saveMessage: saveSuccessMessage });
    }
  }

  handleSave(e) {
    e.preventDefault();
    this.saveTemplate();
  }
  
  handleBack(e) {
    e.preventDefault();
    window.location = document.referrer;
  }

  handleCancel(e) {
    e.preventDefault();
    this.getTemplate();
    window.location = document.referrer;
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ template: value });
    this.setState({ saveMessage: null });
  }

  handleSubmit(e) {
    e.preventDefault();
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
            className="color-tertiary min-width-10 mr-1"
            name="backButton"
            id="backButton"
            onClick={this.handleBack}
          >
            Back
          </button>
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
        { this.state.saveMessage && 
          <div className="text-center pad-top-bottom-1">
            <p>{ this.state.saveMessage }</p>
          </div>
        }
      </form>
    )
  }
}

export default EditForm;