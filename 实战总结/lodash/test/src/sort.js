const { isBoolean } = require("lodash")

function compare(prop, order) {
  return function(obj1, obj2) {
    let val1 = obj1[prop]
    let val2 = obj2[prop]
    if (!isNaN(val1) && !isNaN(val2)) {
      val1 = Number(val1) 
      val2 = Number(val2) 
    }
    
    if (val1 < val2) {
      if (order === 'ascending') {
        return -1
      } else {
        return 1
      }
    } else if (val1 > val2) {
      if (order === 'ascending') {
        return 1
      } else {
        return -1
      }
    } else {
      return 0
    }

  }
}

function deepClone(obj) {

  if (typeof obj !== 'object' || obj == null) {
    return obj
  }

  let resObj 
  for (let key in obj) {
    resObj[key] = deepClone(resObj)
  }

  return resObj
}



