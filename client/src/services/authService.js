const baseUrl = 'http://localhost:3030/users'


export const authLogin = async (data) => {
    try {
       
        const response = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
      
        return result

    } catch (error) {
     
        return error
    }
}


export const authRegister = async (data) => {
    try {
        const response = await fetch(`${baseUrl}/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        return result
    } catch (error) {
        return error
    }
}

export const authLogout = async() => {
    await fetch(`${baseUrl}/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },    
    })
  }