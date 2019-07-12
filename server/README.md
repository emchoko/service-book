# Server/API
Used to serve the web application and API.

## Instructions

### Install packages

```
    npm install
```

### Run

```
    npm start
```

### Test
```
    npm test
```

## API documentation

`/api/v1` - endpoint of the API

`/api/v1/auto`
* POST - create a new automobile

`/api/v1/auto/:license_plate`
* GET - retrieve all the service records for this vehicle
* PUT - update information about this vehicle
* DELETE - delete this vehicle

`/api/v1/auto/:license_plate/service`
* GET - retrieve all previous service records
* POST - create a new service record

`/api/v1/auto/:license_plate/service/:id`
* PUT - update a service record
* DELETE - delete a service record

`/api/v1/suggestions`

**Parameters:**
* year (required)
* model (required)
* make (required)
* trim (optional)