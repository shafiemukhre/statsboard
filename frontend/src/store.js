import React, { createContext, useState } from 'react';

export const languageContext = createContext()
export default function Store(props){
    const [language, setLanguage] = useState('english')

    return(
        <languageContext.Provider value={[language, setLanguage]}>
            {props.children}
        </languageContext.Provider>
    )
}

