import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const API_KEY = "7dd16618bbddb6bd3f6e2bad125ac89b"; // Replace with your valid API key

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?api_key=${API_KEY}&language=en-US&page=1`,
          options
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setApiData(data.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    if (cardsRef.current) {
      cardsRef.current.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category]); // Depend on `category` to refetch when it changes

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) => (
          <Link to={`/player/${card.id}`} className="card" key={card.id}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
