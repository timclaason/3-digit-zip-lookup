// Note: Of course, this could have been a LRU or a call to a REDIS or some other
// commonly used caching tool.  Such an implementation would be better than this.
// this is simply a 
import { maxCacheSize } from "../config"
const cache = []
export const CACHE_LOOKUP_FAILURE = undefined

export const searchCache = (countryCode, postalCode) => {
    const found = cache.filter((item) => {
      return item.country === countryCode && item.postalCode === postalCode
    })
    return found.length > 0 ? found[0] : CACHE_LOOKUP_FAILURE
}

export const cacheItem = (item) => {
    if(searchCache(item.country, item.postalCode) !== CACHE_LOOKUP_FAILURE) return
    cache.push(item)

    if(cache.length > maxCacheSize) cache.shift()
}