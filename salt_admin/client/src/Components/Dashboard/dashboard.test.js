import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard from './Dashboard';
import StudentList from '../StudentList/StudentList'; 

configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the list', () => {
  const students = [
    'Freddie','Jimmy','Jim'
  ];
  const wrapper = shallow(<Dashboard {...students} />);
  expect(wrapper.find(StudentList).exists()).toBe(true);
});


