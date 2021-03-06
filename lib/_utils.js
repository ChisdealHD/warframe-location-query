'use strict';

/**
 * Capitalize letters from a set of text
 * @param {string} txt Text to capitalize
 * @returns {string} Capitalized text
 */
function capitalizer(txt) {
  return `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`;
}

/**
 * Capitalize letters from a string, based on regex
 * @param {string} String to capitalize the first letters of individual words of
 * @returns {string} string that has had the first letters of each word capitalized
 */
function toTitleCase(str) {
  return str.replace(/\w\S*/g, capitalizer);
}

/**
 * Get relic tier value for comparing relics
 * @param {string} a Relic component to get value of
 * @returns {number} value of the provided Relic component
 */
function setRelicValForCompare(a) {
  const lithReg = /lith/ig;
  const mesoReg = /meso/ig;
  const neoReg = /neo/ig;
  const axiReg = /axi/ig;
  let val;

  if (lithReg.test(a)) {
    val = 0;
  } else if (mesoReg.test(a)) {
    val = 1;
  } else if (neoReg.test(a)) {
    val = 2;
  } else if (axiReg.test(a)) {
    val = 3;
  } else {
    val = 4;
  }

  return val;
}

/**
 * Sort function for relics based on their values
 * @param {String} a Component of relic a
 * @param {String} b Component of relic b
 * @returns {number} -1, 0, or 1, based on the value of the provided components
 */
function relicSort(a, b) {
  const aVal = setRelicValForCompare(a);
  const bVal = setRelicValForCompare(b);
  let val;
  if (aVal < bVal) {
    val = -1;
  } else if (aVal === bVal) {
    val = 0;
  } else if (aVal > bVal) {
    val = 1;
  }
  return val;
}

/**
 * Pad the location string to be a uniform width under monospace situations
 * @param {string} locationString the base location string to pad
 * @returns {string} the padded location string
 */
function padLocation(locationString) {
  let str;
  if (locationString.length < 8) {
    str = padLocation(`${locationString} `);
  } else {
    str = locationString;
  }
  return str;
}

/**
 * Create locations for the relic from a given json
 * @param {Object} locations
 * @returns {Array<string>} Array of location strings
 */
function locationsFromJson(locations) {
  const locListReturn = [];
  for (const i in locations) {
    let location = '';
    for (const j in locations[i]) {
      const tokens = [];
      location = `${padLocation(j)} | `;
      const planetNodes = locations[i][j];
      if (planetNodes[0][1] === '') {
        tokens.push(planetNodes[0]);
      } else {
        tokens.push(`${planetNodes[0][0]} (${planetNodes[0][1]})`);
      }
      locListReturn.push(location + tokens.join(', '));
    }
  }
  return locListReturn;
}

module.exports = {
  toTitleCase,
  setRelicValForCompare,
  relicSort,
  padLocation,
  locationsFromJson,
};
