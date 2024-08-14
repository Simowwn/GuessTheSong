import React from "react";
import { Card } from "react-bootstrap";

function Player({ track }) {
  if (!track) return null;

  return (
    <Card className="mb-4">
      <Card.Body className="text-center">
        <Card.Title>Now Playing: {track.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          By: {track.artists.map((artist) => artist.name).join(", ")}
        </Card.Subtitle>
        {track.preview_url ? (
          <audio controls autoPlay className="w-100 mt-3">
            <source src={track.preview_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <p>Preview not available</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default Player;
