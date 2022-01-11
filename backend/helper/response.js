module.exports = {
    singleResponse: (res) => {
        const response = {
            ...res._doc,
            _id: res.id,
            password: null
        }
        // console.log(response);
        return response;
    },

    multiResponse: (resArray) => {
        const response = resArray.map(res => {
            return {
                ...res._doc,
                _id: res.id,
                password: null
            }
        });
        // console.log(response);
        return response;
    }
}