import Connection from '../constants/Connection';

const headers = new Headers();
headers.append('Content-Type', 'application/json');

const POSToptions = {
  method: 'POST',
  headers: headers,
}

export default {
  POSTcar: function (client_id, car) {
    const url = Connection.API_URL + '/client/' + client_id + '/car';
    const newOptions = POSToptions;
    newOptions.body = JSON.stringify(car);

    const request = new Request(url, newOptions);
    return fetch(request);
  },
  POSTclient: function (client) {
    const url = Connection.API_URL + '/client/';
    const newOptions = POSToptions;
    newOptions.body = JSON.stringify(client);

    const request = new Request(url, newOptions);
    return fetch(request);
  }
}