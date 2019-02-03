import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StudentList from '../StudentList/StudentList'; 
import StudentCard from '../StudentCard/StudentCard';
// note working YET
configure({ adapter: new Adapter() });

// const students = [
//   'Freddie','Jimmy','Jim'
// ];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StudentList students={ students } />, div);
  ReactDOM.unmountComponentAtNode(div);
});


// it('renders the list', () => {
//   const listTest = shallow(<StudentList students={students} />);
//   const newList = listTest.map(students => <StudentCard key={Math.random() * 100} student={students} />);
//   expect(listTest.length).toEqual(newList.length);
// });