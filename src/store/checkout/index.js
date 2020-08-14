import * as actions from './actions';
import { CLAIMING_METHOD, CHECKOUT_STEPS } from '../../config/checkout';
const init = {
    currentStep: 0,
    steps: [
        { id: 0, title: CHECKOUT_STEPS.CART },
        { id: 1, title: CHECKOUT_STEPS.INFORMATION },
        { id: 2, title: CHECKOUT_STEPS.PAYMENT },
    ],
    isFormSaved: false,
    informationEditing: false,
    formValues: {
        email: '',
        firstName: '',
        lastName: '',
        mobileNumber: '',
        claimingMethod: CLAIMING_METHOD.BYOB,
        lockerDate: '',
        lockerTime: '',
        paymentMethod: 'paypal',
    },
    isLoading: '',
};

export default (state = init, { type, payload }) => {
    switch (type) {
        case actions.SET_STEP:
            return {
                ...state,
                currentStep: payload,
            };
        case actions.EDIT_FORM:
            return {
                ...state,
                informationEditing: !state.informationEditing,
            };
        case actions.SET_FORM_VALUES:
            return {
                ...state,
                formValues: { ...state.formValues, ...payload },
                isFormSaved: true,
            };
        case actions.NEXT_STEP:
            return {
                ...state,
                currentStep: ++state.currentStep,
            };
        case actions.PREV_STEP:
            console.log('here');
            return {
                ...state,
                currentStep: --state.currentStep,
            };
        case actions.UPDATE_FORM:
            const { key, value } = payload;
            return {
                ...state,
                formValues: {
                    ...state.formValues,
                    [key]: value,
                },
            };
        default:
            return state;
    }
};
