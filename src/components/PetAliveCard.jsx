import React from "react";
import "./PetAliveCard.css";

function PetAliveCard({ pet, handleFeedMe, handleClickLove }) {
  return (
    <div className="pet">
      <div className="icon" onClick={() => handleClickLove(pet.id)}>
        {pet.icon}
      </div>
      <div className="pet-info">
        <h4 className="name-alive">{pet.name}</h4>
        <div className="hunger">
          <meter
            value={pet.hunger}
            min="0"
            max="100"
            className="hunger-meter"
          ></meter>
          <button onClick={() => handleFeedMe(pet.id)}>Feed me 🍞</button>
        </div>
        <div className="love">
          <meter
            value={pet.love}
            min="0"
            max="100"
            className="love-meter"
          ></meter>
          <p className="heart" onClick={() => handleClickLove(pet.id)}>
            ❤️
          </p>
        </div>
      </div>
    </div>
  );
}

export default PetAliveCard;
