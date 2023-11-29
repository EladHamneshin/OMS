import { shallow } from 'enzyme';
import NavBar from '../pages/navBar';

describe('NavBar component', () => {
  it('renders without crashing', () => {
    shallow(<NavBar />);
  });

  it('renders all navigation links', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.find('a[href="/login"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/register"]')).toHaveLength(1);
    expect(wrapper.find('a[href="/orders"]')).toHaveLength(1);
  });

  // Add more test cases as needed
});