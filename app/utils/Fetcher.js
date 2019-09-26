import Connection from '../constants/Connection';

const headers = new Headers();
headers.append('Content-Type', 'application/json');

const GEToptions = {
  method: 'GET',
  headers: headers,
}

const POSToptions = {
  method: 'POST',
  headers: headers,
}

const PUToptions = {
  method: 'PUT',
  headers: headers,
}

export default {
  POSTservice: function (license_plate, service) {
    const url = Connection.API_URL + '/car/' + license_plate + '/service';
    const newOptions = POSToptions;
    newOptions.body = JSON.stringify(service);

    const request = new Request(url, newOptions);
    return fetch(request);
  },

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
  },
  GETsession: function () {
    const url = Connection.API_URL + '/session/';
    const newOptions = GEToptions;

    const request = new Request(url, newOptions);
    return fetch(request);
  },
  PUTsession: function (body) {
    const url = Connection.API_URL + '/session/';
    const newOptions = PUToptions;
    newOptions.body = JSON.stringify(body);

    const request = new Request(url, newOptions);
    return fetch(request);
  }
}