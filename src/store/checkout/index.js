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
        firstname: '',
        lastname: '',
        mobile_number: '',
        claimingMethod: CLAIMING_METHOD.BYOB,
        lockerDate: '',
        lockerTime: '',
        lockerTimeText: '',
        payment_gateway: 'paypal',
        pickup_type: '',
        lockers: {
            date: '',
            schedule_id: '',
        },
    },
    isLoading: false,
    pickupType: 'booth',
    discount: {},
    hasErrors: false,
};

export default (state = init, { type, payload }) => {
    switch (type) {
        case actions.SET_PICKUPTYPE:
            return {
                ...state,
                pickupType: payload,
            };
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
        case actions.START_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case actions.STOP_LOADING:
            return {
                ...state,
                isLoading: false,
            };

        case actions.APPLY_DISCOUNT:
            return {
                ...state,
                discount: payload,
            };

        case actions.HAS_ERRORS:
            return {
                ...state,
                hasErrors: true,
            };
        default:
            return state;
    }
};
