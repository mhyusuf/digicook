// import '@types/jest';
import Landing from './Landing';
import configureStore from 'redux-mock-store';
import enzyme, { shallow } from 'enzyme';
import mockState from '../mocks/mockState';

const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });

let store, container;

describe('some description', () => {
  beforeEach(() => {
    store = configureStore()(mockState);
    container = shallow(<Landing store={store} hideMenu={true} />);
  });

  it('should render', () => {
    expect(container.length).toEqual(1);
  });
});
