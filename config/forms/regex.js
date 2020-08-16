export const PASSWORD_FORMAT = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>?]).{8,16}$/;
export const EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const MOBILE_NUMBER = /^(09)\d{9}$/;
export const MOBILE_NUMBER_NO_ZERO = /^(9)\d{9}$/;
export const NUMBERS_ONLY = /[0-9]+/;
export const SPECIAL_CHARACTERS = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

export default {
  PASSWORD_FORMAT,
  EMAIL,
  MOBILE_NUMBER,
};
