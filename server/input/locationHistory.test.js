var locationHistory = require('./locationHistory')

describe('#locationHistory', () => {
  describe('#isValidLocationInput', () => {
    it('should be a valid location history input object', () => {
      var input = {
        captchaToken: 'foo',
        userId: 'xyz',
        locationHistory: [
          {
            dateTime: 1585344772667,
            timeAtLocation: 35000,
            location: { type: "Point", coordinates: [ 40, 5 ] },
            infected: true,
          }
        ]
      }
      var run = () => locationHistory.isValidLocationInput(input)
      expect(run).not.toThrow()
    })

    it(`should be a valid location history input when timeAtLocation is 
      omitted`.replace(/\s+/g, ' '), () => {
      var input = {
        captchaToken: 'foo',
        userId: 'xyz',
        locationHistory: [
          {
            dateTime: 1585344772667,
            location: { type: "Point", coordinates: [ 40, 5 ] },
            infected: true,
          }
        ]
      }
      var run = () => locationHistory.isValidLocationInput(input)
      expect(run).not.toThrow()
    })

    it('should throw if captcha token is missing', () => {
      var input = {
        userId: 'xyz',
        locationHistory: [
          {
            dateTime: 1585344772667,
            timeAtLocation: 35000,
            location: { type: "Point", coordinates: [ 40, 5 ] },
            infected: true,
          }
        ]
      }
      var run = () => locationHistory.isValidLocationInput(input)
      expect(run).toThrowError('Missing captcha token.')
    })

    it('should throw if userId is missing', () => {
      var input = {
        captchaToken: 'foo',
        locationHistory: [
          {
            dateTime: 1585344772667,
            timeAtLocation: 35000,
            location: { type: "Point", coordinates: [ 40, 5 ] },
            infected: true,
          }
        ]
      }
      var run = () => locationHistory.isValidLocationInput(input)
      expect(run).toThrowError('Missing userId.')
    })

    it(`should throw if any location history item is missing a 
      dateTime`.replace(/\s+/g, ' '), () => {
      var input = {
        captchaToken: 'foo',
        userId: 'xyz',
        locationHistory: [
          {
            dateTime: 1585344772667,
            timeAtLocation: 35000,
            location: { type: "Point", coordinates: [ 40, 5 ] },
            infected: true,
          },
          {
            timeAtLocation: 30000,
            location: { type: "Point", coordinates: [ 41, 6 ] },
            infected: true,
          }
        ]
      }
      var run = () => locationHistory.isValidLocationInput(input)
      expect(run).toThrowError(
        'Location history item is missing or has invalid dateTime prop.')
    })

    it(`should throw if any location history item is missing a 
      location prop`.replace(/\s+/g, ' '), () => {
      var input = {
        captchaToken: 'foo',
        userId: 'xyz',
        locationHistory: [
          {
            dateTime: 1585344772667,
            infected: true,
          },
          {
            dateTime: 1585344772667,
            timeAtLocation: 30000,
            location: { type: "Point", coordinates: [ 41, 6 ] },
            infected: true,
          }
        ]
      }
      var run = () => locationHistory.isValidLocationInput(input)
      expect(run).toThrowError(
        'Location history item is missing location prop.')
    })

    it(`should throw if any location history item is missing a 
      location prop`.replace(/\s+/g, ' '), () => {
      var input = {
        captchaToken: 'foo',
        userId: 'xyz',
        locationHistory: [
          {
            dateTime: 1585344772667,
            location: { type: "Point", coordinates: [ 40, 5 ] },
          },
          {
            dateTime: 1585344772667,
            timeAtLocation: 30000,
            location: { type: "Point", coordinates: [ 41, 6 ] },
            infected: true,
          }
        ]
      }
      var run = () => locationHistory.isValidLocationInput(input)
      expect(run).toThrowError(
        'Location history item is missing or has invalid infected prop.')
    })

    it(`should throw if location history item has an invalid location
      prop`.replace(/\s+/g, ' '), () => {
      var input = {
        captchaToken: 'foo',
        userId: 'xyz',
        locationHistory: [
          {
            dateTime: 1585344772667,
            timeAtLocation: 30000,
            location: { type: "foo", coordinates: [ 6 ] },
            infected: true,
          }
        ]
      }
      var run = () => locationHistory.isValidLocationInput(input)
      expect(run).toThrowError(
        'Type must be \'Point\' for a Geo Point.')
    })

    it(`should throw if the location history is not in chronological 
      sequence`.replace(/\s+/g, ' '), () => {
      
      var input = {
        captchaToken: 'foo',
        userId: 'xyz',
        locationHistory: [
          {
            dateTime: 1585344771000,
            location: { type: "Point", coordinates: [ 0, 0 ] },
            infected: true,
          },
          {
            dateTime: 1585344773000,
            location: { type: "Point", coordinates: [ 0, 0 ] },
            infected: true,
          },
          {
            dateTime: 1585344772000,
            location: { type: "Point", coordinates: [ 0, 0 ] },
            infected: true,
          }
        ]
      }
      var run = () => locationHistory.isValidLocationInput(input)
      expect(run).toThrowError(
        'Location history is not in chronological order.')
    })
  })

  describe('#isValidLocationItemInput', () => {
    it('should error if infected prop is not a boolean', () => {
      var locationItemInput = {
        dateTime: 1585344772667,
        timeAtLocation: 30000,
        location: { type: "Point", coordinates: [ 6 ] },
        infected: null,
      }
      var run = () =>  
        locationHistory.isValidLocationItemInput(locationItemInput)
      expect(run).toThrowError(
        'Location history item is missing or has invalid infected prop.')
    })
  })
})