import { useState, useEffect } from "react"
import api from "../Services/api"
import "../Styles/Components/busca.css"

const Busca = () =>{
    const [ busca, setBusca ] = useState("")
    const [ repos, setRepos ] = useState([])
    const [ btnVisible, setBtnVisible ] = useState (false)
    
    useEffect(()=>{
        async function getData(){
            const response = await api.get(`${busca}/repos`)
            const data = await response.data

            if(busca!==""){
                setRepos(data)
            }
        }
        getData()

    }, [busca] )

    function handleBusca(e){
        setBusca(e.target.value)
        setBtnVisible(true)
    }

    function handleParams(){
        setRepos([])
        setBtnVisible(false)
    }

    return (
        <div id="container">
            <h1>Busca Repos</h1>
            <p>Insira seu user do GitHub e veja seus repositórios</p>
            <input
               type="text"
               placeholder="Digite seu user"
               onChange = {(handleBusca)}
            />

            <ul>
                {repos.map(repo=>{
                    return <li key={repo.id}>{repo.name}</li>
                })}
                {btnVisible && <button onClick={handleParams}>Limpar Repos</button>}

            </ul>
        
        </div>

    )
}

export default Busca