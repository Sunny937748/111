/**
 * setState Callback in a Class Component works:
 * https://upmostly.com/tutorials/how-to-use-the-setstate-callback-in-react
 * Query:
 * https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
 * */

import React from "react";
import "../styles/general.css";
import "../styles/overview.css";

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            memes: [],
        };

        this.getMemesByUser = this.getMemesByUser.bind(this);
        this.handleMeme = this.handleMeme.bind(this);
        this.Meme = this.Meme.bind(this);
    }

    componentDidMount() {
        const loggedUsername = localStorage.getItem("loggedUsername");
        this.getMemesByUser(loggedUsername);
    }

    getMemesByUser(username) {
        console.log(username, ', username');

        fetch(`http://localhost:3002/memes/get-memes/?username=${username}`)
            .then((res) => res.json())
            .then((data) => {
                this.setState({memes: data});
                console.log( this.state.memes.length);
                console.log(data, "getMemeBySomeone");
            });

    }

    handleMeme() {
        localStorage.setItem("memeFrom", "History");
    }

    Meme = ({meme}) => {
        return (
            <div id="singlepost" className="parent-div" key={meme.toString()}>
                <a style={{"all": "unset"}} href={meme.url} onClick={this.handleMeme}>
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

    render() {
        return (
            <div>
                {this.state.memes.length === 0 && <p className="no-meme-text">You haven't created any memes yet, try to create some with one of the generators in the "Create" dropdown using your creativity!</p>}
                {this.state.memes.length > 0 && this.state.memes.map(meme => {
                   return <this.Meme key={meme.url}
                          meme={meme}
                    />
                })}
            </div>
        );
    }
}

export default History;
