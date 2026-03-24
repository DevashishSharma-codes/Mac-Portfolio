import React from 'react'
import githubData from "../../assets/github.json"
import MacWindow from './MacWindow'
import "./Github.scss"

const GitCard = ({data}) => {
    return <div className="card">

        <img src={data.image} alt="" />
        <h1>{data.title}</h1>
        <p className='description' >{data.description}</p>

        <div className="tags">
            {
                data.tags.map(tag => <p className='tag' >{tag}</p>)
            }
        </div>

        <div className="urls">
            <a href={data.repoLink}>Repository</a>
            {data.demoLink && <a href={data.demoLink}>Demo link</a>}
        </div>
    </div>
}


const Github = ({ windowName, setWindowsState }) => {
    return (
        <MacWindow windowName={windowName} setWindowsState={setWindowsState} >
            <div className="cards">
                {githubData.map(project => {
                    return <GitCard data={project} />
                })}
            </div>
        </MacWindow>
    )
}

export default Github