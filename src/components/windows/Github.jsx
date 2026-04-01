import React, { useState, useEffect } from 'react'
import MacWindow from './MacWindow'
import "./Github.scss"

const GitCard = ({ data }) => {

    const [imgSrc, setImgSrc] = useState(
        `https://opengraph.githubassets.com/1/${data.full_name}`
    );

    const tags = [];

    if (data.language) tags.push(data.language);

    if (data.topics && Array.isArray(data.topics)) {
        tags.push(...data.topics);
    }

    const fallbackImage = data.owner?.avatar_url;

    return (
        <div className="card">

            <img
                src={imgSrc}
                alt={`${data.name} cover`}
                style={{
                    width: "100%",
                    borderRadius: "1rem",
                    aspectRatio: "1200/630",
                    objectFit: "cover"
                }}
                onError={() => setImgSrc(fallbackImage)}
            />

            <h1>{data.name}</h1>

            <p className='description'>
                {data.description || "No description provided."}
            </p>

            <div className="tags">
                {tags.slice(0, 4).map((tag, index) => (
                    <p key={index} className='tag'>{tag}</p>
                ))}
            </div>

            <div className="urls">

                <a
                    href={data.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Repository
                </a>

                {data.homepage && data.homepage !== "" && (
                    <a
                        href={data.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Demo link
                    </a>
                )}

            </div>

        </div>
    );
};


const Github = ({ windowName, setWindowsState }) => {

    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch('https://api.github.com/users/DevashishSharma-codes/repos?sort=updated&per_page=12')
            .then(res => res.json())
            .then(data => {

                if (Array.isArray(data)) {
                    setRepos(data);
                } else {
                    setRepos([]);
                }

                setLoading(false);
            })
            .catch(error => {

                console.error("Error fetching GitHub repos:", error);
                setLoading(false);

            });

    }, []);


    return (
        <MacWindow windowName={windowName} setWindowsState={setWindowsState}>

            <div className="cards">

                {loading ? (

                    <div
                        style={{
                            color: "white",
                            padding: "2rem",
                            textAlign: "center",
                            width: "100%"
                        }}
                    >
                        Fetching repositories from GitHub...
                    </div>

                ) : (

                    repos.map(project => (
                        <GitCard key={project.id} data={project} />
                    ))

                )}

                {!loading && repos.length === 0 && (

                    <div
                        style={{
                            color: "white",
                            padding: "2rem",
                            textAlign: "center",
                            width: "100%"
                        }}
                    >
                        No repositories found or API rate limit exceeded.
                    </div>

                )}

            </div>

        </MacWindow>
    )
}

export default Github