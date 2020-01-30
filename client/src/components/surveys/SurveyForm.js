//shows form to add input
import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/emailValidation";
import formFields from "./formFields";
class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values){
    const errors = {};
    errors.recipients = validateEmails(values.recipients||"");
    _.each(formFields,({name}) =>{
        //we use square brackets cuz values.name means there is something called name name= xyz
        if(!values[name]) {
            errors[name] = "You must provide a value!";
        }
    })
    
    return errors;
}

export default reduxForm({
  //if unmounted the values will persist
    destroyOnUnmount:false,
  validate,
  form: "surveyForm"
})(SurveyForm);
