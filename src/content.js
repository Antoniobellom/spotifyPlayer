import react, { useState, useEffect, useRef } from 'react';

const Content = () => {
    const [url] = useState();
    const [songMap, setSongMap] = useState({});
    const [playList, setPlayList] = useState(" ");
    const [setId, setSetId] = useState(1)
    const [boton, setBoton] = useState(false)
    const [song, setSong] = useState(
        [

        ]
    )
    let audioRef = useRef(null);

    const player = (item) => {
        if (audioRef.src === "https://assets.breatheco.de/apis/sound/" + item) {
            audioRef.play();
        } else {
            audioRef.src = "https://assets.breatheco.de/apis/sound/" + item;
            audioRef.play();
        }
        setBoton(true)


    }
    const Pause = (item) => {
        setBoton(false)
        audioRef.pause();

    }
    const fwd = (id, song) => {
        const nextSong = songMap[id + 1] ? songMap[id + 1] : songMap[1]
        audioRef.src = "https://assets.breatheco.de/apis/sound/" + nextSong;
        setPlayList(song)
        setSetId(songMap[id + 1] ? id + 1 : 1)
        audioRef.play()

    }
    const bcw = (id, song) => {
        const nextSong = songMap[id - 1]
        audioRef.src = "https://assets.breatheco.de/apis/sound/" + nextSong;
        setPlayList(song)
        setSetId(id - 1)
        audioRef.play()

    }


    useEffect(() => {
        getSongs(url)
    }, [])

    const getSongs = async (url) => {
        try {
            const response = await fetch("https://assets.breatheco.de/apis/sound/songs", {
                method: "GET",
                headers: {
                    "Content-Type": "aplication/json"
                }
            })
            const data = await response.json();
            setSong(data)
            const objetoVacio = {

            }
            data.map((cancion) => {
                objetoVacio[cancion.id] = cancion.url

            })
            setSongMap(objetoVacio)
        }
        catch (error) { console.log(error) }
    }
    return (
        <>
            <div className="list-group fondo">
                    {
                        song.length === 0 ? "Cargando" : song.map((songs, i) => {
                            return <button type="button" className=" btn btn-outline-secondary bg-dark  w-25 align-self-center mt-3 canciones"onClick={() => { player(songs.url); setPlayList(songs.url) }} key={songs.id}>{songs.name}</button>
                        }
                        )
                    }
                
            </div>
            
                <div className="justify-content-center fixed-bottom navbar navbar-dark bg-dark">
                    <button className="nav-item bg-dark text-white">
                        <a className="nav-link " href="#" onClick={() => { bcw(setId, song[setId - 1]) }} ><i className="fas fa-backward text-white fa-1x"></i></a>
                    </button>
                    {
                        boton ? (<button className="nav-item bg-dark text-white">
                            <a className="nav-link" href="#" onClick={() => { Pause(playList) }}><i className="fas fa-pause text-white fa-1x"></i></a>
                        </button>) : (<button className="nav-item bg-dark text-white">
                            <a className="nav-link" href="#" onClick={() => { player(playList) }}><i className="fas fa-play text-white fa-1x"></i></a>
                        </button>)
                    }

                    <button className="nav-item bg-dark text-white">
                        <a className="nav-link" href="#" onClick={() => { fwd(setId, song[setId + 1]) }}><i className="fas fa-forward text-white fa-1x"></i></a>
                    </button>

                </div>
            
            <audio src="" ref={(elm) => (audioRef = elm)} />
        </>

    );
};
export default Content;