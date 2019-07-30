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

`/api/v1/client`
* POST - create a new owner

**Parameters**
* email or telephone (only one required)
* names

`/api/v1/client/:id/car`
* POST - add car to this client

**Parameters**
* license plate, make, model, year (required)
* power_in_hp, filter_particles, engine_code, variant, api_car_id (optional)

`/api/v1/car/:license_plate/service`
* GET - retrieve all previous service records
* POST - create a new service record

`/api/v1/car/:license_plate`
* GET - retrieve all the service records for this vehicle
* PUT - update information about this vehicle
* DELETE - delete this vehicle

`/api/v1/suggestions`

**Parameters:**
* year (required)
* model (required)
* make (required)
* trim (optional)

To be implemented
---

`/api/v1/car`
* POST - create a new automobile

`/api/v1/auto/:license_plate/owner`
* PUT - add owner to vehicle

`/api/v1/auto/:license_plate/service/:id`
* PUT - update a service record
* DELETE - delete a service record
