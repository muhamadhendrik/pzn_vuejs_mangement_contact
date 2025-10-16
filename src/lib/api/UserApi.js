const apiPath = import.meta.env.VITE_API_PATH;
export const userRegister = async ({username, password, name}) => {
    return await fetch(`${apiPath}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
            name,
        })
    })
}

export const userLogin = async ({username, password}) => {
    return await fetch(`${apiPath}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        })
    })
}

export const userDetail = async (token) => {
    return await fetch(`${apiPath}/users/current`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': token,
        }
    })
}

export const userUpdateProfile = async ({name, token}) => {
    return await fetch(`${apiPath}/users/current`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
            name,
        })
    })
}

export const userUpdatePassword = async ({password, token}) => {
    return await fetch(`${apiPath}/users/current`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
            password,
        })
    })
}

export const userLogout = async ({token}) => {
    return await fetch(`${apiPath}/users/logout`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': token,
        },
    })
}