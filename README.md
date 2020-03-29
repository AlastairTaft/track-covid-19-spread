# Help track the spread. Anonymously submit your location history. Fight the virus. 💪

## What can you do to help?
If you have been diagnosed with the corona virus visit [trackcovid19spread.com](https://www.trackcovid19spread.com) and submit your recent location data.

## Is it anonymous? 
Your data is anonymised before it reaches our servers. And we don't ask you to login to any accounts that could potentially identify you. 

## What do we do with the data?
We provide an API for other developers to access the location history of diagnosed corona virus patients. The data can be used to build a helpful tools, for example tracking the spread and estimating who's areas at risk.

# Developers

Please use our API to get COVID-19 patient's historic location data. Use it ethically to build solutions to help fight the virus. We aim to do one small piece of the puzzle that can be used as a stepping stone to leap frog other develops to build bigger and better apps.

COVID-19 patient's location history can be accessed via below documented API. Feel free to use our API for submitting data too rather than having to build a data set from scratch.

## /location-history

Get the number of households inside a GeoJSON object.
Method: GET

### Parameters
| Name  | Required | Description
| ------------- | ------------- | ------- |
| geometry | Yes | A [GeoJSON Polygon object](https://tools.ietf.org/html/rfc7946#section-3.1.6). _NOTE: coordinate points are always an array with longitude being the first element and latitude being the second._ |

## /submit-location-history

Submit location history for a diagnosed COVID-19 patient.
Method: POST
### Parameters
| Name  | Required | Description
| ------------- | ------------- | ------- |
| userId | Yes | A unique string that is unique for the patient but has no personal identifying information. |
| locationHistory | Yes | An array of location history data points. |
| locationHistory[].dateTime | Yes | An integer EPOCH of when the patient arrived at this location. |
| locationHistory[].timeAtLocation | No | The time (in milliseconds) the patient spent at the location, if known. |
| locationHistory[].location | Yes | The location. A [GeoJSON Polygon object](https://tools.ietf.org/html/rfc7946#section-3.1.2). |


## TODO
- [ ] Parse the data that comes from Google and submit it
- [ ] Setup website
- [ ] Add a captcha
- [ ] Improve frontend design
- [ ] Add developer API to access the data
- [ ] Import any available third party data sources