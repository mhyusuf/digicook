// import '@types/jest';
import Landing from './Landing';
import configureStore from 'redux-mock-store';
import enzyme, {shallow, mount, render} from 'enzyme';

const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({adapter: new Adapter() });

let store, container;

describe('some description', ()=> {
  const mockStore = configureStore();  
  const fakeState = {
    collections: {
      collectionList: [{
        isPrivate: false,
        _recipes: [
          '5fb64ed5e8d419ff602cd0c5'
        ],
        _id: '5fb64e5de8d419ff602cd0c4',
        name: 'The best collection',
        _user: {
          _id: '5fb64e41e8d419ff602cd0c3',
          googleId: '112538235083508704382',
          name: 'Brett-Marco Glauser',
          email: 'bmcglauser@gmail.com',
          __v: 0
        },
        description: 'Check outtt yoooo',
        __v: 0,
        image: {
          type: 'Buffer',
          data: []
        }
      }]
    }
  }
  
  beforeEach(()=>{
    store = mockStore(fakeState)
    container = shallow(<Landing store={store} hideMenu={true} />)
  })

  it('should render', ()=> {
    expect(container.length).toEqual(1)
  })
});