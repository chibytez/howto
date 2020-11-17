import validator from 'validator';

/**
 *
 * @description controller class with for users input validation
 *  @class UserController
 */
class UserValidation {
  /**
   *  @description method for validation of signup input
   *  @param {object} data body of the user's request
   *  @returns {object} The body of  the response message
   */
  static validateSignUpInput(data) {
    const error = {};
    let isValid = false;
    data.firstName = data.firstName ? data.firstName : '';
    data.lastName = data.lastName ? data.lastName : '';
    data.email = data.email ? data.email : '';
    data.password = data.password ? data.password : '';
    if (!data.firstName) {
      error.firstName = 'Please enter a valid first name';
      isValid = true;
    }
    if (!data.lastName) {
      error.lastName = 'Please enter a valid last name';
      isValid = true;
    }
    if (!data.email || !validator.isEmail(data.email)) {
      error.email = 'Please enter a valid email';
      isValid = true;
    }
    if (!data.password || !validator.isEmail(data.email)) {
      error.password = 'Please enter a valid email';
      isValid = true;
    }
    if (!data.password || !validator.isLength(data.password, { min: 3 })) {
      error.password = 'Password should be more than exceed 3 characters';
      isValid = true;
    }
    return {
      error,
      isValid
    };
  }

  /**
   * @description method for validation of login input
   * @param  {object} data  body of the user's request
   * @returns {object} The body of the response message
   */
  static validateLoginInput(data) {
    const error = {};
    let isValid = false;

    data.email = data.email ? data.email : '';
    data.password = data.password ? data.password : '';

    if (!data.email) {
      error.email = 'Please enter your registered email';
      isValid = true;
    }

    if (!data.password) {
      error.password = 'Please enter your password';
      isValid = true;
    }

    return {
      error,
      isValid
    };
  }
}
export default UserValidation;
