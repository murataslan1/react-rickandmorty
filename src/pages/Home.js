import {useEffect, useState} from 'react'

import {Link} from 'react-router-dom'
import axios from 'axios'

export default function Home(){

    const [characters, setCharacters] = useState([])

    const apiUri = 'https://rickandmortyapi.com/api/character'

    useEffect(()=>{
        axios.get(apiUri).then(resp=>{
            setCharacters(resp.data.results)
        })
    },[])
    

    const characterList = characters.map(item=>{
        
        return <li key={item.id}>
            <Link to={`/character/${item.id}`}>
                <img src={item.image} alt={item.name} />
                <div>
                    <h4>{item.name}</h4>
                    <span>{item.status} - {item.species} - {item.gender}</span>

                    <h5>Location:</h5>
                    <span>{item.location.name}</span>

                    <h5>Origin</h5>
                    <span>{item.origin.name}</span>
                </div>
            </Link>
            </li>
    })

    return (
        <div className={'homepage'}>
            <h3>Rick & Morty Api Example App</h3>
            <ul className={'cards'}>
                {characterList}
            </ul>
        </div>
        
    )
}