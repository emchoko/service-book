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
  POSTlogin: (username, password) => {
    const url = Connection.API_URL + '/auth/login';
    const newOptions = POSToptions;
    newOptions.body = JSON.stringify({ username: username, password: password });

    const request = new Request(url, newOptions);
    return fetch(request);
  },
  PUTsession: (body, token) => {
    const url = Connection.API_URL + '/session/';
    const newOptions = PUToptions;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', token);

    newOptions.headers = headers;
    newOptions.body = JSON.stringify(body);
    console.log(newOptions);
    const request = new Request(url, newOptions);
    return fetch(request);
  },
  POSTservice: (license_plate, service, token) => {
    const url = Connection.API_URL + '/car/' + license_plate + '/service';
    const newOptions = POSToptions;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', token);

    newOptions.headers = headers;
    newOptions.body = JSON.stringify(service);

    const request = new Request(url, newOptions);
    return fetch(request);
  },

  POSTcar: (client_id, car, token) => {
    const url = Connection.API_URL + '/client/' + client_id + '/car';
    const newOptions = POSToptions;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', token);

    newOptions.headers = headers;
    newOptions.body = JSON.stringify(car);

    const request = new Request(url, newOptions);
    return fetch(request);
  },

  POSTclient: (client, token) => {
    const url = Connection.API_URL + '/client/';
    const newOptions = POSToptions;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', token);

    newOptions.headers = headers;
    newOptions.body = JSON.stringify(client);

    const request = new Request(url, newOptions);
    return fetch(request);
  },
  GETcars: (endpoint) => {
    const url = Connection.API_URL + endpoint;
    const newOptions = GEToptions;

    const request = new Request(url, newOptions);
    return fetch(request);
  },
  GETclient: (email) => {
    const url = Connection.API_URL + '/client/' + email;
    const newOptions = GEToptions;

    const request = new Request(url, newOptions);
    return fetch(request);
  },
  GETsession: () => {
    const url = Connection.API_URL + '/session/';
    const newOptions = GEToptions;

    const request = new Request(url, newOptions);
    return fetch(request);
  },
  GETlicensePlate: (license_plate) => {
    const url = Connection.API_URL + '/license_plate/' + license_plate
    const newOptions = GEToptions;

    const request = new Request(url, newOptions);
    return fetch(request);
  },
  GETservices: (start, end) => {
    const url = Connection.API_URL + '/car/service?startDate=' + start + "&endDate=" + end;
    const newOptions = GEToptions;

    const request = new Request(url, newOptions);
    return fetch(request);
  },
  GETservicesForCar: (lp) => {
    const url = Connection.API_URL + '/car/' + lp + '/service';
    const newOptions = GEToptions;

    const request = new Request(url, newOptions);
    return fetch(request);
  },
}