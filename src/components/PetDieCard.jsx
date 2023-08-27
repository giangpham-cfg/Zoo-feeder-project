import "./PetDieCard.css";

function PetDieCard({ pet }) {
  return (
    <div className="pet-die">
      <div className="pet-container">
        <div className="icon-die">{pet.icon}</div>
        <h3 className="name">{pet.name}</h3>
        <p className="word">{pet.goodbye}</p>
      </div>
    </div>
  );
}

export default PetDieCard;
