import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../../store';

export default function useUsers(){
    const [data, setData] = useState([])
    const [username] = useContext(userContext)

    useEffect(() => {
        let controller = new AbortController()

        function fetchData(){
            const localhost = 'http://127.0.0.1:5000'
            const endpoint = '/api/users'
            const url = `${localhost}${endpoint}`
            const requestOptions = {
                method: 'GET',
            }
            fetch(url, requestOptions)
            .then( response => response.json())
            .then(data => {
                //make sure it is an array
                // console.log(typeof data.users)
                setData(data.users)
            })
            .catch((error) => console.log(error))
        }
        fetchData()

        return (() => {
            controller.abort()
        })
    },[])
    return data
}