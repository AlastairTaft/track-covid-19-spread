# Help track the spread. Anonymously submit your location history. Fight the virus. 💪

## What can you do to help?
If you have been diagnosed with the corona virus visit [trackcovid19spread.com](https://www.trackcovid19spread.com) and submit your recent location data.

## Is it anonymous? 
Your data is anonymised before it reaches our servers. And we don't ask you to login to any accounts that could potentially identify you. 

## What do we do with the data?
We provide an API for other developers to access the location history of diagnosed corona virus patients. The data can be used to build a helpful tools, for example tracking the spread and estimating areas at risk.

# Developers

Please use our API to get COVID-19 patient's historic location data. Use it ethically to build solutions to help fight the virus. We aim to do one small piece of the puzzle that can be used as a stepping stone to leap frog other develops to build bigger and better apps.

COVID-19 patient's location history can be accessed via below documented API. Feel free to use our API for submitting data too rather than having to build a data set from scratch.

## /location-history

Get location data for COVID-19 patients.
Method: GET

TBD

## /submit-location-history

Submit location history for a diagnosed COVID-19 patient. All location history must be stored as a [GeoJSON Feature Collection](https://tools.ietf.org/html/rfc7946#section-3.3).
Method: POST
### Parameters
| Name  | Required | Description
| ------------- | ------------- | ------- |
| type | Yes | Accepts only a value of "FeatureCollection" |
| features | Yes | An array of [Geo JSON Feature](https://tools.ietf.org/html/rfc7946#section-3.2) records | 

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


## TODO
- [x] Parse the data that comes from Google and submit it
- [x] Setup website
- [x] Improve frontend design
- [x] Update API to match GeoJSON Feature Collection
- [ ] Add developer API to access the data