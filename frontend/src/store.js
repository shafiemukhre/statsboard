import React, { createContext, useState } from 'react';

export const userContext = createContext()
export const roleContext = createContext()
export const languageContext = createContext()

export default function Store(props){

    const [user, setUser] = useState('')
    const [language, setLanguage] = useState('english')
    const [role, setRole] = useState('datascientist')

    return(
        <userContext.Provider value={[user, setUser]}>
            <roleContext.Provider value={[role, setRole]}>
            <languageContext.Provider value={[language, setLanguage]}>
                {props.children}
            </languageContext.Provider>
            </roleContext.Provider>
        </userContext.Provider>
    )
}

