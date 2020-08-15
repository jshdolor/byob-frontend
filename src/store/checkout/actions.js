const DOCUMENT = 'CHECKOUT/';
export const SET_STEP = DOCUMENT + 'SET_STEP';
export const UPDATE_FORM = DOCUMENT + 'UPDATE_FORM';
export const NEXT_STEP = DOCUMENT + 'NEXT_STEP';
export const PREV_STEP = DOCUMENT + 'PREV_STEP';
export const SET_FORM_VALUES = DOCUMENT + 'SET_FORM_VALUES';
export const EDIT_FORM = DOCUMENT + 'EDIT_FORM';

export const setStep = (payload) => ({
    type: SET_STEP,
    payload,
});

export const nextStep = () => ({
    type: NEXT_STEP,
});

export const prevStep = () => ({
    type: PREV_STEP,
});

export const setFormValues = (payload) => ({
    type: SET_FORM_VALUES,
    payload,
});

export const editForm = () => ({
    type: EDIT_FORM,
});

export const updateForm = (key, value) => ({
    type: UPDATE_FORM,
    payload: {
        key,
        value,
    },
});
