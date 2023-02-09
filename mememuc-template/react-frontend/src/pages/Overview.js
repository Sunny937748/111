/**
 * References:
 * https://react-bootstrap.github.io/components/navbar/
 * https://www.youtube.com/watch?v=SLfhMt5OUPI
 * https://getbootstrap.com/docs/4.0/layout/media-object/#example
 * https://stackoverflow.com/questions/8919682/remove-all-styling-formatting-from-hyperlinks
 * Endless scroll:
 * https://www.youtube.com/watch?v=xHm6AbNwAw8
 * Sort by Alphabet:
 * https://stackoverflow.com/questions/19259233/sorting-json-by-specific-element-alphabetically
 * Read current URL:
 * https://stackoverflow.com/questions/39823681/read-the-current-full-url-with-react
 * */

import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../styles/overview.css";

function Overview() {
    const [data, setData] = useState([]);
    const [sort, setSort] = useState('default');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const url = window.location.href;
        const suffix = url.substring(url.lastIndexOf('/'), url.length);
        if (suffix === '/') {
            setSort("default");
            fetchPublicMemesSortByDefault();
        } else if (suffix === '/#sort=latest') {
            setSort("latest");
            fetchPublicMemesSortByDate();
        } else if (suffix === '/#sort=title') {
            setSort("title");
            fetchPublicMemesSortByTitle();
        }
    }, [])

    const handleMeme = () => {
        window.localStorage.setItem("memeFrom", "Overview");
    }

    const handleDefault = () => {
        setSort("default");
        fetchPublicMemesSortByDefault();
    }

    const handleLatest = () => {
       setSort("latest");
       fetchPublicMemesSortByDate();
    }

    const handleTitle = () => {
        setSort("title");
        fetchPublicMemesSortByTitle();
    }

    const Meme = ({meme}) => {
        return (
            <div id="singlepost" className="parent-div" key={meme.toString()}>
                <a style={{"all": "unset"}} href={meme.url} onClick={handleMeme}>
                    <div className="media-left">
                        <img className="img-overview" src={meme.img} alt="No image here"/>
                        <div className="media-body">
                            <h5>{meme.title}</h5>
                            <span style={{'fontSize': '12px'}}>by {meme.author}</span>
                        </div>
                    </div>
                </a>
            </div>
        );
    }

    function loadImages(numPost = 10) {
        const container = document.getElementById("container");
        let i = 0;
        while (i < numPost) {
            const img = document.createElement('img');
            img.src = 'http://5b0988e595225.cdn.sohucs.com/images/20200513/d483e2636be940019ef502a47f33c18a.jpeg';
            container.appendChild(img);
            i++;
        }
    }

    // window.addEventListener('scroll', () => {
    //     if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    //         loadImages();
    //     }
    // });

    const fetchPublicMemesSortByDefault = () => {
        fetch("http://localhost:3002/memes/get-public-memes")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data, "getMeme");
            });
    }

    const fetchPublicMemesSortByDate = () => {
        fetch("http://localhost:3002/memes/get-public-memes-sort-by-date")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data, "getMeme");
            });
    }

    const fetchPublicMemesSortByTitle = () => {
        fetch("http://localhost:3002/memes/get-public-memes-sort-by-title")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data, "getMeme");
            });
    }

    return (
        <div>
            <Navbar className="top">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link href="/" onClick={handleDefault}>Default</Nav.Link>
                        <Nav.Link href="/#sort=latest" onClick={handleLatest}>New</Nav.Link>
                        <Nav.Link href="/#sort=title" onClick={handleTitle}>Title</Nav.Link>
                        <NavDropdown
                            title="Sort by"
                            menuVariant="light">
                            <NavDropdown.Item href="/#sort=votes">Votes</NavDropdown.Item>
                            <NavDropdown.Item href="/#sort=views">Views</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>

            {sort === "default" && data && data.map(meme =>
                <Meme key={meme.url}
                      meme={meme}
                />
            )}

            {sort === "latest" && data && data.map(meme =>
                <Meme key={meme.url}
                      meme={meme}
                />
            )}

            {sort === "title" && data && data.map(meme =>
                <Meme key={meme.url}
                      meme={meme}
                />
            )}
        </div>
    );
}

export default Overview;
