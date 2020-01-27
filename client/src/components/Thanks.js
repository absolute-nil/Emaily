import React, { Component } from "react";
export default class Thanks extends Component{
  onNegativeFeedback(){
      if(this.props.match.params.feedback === "no"){
        return (
        <div>
          <textarea className="materialize-textarea" id="feedback"></textarea>
          <label htmlFor="feedback">What can we do to Improve ?</label>
        </div>);
      }
    }
  render(){
      return(
        <div>
          <h4>Thanks for your Feedback !</h4>
          { this.onNegativeFeedback() }
        </div>
      );
  }
}
