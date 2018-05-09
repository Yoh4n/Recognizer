const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateDistributorInput(data) {
  let errors = {};

  // Check if data is empty
  data.distName = !isEmpty(data.distName) ? data.distName : '';
  data.mainpk = !isEmpty(data.mainpk) ? data.mainpk : '';
  data.siteUrl = !isEmpty(data.siteUrl) ? data.siteUrl : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (Validator.isEmpty(data.distName)) {
    errors.distName = 'Distributor name is required';
  }

  if (Validator.isEmpty(data.mainpk)) {
    errors.mainpk = 'Mainpk is required';
  }

  if (Validator.isEmpty(data.siteUrl)) {
    errors.siteUrl = 'SiteUrl is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
