import once from './once';
import services from './services';

const request = once(services);

export default request;