import React from 'react';
import { shallow } from 'enzyme';
import navBar from '../pages/navBar';

describe('NavBar component', () => {
  it('renders without crashing', () => {
    shallow(<navBar />);
  });

  it('renders all navigation links', () => {
    const wrapper = shallow(<navBar />);
    expect(wrapper.find('a[href="/login"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/register"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/orders"]')).toHaveLength(1);
  });

  // Add more test cases as needed
});