import * as yup from 'yup';
import { FIRST_NAME_REQUIRED, LAST_NAME_REQUIRED, EMAIL_VALID, EMAIL_REQUIRED } from 'config/messages/errors';

const initialRegistrationFormSchema = yup.object().shape({
  firstName: yup.string().required(FIRST_NAME_REQUIRED),
  lastName: yup.string().required(LAST_NAME_REQUIRED),
  email: yup.string().email(EMAIL_VALID).required(EMAIL_REQUIRED),
});

export default initialRegistrationFormSchema;
