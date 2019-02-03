import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StudentCard from '../StudentCard/StudentCard';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StudentCard/>, div);
  ReactDOM.unmountComponentAtNode(div);
});