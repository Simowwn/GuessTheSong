import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Player from "./Player";

const CLIENT_ID = "da7a3cc4972d46fc976b1007505e2510";
const CLIENT_SECRET = "d4202fcb54b1487aaef818553940357a";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(() => {
    // Fetch API Access Token
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token)); // Store the access token
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchTracks();
    }
  }, [accessToken]);

  const fetchTracks = async () => {
    const playlistID = "37i9dQZF1DXcBWIGoYBM5M"; // Example: "Today's Top Hits" playlist ID
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const fetchedTracks = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => data.items.map((item) => item.track)); // Extract the track information

    setTracks(fetchedTracks);
    selectRandomTrack(fetchedTracks); // Play a random track on load
  };

  const selectRandomTrack = (tracks) => {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    setSelectedTrack(tracks[randomIndex]);
  };

  const playRandomTrack = () => {
    selectRandomTrack(tracks);
  };

  return (
    <div className="App">
      <Container className="text-center mt-5">
        <h1 className="mb-4">Random Song Player</h1>
        {selectedTrack && <Player track={selectedTrack} />}
        <Button variant="primary" onClick={playRandomTrack}>
          Play Another Random Song
        </Button>
      </Container>
    </div>
  );
}

export default App;
