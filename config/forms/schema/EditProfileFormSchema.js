import * as yup from 'yup';
import { FIRST_NAME_REQUIRED, LAST_NAME_REQUIRED, EMAIL_VALID, EMAIL_REQUIRED, MOBILE_REQUIRED, MOBILE_FORMAT } from 'config/messages/errors';
import { MOBILE_NUMBER } from '../regex';

const EditProfileFormSchema = yup.object().shape({
  firstName: yup.string().required(FIRST_NAME_REQUIRED),
  lastName: yup.string().required(LAST_NAME_REQUIRED),
  email: yup.string().email(EMAIL_VALID).required(EMAIL_REQUIRED),
  mobileNumber: yup.string().matches(MOBILE_NUMBER, MOBILE_FORMAT).required(MOBILE_REQUIRED),
});

export default EditProfileFormSchema;
