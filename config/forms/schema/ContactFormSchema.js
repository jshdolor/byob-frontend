import * as yup from 'yup';
import { NAME_REQUIRED, EMAIL_VALID, EMAIL_REQUIRED, MESSAGE_REQUIRED } from 'config/messages/errors';

const ContactFormSchema = yup.object().shape({
  name: yup.string().required(NAME_REQUIRED),
  email: yup.string().email(EMAIL_VALID).required(EMAIL_REQUIRED),
  message: yup.string().required(MESSAGE_REQUIRED),
});

export default ContactFormSchema;
