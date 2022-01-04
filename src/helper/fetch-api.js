const fetchApi = async (request) => {
    try {
        const res = await fetch("http://localhost:8000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });
        const rsp = await res.json();
        return rsp;
    } catch (err) {
        return err;
    }
}

export default fetchApi
