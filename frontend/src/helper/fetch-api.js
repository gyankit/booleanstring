const fetchApi = async (request, token) => {
    //const url = "http://localhost:8000/api/graphql";
    const url = "http://boolean-string.herokuapp.com/api/graphql";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request)
    }
    if (token) {
        options.headers = {
            ...options.headers,
            "Authorization": token
        }
    }
    try {
        const res = await fetch(url, options);
        const rsp = await res.json();
        return rsp;
    } catch (err) {
        return err;
    }
}

export default fetchApi
