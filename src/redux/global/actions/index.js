import * as types from './types';

export const isLoading = (isLoading) => ({
    type: types.IS_LOADING,
    payload: isLoading
})