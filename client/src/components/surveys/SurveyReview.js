import React from "react";
import {connect} from "react-redux";
import formFields from "./formFields";
import _ from "lodash";
import * as actions from "../../actions"
const SurveyReview = ({onCancel, formValues , submitSurvey}) => {

    const reviewFields = _.map(formFields,({name,label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    })
    return (
        <div>
            <h5>Please review your form</h5>
            {reviewFields}
            <button className="yellow darken-3 btn-flat white-text" onClick={onCancel}>Back</button>
            <button className="green btn-flat right white-text">Send Survey<i className ="material-icons right" onClick={() => submitSurvey(formValues)}>email</i></button>
        </div>
    )
}
function mapStateToProps(state){
    return {formValues : state.form.surveyForm.values};
}
export default connect(mapStateToProps, actions)(SurveyReview);