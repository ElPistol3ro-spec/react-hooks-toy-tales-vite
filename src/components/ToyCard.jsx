import React from "react";

function ToyCard({ toy, onDeleteToy, onUpdateToy }) {
  const { name, image, likes } = toy;

  function handleLikeClick() {
    const updatedLikes = {
      likes: likes + 1
    }

    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedLikes)
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        onUpdateToy(updatedToy);
      });
  }

  function handleDeleteClick() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    })
      .then((response) => {response.json()
        .then(() => {
          onDeleteToy(toy.id);
        });
      });
  }
  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDeleteClick}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
