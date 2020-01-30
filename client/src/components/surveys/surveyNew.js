// SurveyNew shows SurveyForm and SurveyFormReview
import React, {Component} from "react";
import {reduxForm} from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyReview from "./SurveyReview";
class SurveyNew extends Component {

    state = {showReview: false};

    renderContent(){
        if(this.state.showReview){
            return <SurveyReview onCancel={()=>this.setState({showReview:false})} />
        }
        return <SurveyForm onSurveySubmmit ={ () => this.setState({showReview:true})} />
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}
// we mount the redux form to the parent class so that when the parent class is unmounted all the data is cleared 
export default reduxForm({
    form : 'surveyForm'
})(SurveyNew)