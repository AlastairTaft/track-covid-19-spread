# What is it?
An API to query the location data for COVID-19 diagnosed cases.

# Why
Tracking the spread of the virus is immensly valuable. But if everyone rolls their own solution for collecting this data its value is diminished. By being API only we make the data set easy to access and easy to contribute too. Giving other devs a head start on their solution building.

To kick things off we've provided [a simple website](https://www.trackcovid19spread.com) any COVID-19 positive users can use to anonymously submit their location data to help track the spread. 

# API 
Please use our API to get COVID-19 patient's historic location data. Use it ethically to build solutions to help fight the virus. Please share it, let's build a single source of truth with critical mass.

Alternatively feel free to fork this if you need to roll your own solution.

Postman collection [here](https://www.getpostman.com/collections/54111bc0dbf4e859c823).

## /location-history

Get location data for COVID-19 patients.

Method: GET

### Parameters
| Name       | Required | Description |
| ---------- | -------- | ----------- |
| geo-within | Yes      | A valid [Geo JSON geometry object](https://tools.ietf.org/html/rfc7946#section-3.1) |
| skip       | No       | An integer, skip the first n records | 
| limit      | No       | Get up to this many records back, max limit is 500 | 

Returns a [Geo JSON FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3)

Example url path.
```
/location-history?geo-within=%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B100%2C-20%5D%2C%5B110%2C-20%5D%2C%5B110%2C-30%5D%2C%5B100%2C-30%5D%2C%5B100%2C-20%5D%5D%5D%7D
```

## /submit-location-history

Submit location history for a diagnosed COVID-19 patient. All location history must be stored as a [GeoJSON Feature Collection](https://tools.ietf.org/html/rfc7946#section-3.3).

Method: POST

### Parameters
| Name     | Required | Description |
| -------- | -------- | ----------- |
| type     | Yes      | Accepts only a value of "FeatureCollection" |
| features | Yes      | An array of [Geo JSON Feature](https://tools.ietf.org/html/rfc7946#section-3.2) records | 

e.g.
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          50.123,
          51.321,
          0
        ]
      }
    }
  ]
}
```