import React from 'react';
import { Link, browserHistory } from 'react-router';

import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

export const JobListEntry = SortableElement(({job, index}) => {
  if (job.complete) {
    return (
      <tr className='tr-job complete'>
        <td className='td-company'>{job.company}</td>
        <td className='td-position'><a href={job.jobURL}>{job.title}</a></td>
      </tr>
    )
  } else {
    return (
      <tr className='tr-job'>
        <td className='td-company'>{job.company}</td>
        <td className='td-position'><a href={job.jobURL}>{job.title}</a></td>
      </tr>
    )
  }
  // return (<JobListEntry key={job.id} job={job} />)
});

// export default class JobListEntry extends React.Component {
//   constructor(props) {
//     super(props);
//     this.job = props.job;
//     this.index = props.index
//   }

//   componentDidMount() {
//     // console.log(this.props)
//   }

//   goToJobView() {
//     console.log('clicked!');
//     // browserHistory.push(`/jobView?id=${this.job.id}`);
//   }

//   render() {
//     return (<SortableItem key={`job-${this.index}`} index={this.index} job={this.job} />) 
//   }
// }
