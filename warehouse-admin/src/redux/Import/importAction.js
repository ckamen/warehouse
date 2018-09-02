export const types = {
    IMPORT_MODAL_UPDATE: 'IMPORT_MODAL_UPDATE',
}


export const updateImportModal = data => dispatch => (dispatch({
    type: types.IMPORT_MODAL_UPDATE,
    data
}));

