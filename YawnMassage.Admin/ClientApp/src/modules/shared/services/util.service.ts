import { localise } from "src/modules/shared/services";

export const utilityService = {
  validateEmail,
  validateSMS
};

function validateEmail(value: string) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? localise("ERROR_INVALID_EMAIL_ADDRESS") : undefined;
}

function validateSMS(value: string) {
  return value && !/^\+?([0-9]{12})$/i.test(value)
    ? localise("ERROR_INVALID_PHONE_NUMBER") : undefined;
}
