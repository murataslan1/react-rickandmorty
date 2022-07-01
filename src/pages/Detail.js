import {useEffect, useState} from 'react'

import {useParams, Link} from 'react-router-dom'
import axios from 'axios'

export default function Detail(){

    const [isLoading, setLoading] = useState(true)
    const [character, setCharacter] = useState({})
    const [characterEpisodes, setCharacterEpisodes] = useState({
        isLoading: true,
        list: []
    })

    const {characterId} = useParams()
    const apiUri = `https://rickandmortyapi.com/api/character/${characterId}`
    const episodeApiUri = 'https://rickandmortyapi.com/api/episode/'

    const getCharacterDetail = () => {
        axios.get(apiUri)
            .then(resp=>{
                setLoading(false)
                setCharacter(resp.data)
            }).catch(err=>{
                console.log(err)
            })
    }

    const getCharacterEpisodes = () => {
        const episodeIds = []
        character?.episode.forEach(item=>{
            let episodeId = item.replace('https://rickandmortyapi.com/api/episode/','')
            episodeIds.push(episodeId)
        })
        let episodeUri = `${episodeApiUri}${episodeIds.join(',')}`
        axios.get(episodeUri).then(resp=>{
            setCharacterEpisodes({
                ...characterEpisodes,
                list:resp.data,
                isLoading: false
            })
        })
    }

    const getCharacterOrigin = () => {}


    useEffect(()=>{
        if (!character.id){
            getCharacterDetail()
        } else {
            getCharacterEpisodes()
        }
    },[character])


    const episodeList = characterEpisodes.list.map(item=>{
        return <li key={item.id}>{item.name} - {item.air_date} - ({item.episode})</li>
    })

    return (
    <div className={'detailpage'}>
        <div className={'detail-header'}>
            <Link to={'/'}> &lt; Go Back </Link>
        </div>

        {isLoading && <div className={'loading'}>Sayfa yükleniyor...</div>}


        {!isLoading && <div className={'character-detail'}>
            
            <img src={character?.image} alt={character?.name} />

            <div className={'info'}>
                <h3>{character?.name}</h3>
                <ul>
                    <li>Gender : {character?.gender}</li>
                    <li>Species : {character?.species}</li>
                    <li>Is Allive : {character?.status}</li>
                    <li>Origin : {character?.origin.name}</li>
                    <li>Location : {character?.location.name}</li>
                </ul>

                <h4>Episodes</h4>

                {characterEpisodes.isLoading && <span>Yükleniyor...</span>}

                {!characterEpisodes.isLoading && <ul>
                    {episodeList}
                </ul> }
                
            </div>
        </div>}
    </div>
    )
}