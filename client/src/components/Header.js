import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Header extends Component {
  renderContent() {
    console.log(this.props.auth);
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link
              to={this.props.auth ? "/surveys" : "/"}
              className="left brand-logo"
            >
              Emaily
            </Link>
            <ul className="right">{this.renderContent()}</ul>
          </div>
        </nav>
      </div>
    );
  }
}

//returns the auth reducer
function mapStateToProps({ auth }) {
  return { auth };
}

//connect is used to connect the react and redux
export default connect(mapStateToProps)(Header);
