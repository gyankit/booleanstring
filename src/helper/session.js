export const getSession = () => {
    let user = {};
    user._id = sessionStorage.getItem('_id');
    user.type = sessionStorage.getItem('type');
    user.token = sessionStorage.getItem('token');
    user.expire = sessionStorage.getItem('tokenExpire');
    user.loginTime = sessionStorage.getItem('loginTime');
    return user;
}

export const setSession = (user) => {
    sessionStorage.setItem('_id', user._id);
    sessionStorage.setItem('type', user.type);
    sessionStorage.setItem('token', user.token);
    sessionStorage.setItem('tokenExpire', user.tokenExpire);
    sessionStorage.setItem('loginTime', user.loginTime);
}

export const unSetSession = () => {
    sessionStorage.removeItem('_id');
    sessionStorage.removeItem('type');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tokenExpire');
    sessionStorage.removeItem('loginTime');
}

export const isSessionSet = () => {
    const user = getSession();
    if (user.id === null || user.type === null || user.token === null || user.expire === null || user.loginTime === null) {
        return false;
    }
    return true;
}

