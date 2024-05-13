import axios from "axios";
import { Movie } from "./components/Movie";
import { useEffect, useState } from "react";

const App = () => {
    const [datas, setDatas] = useState([]);

    const getDatas = async () => {
        await axios
            .get("https://favie-server.onrender.com/data")
            .then((res) => {
                setDatas(res.data);
            });
    };

    useEffect(() => {
        getDatas();
    }, []);

    const deleteData = async (id) => {
        await axios
            .delete(`https://favie-server.onrender.com/data/${id}`)
            .then((res) => {
                setDatas(res.data);
            });
    };

    const tryAddData = () => {
        const form = document.getElementById("form");
        const app = document.getElementById("app");
        app.style.opacity = "10%";
        form.style.display = "flex";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target.elements.title.value;
        const rate = e.target.elements.rate.value;
        const genre = e.target.elements.genre.value.split(" ");
        console.log(genre);
        await axios
            .post("https://favie-server.onrender.com//data", {
                title,
                rate,
                genre,
            })
            .then((res) => {
                setDatas(res.data);
            });
        const form = document.getElementById("form");
        const app = document.getElementById("app");
        app.style.opacity = "100%";
        form.style.display = "none";
    };

    return (
        <>
            <form
                id="form"
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <h2>Add new Movie</h2>
                <input
                    type="text"
                    placeholder="Title"
                    className="title-input"
                    name="title"
                />
                <input
                    type="number"
                    className="rate-input"
                    placeholder="Rating"
                    name="rate"
                />
                <input
                    type="text"
                    className="genre-input"
                    placeholder="Genres"
                    name="genre"
                />
                <button type="submit">Add</button>
            </form>
            <div className="app" id="app">
                <h1>Movies</h1>
                <div className="header-input">
                    <input
                        type="search"
                        name="search"
                        className="search"
                        placeholder="Search movies.."
                    />
                    <button className="btn add-btn" onClick={tryAddData}>
                        Add New
                    </button>
                </div>
                <div className="movies">
                    {datas.map((data) => {
                        return (
                            <Movie
                                key={data._id}
                                data={data}
                                fun={deleteData}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default App;
