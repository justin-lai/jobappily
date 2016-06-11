import React from 'react';
import JobListEntry from './JobListEntry.jsx';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import { browserHistory } from 'react-router';

const DragHandle = SortableHandle(() => <img src="https://cdn1.iconfinder.com/data/icons/navigation-and-ui-menu/32/hamburger_menu_lines_options_setup-128.png" className="drag-icon"/>); 

const SortableItem = SortableElement(({job, index, goToJobView}) => {
  // return (<JobListEntry key={job.id} job={job} />)
 if (job.complete) {
   return (
    <li className='li-job complete'>
      <DragHandle /> {job.company} - <a href={job.jobURL}>{job.title}</a> <button className='view-job inline pull-right' onClick={goToJobView.bind(null,job)}>View Job</button>
    </li>
   )
 } else {
   return (
     <li className='li-job'>
      <DragHandle /> {job.company} - <a href={job.jobURL}>{job.title}</a> <button className='view-job inline pull-right' onClick={goToJobView.bind(null,job)}>View Job</button>
     </li>
   )
 }
});

const SortableList = SortableContainer(({activeJobs, toDoJobs, goToJobView}) => {
  console.log('!!!!!!!!!CHANGED')
  // console.log('!!!!!', activeJobs.map(job => job.company));
  let adjustment = activeJobs.length;
  return (
    <div>
      <ul className='ul-job'>
        {
          activeJobs.map( (job, index) => {
            return (<SortableItem key={`job-${index}`} index={index} job={job} goToJobView={goToJobView}/>) 
            // return <JobListEntry key={`job-${index}`} job={job} index={index} />
          })
        }
        
          <a className="arrow-btn left" href="#202"><span className="icon fontawesome-angle-left"></span></a>
          <h2 className="jobPosting-month block titular job-depot">Job Depot</h2>
          <a className="arrow-btn right" href="#203"><span className="icon fontawesome-angle-right"></span></a>

        {
          toDoJobs.map( (job, index) => {
            return (<SortableItem key={`job-${index+adjustment}`} index={index+adjustment} job={job} goToJobView={goToJobView}/>) 
            // return <JobListEntry key={`job-${index}`} job={job} index={index} />
          })
        }
      </ul>
    </div>
  )
  // return (
  //   <div>
  //     <table className="jobPosting activeApps">
  //       <thead className="days-week">
  //           <tr>
  //               <th>Company</th>
  //               <th>Job Posting</th>
  //           </tr>
  //       </thead>
  //       <tbody>
  //         {
  //           activeJobs.map( (job, index) => {
  //             return (<SortableItem key={`job-${index}`} index={index} job={job} />)
  //             // return <JobListEntry key={`job-${index}`} job={job} index={index} />
  //           })
  //         }
  //       </tbody>
  //     </table>

  //     <table className="jobPosting toDoApps">
  //       <thead className="days-week">
  //           <tr>
  //               <th>Company</th>
  //               <th>Job Posting</th>
  //           </tr>
  //       </thead>
  //       <tbody>
  //         {
  //           toDoJobs.map( (job, index) => {
  //             return (<SortableItem key={`job-${index+adjustment}`} index={index+adjustment} job={job}  />)
  //             // return <JobListEntry key={`job-${index}`} job={job} index={index} />
  //           })
  //         }
  //       </tbody>
  //     </table>
  //   </div>
  // );
});



export default class JobList extends React.Component {  
  constructor(props) {
    super(props);

    this.methods = props.methods;

    this.state = {
      activeJobs: [],
      toDoJobs: []
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.setState({
      activeJobs: this.props.activeJobs,
      toDoJobs: this.props.toDoJobs
    })
    // this.state.jobs = this.props.jobs
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeJobs: nextProps.activeJobs,
      toDoJobs: nextProps.toDoJobs
    })
  }

  onSortStart({node, index}) {
    console.log('NODE: ', node);
    node = <tr><td>TEST</td></tr>
  }

  onSortEnd({oldIndex, newIndex}) {
    console.log('old: ', oldIndex)
    console.log('new: ', newIndex)
    let adjustment = this.state.activeJobs.length;
    let newActiveJobs = this.state.activeJobs.slice();
    let newToDoJobs = this.state.toDoJobs.slice();
    //if position grabbed is an active job
    if (oldIndex < adjustment) {
      //if swapping with another activeJob
      if (newIndex < adjustment) {
        newActiveJobs = arrayMove(this.state.activeJobs, oldIndex, newIndex);
      //if moving activeJob to toDoJob
      } else {
        let jobToMove = newActiveJobs[oldIndex];
        jobToMove.apply = false;
        this.methods.putJob(jobToMove);
        newToDoJobs.splice(newIndex - adjustment, 0, jobToMove)
        newActiveJobs.splice(oldIndex, 1);
      }

    //if position grabbed is a to-do job
    } else {
      //if swapping with another to-do job
      if (newIndex >= adjustment) {
        newToDoJobs = arrayMove(this.state.toDoJobs, oldIndex-adjustment, newIndex-adjustment);
      //if moving toDoJob to activeJob
      } else {
        let jobToMove = newToDoJobs[oldIndex - adjustment];
        jobToMove.apply = true;
        this.methods.putJob(jobToMove);
        newActiveJobs.splice(newIndex, 0, jobToMove);
        newToDoJobs.splice(oldIndex - adjustment, 1);
      }
    }
    this.setState({
      activeJobs: newActiveJobs,
      toDoJobs: newToDoJobs
    });

    // console.log('active: ', newActiveJobs.map(job => job.company))
    // console.log('toDo: ', newToDoJobs.map(job => job.company))
  }

  goToJobView(job) {
    console.log('clicked!');
    browserHistory.push(`/jobView?id=${job.id}`);
  }

  render() {
    return (
      <SortableList toDoJobs={this.state.toDoJobs}
                    activeJobs={this.state.activeJobs}
                    goToJobView={this.goToJobView.bind(this)}
                    // onSortStart={this.onSortStart.bind(this)}
                    onSortEnd={this.onSortEnd.bind(this)}
                    // transitionDuration={0}
                    useDragHandle={true}
                    lockAxis='y'
                    />
    )
  }
}
