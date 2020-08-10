export const PASSWORD_FORMAT = /(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}$)/;
export const EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const MOBILE_NUMBER = /^(09)\d{9}$/;
export const MOBILE_NUMBER_NO_ZERO = /^(9)\d{9}$/;
export const NUMBERS_ONLY = /[0-9]+/;

export default {
  PASSWORD_FORMAT,
  EMAIL,
  MOBILE_NUMBER,
};
