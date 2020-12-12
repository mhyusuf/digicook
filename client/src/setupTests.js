import Enzyme from 'enzyme';
import EnzymeAdaptor from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';

Enzyme.configure({
  adapter: new EnzymeAdaptor(),
  disableLifecycleMethods: true
})