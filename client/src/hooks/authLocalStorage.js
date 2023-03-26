import { useState } from "react";


export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const data = localStorage.getItem(key)

        return (data && data !== undefined) ? JSON.parse(data) : defaultValue
    })

    const setLocalStorage = (newValue) => {
        if (newValue === undefined) {
            newValue = {}
        }

        newValue.email
            ? newValue = {
                username: newValue.username,
                email: newValue.email,
                _id: newValue._id,
                accessToken: newValue.accessToken
            } : newValue = {}

        localStorage.setItem(key, JSON.stringify(newValue))
        setValue(newValue)
    }
    return [value, setLocalStorage]
}
