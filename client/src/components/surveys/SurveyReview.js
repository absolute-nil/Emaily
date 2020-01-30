import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import * as actions from "../../actions";
const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  return (
    <div>
      <h5>Please review your form</h5>
      {reviewFields}
      <button
        className="yellow darken-3 btn-flat white-text"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={e => {
            e.target.style.visibility = 'hidden';
            submitSurvey(formValues, history)}}
      >
        Send Survey<i className="material-icons right">email</i>
      </button>
    </div>
  );
};
function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}
//withRouter helps the class to learn about the different routes since it is not
//directly connected to the app.js where routes exist
export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
