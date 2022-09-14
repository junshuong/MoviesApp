import React, { useState, useReducer, useEffect } from "react";
import { getMovies } from "../api/movie-api";

export const MoviesContext = React.createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "load":
      return { movies: action.payload.result};
    default:
      return state;
  }
};

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} )
  const [favorites, setFavorites] = useState( [] )
  const [watchlist, setWatchlist] = useState( [] )  // Add state variable - Watchlist 
  const [state, dispatch] = useReducer(reducer, { movies: []});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    getMovies().then(result => {
      console.log(result);
      dispatch({ type: "load", payload: {result}});
    });
  },[]);

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    setFavorites(newFavorites)
  };

  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  // function to update Watchlist state variable
  const addToWatchlist = (movie) => {
    let newWatchlist = [];
    if (!watchlist.includes(movie.id)){
      newWatchlist= [...watchlist, movie.id];
      console.log(movie);
    }
    setWatchlist(newWatchlist)
  }

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        setAuthenticated,
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToWatchlist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;