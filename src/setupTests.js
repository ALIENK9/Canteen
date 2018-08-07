import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-localstorage-mock';

enzyme.configure({ adapter: new Adapter() });
// global.sessionStorage = session;
