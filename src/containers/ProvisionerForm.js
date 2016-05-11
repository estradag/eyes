import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/ServiceFormActions';
import Application from '../components/provisionerForm/Application';
import CreateService from '../components/provisionerForm/CreateService';
import GithubService from '../components/provisionerForm/GithubService';
import ProjectName from '../components/provisionerForm/ProjectName';
import ServiceSummary from '../components/provisionerForm/ServiceSummary';

const provisionFormOptionsApi = require("../api/provisionFormOptionsApi");

export class ServiceForm extends Component {
  render() {
    return (
      <div className="row">
        <div data-magellan-expedition="fixed">
          <div className="row">
            <dl className="sub-nav">
              <dd className="active">
                <a href="#project-configuration">
                  <i className="step fi-wrench"></i>
                   Project Configuration</a>
              </dd>
              <dd>
                <a href="#connect-service">
                  <i className="step fi-share"></i>
                   Connect Service</a>
              </dd>
              <dd>
                <a href="#aplications"><i className="step fi-social-dropbox"></i>
                 Aplications</a>
              </dd>
              <dd className="user-login">
                <a href="#aplications"><i className="step fi-torso"></i>
                 Log in</a>
              </dd>
            </dl>
          </div>
        </div>
        <div className="row">
          <div className="large-10 columns">
            <h1><i className="step fi-clipboard-notes"></i>
              Create a Service
            </h1>
            <ProjectName 
              projectNameAppState={this.props.projectNameAppState}
              setProjectName={this.props.actions.setProjectName} />
            {(provisionFormOptionsApi.getProvisionFormOptions()[0]) ?       
              provisionFormOptionsApi.getProvisionFormOptions()[0].services.map((value, index) =>   
                (value.identifier == 'github') ?
                  <GithubService 
                    key = {value.identifier}
                    repositoryAppState={this.props.repositoryAppState}
                    setRepository={this.props.actions.setRepository}
                    setIntegracion={this.props.actions.setIntegracion}
                    setShowRepositories={this.props.actions.setShowRepositories}/> : ''
                ):''}
            <Application
              applicationsOptions={(provisionFormOptionsApi.getProvisionFormOptions()[0]) ? 
                provisionFormOptionsApi.getProvisionFormOptions()[0].application : ''}
              applicationAppState={this.props.applicationAppState}
              setApplication={this.props.actions.setApplication}/>
            <CreateService
              projectNameAppState={this.props.projectNameAppState}
              repositoryAppState={this.props.repositoryAppState}
              applicationAppState={this.props.applicationAppState}/>
          </div>
          <div className="large-2 columns hide-for-small-only hide-for-medium-only">
            <ServiceSummary
              projectNameAppState={this.props.projectNameAppState}
              repositoryAppState={this.props.repositoryAppState}
              applicationAppState={this.props.applicationAppState}/>
          </div>
        </div>
        <div className="row">
          <footer>
            <div className="row">
              <div className="large-12 large-centered medium-12 medium-centered small-12 small-centered columns">
                <p className="copyright">© 2015, Inc. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

ServiceForm.propTypes = {
  actions: PropTypes.object.isRequired,
  projectNameAppState: PropTypes.object.isRequired,
  applicationAppState: PropTypes.object.isRequired,
  repositoryAppState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    projectNameAppState: state.projectNameAppState,
    applicationAppState: state.applicationAppState,
    repositoryAppState: state.repositoryAppState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceForm);
