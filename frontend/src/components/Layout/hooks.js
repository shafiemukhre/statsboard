import React, { useState, useEffect } from 'react';

export default function useData(){
    const [data, setData] = useState([])
    useEffect(() => {
        const localhost = 'http://localhost'
        const endpoint = '/rutuja/notebooklist'
        const url = `${localhost}:5000${endpoint}`
        fetch(url)
        .then(response => response.json())
        .then(data => setData(data))
    },[])
    return data
}