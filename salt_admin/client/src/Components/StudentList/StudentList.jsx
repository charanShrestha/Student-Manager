import React, { Component } from 'react';
import StudentCard from '../StudentCard/StudentCard';
import { Link } from 'react-router-dom';
import './studentList.scss';
import escapeRegExp from 'escape-string-regexp';


class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      filtered: [],
      query: '',
    };

    this.updateSearch = this.updateSearch.bind(this);

  }


  updateSearch(query) {
    const { students } = this.state;
    const { filtered } = this.state;
    this.setState(prevState => ({
      ...prevState,
      query: query,
    }));
    const match = new RegExp(escapeRegExp(query), 'i');
    let searchStudents = students.filter((student) => match.test(student.vitalInfo.firstName));
    this.setState(prevState => ({
      ...prevState,
      filtered: searchStudents,
    }));
  }


  componentDidMount() {

    fetch('/api/students')
      .then(res => res.json())
      .then(res =>
        this.setState(prevState => ({
          ...prevState,
          students: res,
        }))
      );
  }


  render() {
    const { query } = this.state;
    const { students } = this.state;
    const { filtered } = this.state;

    return (
      <>
        <div className="header">
          <h1>List of Students</h1>
          <input className="search-students"
            type="text"
            placeholder="  Search students"
            value={query}
            onChange={(event) => this.updateSearch(event.target.value)}>
          </input>
          <div className="links">
            <Link className="newStudent" to='/newStudent'>Add Student</Link>
            <Link className="archivedStudents" to='/archived'>Archived Students</Link>
          </div>
        </div>
        <div>
          {query.length == 0 ? (
            <div className='grid'>

              {students.map((student) => (
                <StudentCard key={student.vitalInfo.personNumber} student={student} />
              ))}
            </div>
          ) : (
            <div className='grid'>
              {filtered.map((student) => (
                <StudentCard key={student.vitalInfo.personNumber} student={student} />
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default StudentList;