const API_HOST = 'http://localhost:30080/api/v1';

const ApiHost = {
  GetAPIHost: () => {
    return localStorage.getItem('apiHost') || API_HOST;
  }
}

export default ApiHost;