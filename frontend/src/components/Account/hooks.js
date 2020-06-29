import React, { useState, useEffect } from 'react';

export default function useProfile(){
    const [data, setData] = useState()

    useEffect(() => {
        function fetchData(){
            const localhost = ''
            const endpoint = ''
            const url = localhost + endpoint
            const requestOptions = {
                method: 'GET',
            }
            fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.log(error))
        }

        fetchData()

    },[])
}