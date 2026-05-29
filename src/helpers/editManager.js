export const EditManager = {

    setEditData: (data) => {
        sessionStorage.setItem('edit_data', JSON.stringify(data));
    },
    
    getEditData: () => {
        const data = sessionStorage.getItem('edit_data');
        return data ? JSON.parse(data) : null;
    },
    clearEditData: () => {
        sessionStorage.removeItem('edit_data');
    }
};