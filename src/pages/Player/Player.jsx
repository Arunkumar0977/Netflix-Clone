import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_KEY = "7dd16618bbddb6bd3f6e2bad125ac89b"; // Replace with your valid API key

  const [apiData, setApiData] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
          options
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setApiData(data.results[0]); // Set first available video
        } else {
          console.warn("No video found for this movie.");
          setApiData(null);
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
        setApiData(null);
      }
    };

    fetchVideo();
  }, [id]); // Depend on `id` to refetch when it changes

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-1)} />
      
      {apiData ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title={apiData.name}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No trailer available</p>
      )}

      <div className="player-info">
        <p>{apiData?.published_at ? apiData.published_at.slice(0, 10) : "N/A"}</p>
        <p>{apiData?.name || "Unknown"}</p>
        <p>{apiData?.type || "N/A"}</p>
      </div>
    </div>
  );
};

export default Player;
