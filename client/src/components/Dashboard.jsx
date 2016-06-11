import React from 'react';
import $ from 'jquery';
import JobListEntry from './JobListEntry.jsx';
import JobList from './JobList.jsx';
import TodoListEntry from './TodoListEntry.jsx';
import Calendar from './calendar.jsx';
import { Link } from 'react-router';
import Modal from 'react-modal';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.jobList = props.jobList;
    this.event = props.event;
    this.methods = props.methods;
    this.openModalAdd = this.openModalAdd.bind(this);
    this.closeModalAdd = this.closeModalAdd.bind(this);
    this.activeApplications = [];
    this.toDoApplications = [];
    this.state = {
     open: false
    };

  }

  handleSubmit (event) {
    event.preventDefault();
    var formData = {
      title: this.refs.title.value,
      company: this.refs.company.value,
      description: this.refs.description.value,
      complete: false,
      apply: true
    };
    // document.getElementById('form1').reset();
    this.methods.postJob(formData);
    this.methods.getJobList();
    // need to modify so modal closes only upon successful position save
    this.setState({open: false});
  }

  componentDidMount() {
    this.methods.getJobList();
    this.methods.getEvent();
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    this.jobList = nextProps.jobList;
    this.event = nextProps.event;
    this.categorizeJobs();
  }

  openModalAdd () {
    console.log(this.props);
    this.setState({open: true}); }

  closeModalAdd () {
    this.setState({open: false});
  }

  categorizeJobs() {
    this.activeApplications = this.jobList.filter( job => {
      return job.apply;
    });
    this.toDoApplications = this.jobList.filter( job => {
      return !job.apply;
    });

    this.render();
  }


  render() {
    var jobs = this.jobList;
    var events = Array.isArray(this.event) ? this.event : [];

    return (
      <div className="dashboard">

      {/*------------Add New Position Modal-----------------*/}
        <Modal isOpen={this.state.open} onRequestClose={this.closeModalAdd}>
          <div id="form-main">
            <div id="form-div">
              <form className="form" id="form1" onSubmit={this.handleSubmit.bind(this)}>
                <p className="inputForm">
                  <input type="text" ref="company" className="validate[required,custom[onlyLetter],length[0,100]] feedback-input" placeholder="Company Name"/>
                </p>
                <p className="inputForm">
                  <input type="text" ref="title" className="validate[required,custom[onlyLetter],length[0,100]] feedback-input" placeholder="Position Title"/>
                </p>
                <p className="text">
                  <textarea name="text" ref="description" className="validate[required,length[6,300]] feedback-input" id="comment" placeholder="Job Description"></textarea>
                </p>
                <div className="submit">
                  <input type="submit" value="ADD NEW POSITION" id="button-blue" />
                  <div className="ease"></div>
                </div>
              </form>
            </div>
          </div>
        </Modal>

        <div className="container">
          <div className="row">
            <div className="move-buttons">
              <Link to='/search' ><button className="top-btn first">Search For Jobs</button></Link>
              <Link to='/calendar' ><button className="top-btn">Calendar</button></Link>
            </div>

            {/*------------Active Applications-----------------*/}
            <div className="col-xs-12 col-md-8 left-container container">
              <div className="menu-box block">
                <h2 className="titular">Active Job Apps
                  <button type="button" className="btn btn-default btn-xs">
                    <span className="glyphicon glyphicon-plus" aria-hidden="true" onClick={this.openModalAdd}></span>
                  </button>
                </h2>
                <JobList methods={this.methods} activeJobs={this.activeApplications} toDoJobs={this.toDoApplications}/>
              </div>
            </div>

            {/*------------Today's Appointments-----------------*/}
            <div className="col-xs-6 col-md-4 left-container container">

              <div className="menu-box block"> 
                <h2 className="titular">Today's Appointments</h2>
                  <ul className="menu-box-menu">
                    {events.map(event => <TodoListEntry key={event.id} data={event}/>)}
                  </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
