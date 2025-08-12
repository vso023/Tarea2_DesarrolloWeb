import React from 'react';
import '../styles/Cards.css';

const songs = [
  {
    id: 1,
    title: "Caramel",
    artist: "Sleep Token",
    cover: "https://i.scdn.co/image/ab67616d0000b273472a18af4551b76033f534e0",
    audio: "https://www.youtube.com/watch?v=4iSvoQNfrrk&list=RD4iSvoQNfrrk&start_radio=1"
  },
  {
    id: 2,
    title: "A Little Death",
    artist: "The Neighborhood",
    cover: "https://s.mxmcdn.net/images-storage/albums/2/9/2/6/3/8/26836292_500_500.jpg",
    audio: "https://www.youtube.com/watch?v=bRfMwoIizTQ&list=RDbRfMwoIizTQ&start_radio=1"
  },
  {
    id: 3,
    title: "Track 10",
    artist: "Charli XCX",
    cover: "https://i.scdn.co/image/ab67616d0000b273ec1bc2abea061f5f09fa9b64",
    audio: "https://www.youtube.com/watch?v=Rj6dwEBmBJA"
  }
];

function Cards() {
  return (
    <div className="cards-container">
      {songs.map(song => (
        <div key={song.id} className="card">
          <img src={song.cover} alt={song.title} />
          <h3>{song.title}</h3>
          <p>{song.artist}</p>
          <audio controls>
            <source src={song.audio} type="audio/mpeg" />
          </audio>
        </div>
      ))}
    </div>
  );
}

export default Cards;
