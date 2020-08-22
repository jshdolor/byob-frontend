import { Formik } from 'formik';
import ContactFormSchema from 'config/forms/schema/ContactFormSchema';
import { Form, Input } from 'formik-antd';
import { Button, Spin, Modal } from 'antd';
const { TextArea } = Input;
import { useSelector } from 'react-redux';
import ContactUsRequest from '~/services/Contact/requests/ContactUsRequest';
import ContactUsService from '~/services/Contact/ContactUsService';
import { useState, useEffect } from 'react';
import ProfileService from '~/services/ProfileService';

const ContactForm = () => {
  const [apiMsg, setApiMsg] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [readonlyField, setReadonlyField] = useState(false);
  const [initialData, setInitialData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { isLoggedIn } = useSelector((state) => state.session);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        setReadonlyField(true);
        const { name, email } = await ProfileService.get();
        setInitialData({ name, email, message: '' });
      })();
    }
  }, []);

  const handleFormSubmit = async (values, resetForm) => {
    const request = new ContactUsRequest(values);
    setIsSubmitting(true);
    try {
      const data = await ContactUsService.send(request);
      console.log(data);
      setApiMsg({
        visible: true,
        message: { success: true, messages: 'Sent!' },
      });

      resetForm(initialData);
    } catch (e) {
      const errors = e.getErrors();
      setApiMsg({
        visible: true,
        message: { success: false, messages: errors },
      });
    }
    setIsSubmitting(false);
  };

  const handleOk = () => {
    setApiMsg({});
  };

  return (
    <>
      {apiMsg.visible ? (
        <div className='success-cont'>
          <h1 className='title'>Sent!</h1>
          <p>Thank you. Your message is sent to our team. We will be reviewing it as soon as possible.</p>
          <p>We will get back to you as soon as possible</p>
        </div>
      ) : (
        <Spin spinning={isSubmitting}>
          <h4 className='contact-title'>Contact</h4>
          <p>Questions? Inquiries? Compliments?</p>
          <Formik enableReinitialize={true} initialValues={initialData} validationSchema={ContactFormSchema} onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}>
            <Form>
              <Form.Item name='name'>
                <Input name='name' placeholder='Name*' readOnly={readonlyField} />
              </Form.Item>

              <Form.Item name='email'>
                <Input name='email' placeholder='Email*' readOnly={readonlyField} />
              </Form.Item>

              <Form.Item name='message'>
                <TextArea name='message' placeholder='Message*' autoSize={{ minRows: 4, maxRows: 6 }} />
              </Form.Item>

              <p className='contact-terms'>
                By clicking the "Submit" button, I hereby agree to the use of my Customer Information as provided in its <a href='#'> Privacy Policy</a>
              </p>
              <Button type='primary' htmlType='submit' className='submit-btn'>
                Submit
              </Button>
            </Form>
          </Formik>
        </Spin>
      )}
    </>
  );
};

export default ContactForm;
