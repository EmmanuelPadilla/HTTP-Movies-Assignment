import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const EditMovie = (props) => {
  const { movieList, setMovieList, getMovieList } = props;
  const [formEntries, setFormEntries] = useState(initialMovie);
  const [movieTitle, setTitle] = useState();

  const { id } = useParams();
  const { push } = useHistory();

  const changeHandler = (ev) => {
    const { name, value } = ev.target;

    setFormEntries({ ...formEntries, [name]: value });
  };

  const updateActors = (e) => {
    const theActors = { ...formEntries, stars: theActors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${formEntries.id}`, formEntries)
      .then((response) => {
        console.log("Testing new Movie data:", response.data);
        getMovieList();
        push("/"); //Goes back to list of movies
      })
      .catch((submitError) => {
        console.log("Error submitting new Movie");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3333/api/movies/${id}`)
      .then((res) => {
        setFormEntries(res.data);
        setTitle(res.data.title);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Movie Name"
          value={formEntries.name}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={formEntries.director}
        />
        <div className="baseline" />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={formEntries.metascore}
        />
        <div className="baseline" />

        {formEntries.stars.map(billing => {
                    return (
                        <div>
                            <div>
                                <label>Actor:</label>
                            </div>
                            <div>
                            <input 
                            type='text' 
                            name='stars' 
                            value={billing} 
                            onChange={updateActors} 
                            />
                            </div>

        <div className="baseline" />

        <button className="md-button form-button">Update Movie</button>
        </div>
                    )
  </form>
  </div>
  );
};

export default EditMovie;
