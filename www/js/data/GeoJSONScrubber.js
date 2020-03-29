/**
 * @fileOverview Scrubs all sensitive data from a GeoJSON object.
 * 
 * NOTE: At the time of writing. May not be fully compliant with all GeoJSON.
 * Does the minimum needed for the COVID-19 hackathon use case.
 */

var covid = covid || {}
covid.data = covid.data || {}

/**
 * @class
 * Scrub sensitive data from GeoJSON objects.
 */
covid.data.GeoJSONScrubber = function(){

}

/**
 * Scrub sensitive data. Does not return anything as it will mutate the passed
 * in object to remove sensitive info.
 * @param {object} geoJSON Any GeoJSON object
 */
covid.data.GeoJSONScrubber.prototype.scrub = function(geoJSON){
  switch(geoJSON['type']){
    case 'FeatureCollection': return this.scrubFeatureCollection(geoJSON)
    case 'Feature': return this.scrubFeature(geoJSON)
  }
}

/**
 * Scrub a feature collection.
 * @param {GeoJSONFeatureCollection} featureCollection
 */
covid.data.GeoJSONScrubber.prototype.scrubFeatureCollection = 
  function(featureCollection){
  featureCollection['features'].forEach(this.scrub.bind(this))
}

/**
 * Scrub a feature.
 * @param {GeoJSONFeature} feature
 */
covid.data.GeoJSONScrubber.prototype.scrubFeature = function(feature){
  // Whitelist the allowed props
  var allowedProps = ['timespan', 'Category', 'Distance']
  var props = Object.keys(feature['properties'])
  props.forEach(p => {
    if (allowedProps.includes(p) == false)
      delete feature['properties'][p]
  })
}
