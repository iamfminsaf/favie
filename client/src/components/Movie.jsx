import { useState } from "react";
import posterTemp from "../img/temp.png";
import axios from "axios";

export const Movie = (probs) => {
    const { title, poster, rate, genre, like, _id } = probs.data;
    const deleteData = probs.fun;

    const [movieLike, setMovieLike] = useState(like);

    const putLike = async () => {
        const newLike = await axios
            .put(`https://favie-server.onrender.com/data/${_id}`)
            .then((res) => {
                return res.data.like;
            });
        setMovieLike(newLike);
    };

    return (
        <div className="movie">
            <img src={poster || posterTemp} alt="thump" />
            <h2>{title}</h2>
            <span>{rate}</span>
            <ul>
                {genre.map((genre, index) => {
                    return <li key={index}>{genre}</li>;
                })}
            </ul>
            <div className="buttons">
                <button onClick={putLike} className="btn like-btn">
                    {movieLike} Likes
                </button>
                <button
                    className="btn delete-btn"
                    onClick={() => deleteData(_id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};
