/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

function objectIsEmpty(obj) {
  for (const _ in obj) {
    return false;
  }
  return true;
}

module.exports = {
  objectIsEmpty,
};
