const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 5252
const fs = require('fs')
const cache = []
const csv=require('csvtojson')

var jsonParser = bodyParser.json()

const sendFailure = (res, message) => {
  res.send(`
    {
      "Error": "${message}"
    }
  `)
}

const searchCache = (countryCode, postalCode) => {
    for(const item of cache) {
        if(item.country === countryCode && item.postalCode === postalCode)
            return item
    }
    return undefined
}

const searchPostalCode = async (countryCode,postalCode) => {
    let sumLat = 0
    let sumLon = 0
    let countRecords = 0

    const jsonArray=await csv().fromFile(`${countryCode}.txt`);

    const postalCodeLength = postalCode.length

    for(const item of jsonArray) {
        const itemPostalCode = item.postalCode.toString()
        if(itemPostalCode.substring(0, postalCodeLength) === postalCode) {
            sumLat += parseFloat(item.lat)
            sumLon += parseFloat(item.lng)
            countRecords++
        }
    }

    const avgLat = sumLat / countRecords
    const avgLon = sumLon / countRecords
    return {'country': countryCode, 'postalCode': postalCode, 'lat': avgLat, 'lon': avgLon}
}

const performSearch = async(countryCode, req, res) => {
    if(!req.query.postalCode || req.query.postalCode.length < 3 || req.query.postalCode.length > 5) {
        sendFailure(res, 'Invalid input.  Ensure postal code is between 3 and 5 numeric characters')
        return
      }
    
      const cached = searchCache(countryCode, req.query.postalCode)

      if(cached !== undefined) {
          console.log('cache hit!')
          res.send(cached)
          return
      }
    
      try {
        const result = await searchPostalCode(countryCode, req.query.postalCode)
        res.send(result)
        cache.push(result)
      } catch(error) {
          console.log('Encountered exception', error)
          sendFailure(res, 'Unable to locate postal code')
      }
}

app.get('/US', async (req, res) => {
  await performSearch('US', req, res)
})

app.get('/MX', async (req, res) => {
    await performSearch('MX', req, res)
})

app.listen(port, () => {
  console.log(`3-digit postal code search listening at http://localhost:${port}`)
})
