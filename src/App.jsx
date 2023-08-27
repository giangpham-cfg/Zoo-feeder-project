import { useEffect, useState } from "react";
import "./App.css";
import PetAliveCard from "./components/PetAliveCard";
import PetDieCard from "./components/PetDieCard";
import { goodbyeWord, petEmojis, petNames } from "./lib";

function App() {
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Barney",
      icon: "🐍",
      isAlive: true,
      hunger: 0,
      goodbye:
        "In their memory, let us strive to be as compassionate as they were.",
      love: 100,
    },
  ]);

  const petsAlive = pets.filter((pet) => pet.isAlive === true);

  useEffect(() => {
    if (petsAlive.length === pets.length) {
      let interval = setInterval(() => {
        //create an object that present a new pet
        const pet = {
          id: pets.length + 1,
          name: petNames[Math.floor(Math.random() * petNames.length)],
          icon: petEmojis[Math.floor(Math.random() * petEmojis.length)],
          isAlive: true,
          hunger: 0,
          goodbye: goodbyeWord[Math.floor(Math.random() * goodbyeWord.length)],
          love: 100,
        };
        setPets((prevPets) => [...prevPets, pet]);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [petsAlive.length, pets.length]);

  //hunger meter
  useEffect(() => {
    const hungerInterval = setInterval(() => {
      setPets((prevpets) => {
        const updatedPets = prevpets.map((pet) => {
          if (pet.hunger === 100) {
            return { ...pet, isAlive: false };
          }
          if (0 <= pet.hunger < 100) {
            return { ...pet, hunger: pet.hunger + 1 };
          }
        });
        return updatedPets;
      });
    }, 1000);
    return () => clearInterval(hungerInterval);
  }, []);

  //love meter
  useEffect(() => {
    const loveInterval = setInterval(() => {
      setPets((prevpets) => {
        const updatedPets = prevpets.map((pet) => {
          if (pet.love === 0) {
            return { ...pet, isAlive: false };
          }
          if (0 < pet.love <= 100) {
            return { ...pet, love: pet.love - 1 };
          }
        });
        return updatedPets;
      });
    }, 1000);

    return () => clearInterval(loveInterval);
  }, []);

  //feed me button
  function handleFeedMe(petId) {
    setPets((prevPets) => {
      const updatedPets = prevPets.map((pet) => {
        if (pet.id === petId) {
          return { ...pet, hunger: 0 };
        }
        return pet;
      });
      return updatedPets;
    });
  }

  //click love on emoji
  function handleClickLove(petId) {
    setPets((prevPets) => {
      const updatedPets = prevPets.map((pet) => {
        if (pet.id === petId) {
          return { ...pet, love: 100 };
        }
        return pet;
      });
      return updatedPets;
    });
  }

  return (
    <div className="game-container">
      <h1 id="main-text">Zoo Feeder</h1>
      <h4 id="intro">
        <span className="quote">❝</span>Please help us care for the zoo's
        animals by feeding them and showing them love. If you can keep them all
        alive, you will be rewarded with additional animals every 30 seconds
        <span className="quote">❞</span>
      </h4>
      <div className="pets-container">
        {pets.map((pet) => (
          <div key={pet.id}>
            {pet.isAlive ? (
              <PetAliveCard
                pet={pet}
                handleFeedMe={handleFeedMe}
                handleClickLove={handleClickLove}
              />
            ) : (
              <PetDieCard pet={pet} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
