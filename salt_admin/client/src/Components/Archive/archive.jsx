import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import StudentCard from '../StudentCard/StudentCard';

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    fetch('/api/archived')
      .then(res => res.json())
      .then(res =>
        this.setState(prevState => ({
          ...prevState,
          students: res,
        }))
      );
  }

  updateSearch(query) {
    this.setState({query: query.trim()});
  }

  render() {
    const { students } = this.state;
    const { query } = this.state;

    let searchStudents;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i');
      searchStudents = students.filter((student) => match.test(student.vitalInfo.firstName))
    } else {
      searchStudents = students;
    }

    return (
      <>
        <h1>List of Students</h1>
        <input className="search-students"
          type="text"
          placeholder="  Search students"
          value={query}
          onChange={(event) => this.updateSearch(event.target.value)}>
        </input>
        <div className='grid'>
          {searchStudents.map((student) => (
            <StudentCard key={student[0]} student={student} />
          ))}
        </div>
      </>);
  }
}

export default Archive;