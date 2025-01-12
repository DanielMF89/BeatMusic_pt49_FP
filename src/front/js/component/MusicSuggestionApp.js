import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const MusicSuggestionApp = () => {
  const { actions } = useContext(Context);
  const [suggestions, setSuggestions] = useState(new Set()); // Usando un Set para sugerencias únicas
  const [selectedGenre, setSelectedGenre] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleGetGPT3Suggestion = async () => {
    try {
      if (buttonDisabled) {
        console.log('Botón desactivado. Espera unos segundos.');
        return;
      }

      setButtonDisabled(true); // Desactivar el botón temporalmente

      // Genera un número aleatorio entre 1 y 10000
      const randomSeed = Math.floor(Math.random() * 10000) + 1;

      if (!selectedGenre) {
        console.error('Por favor, selecciona un género de música.');
        setButtonDisabled(false); // Habilitar el botón de nuevo
        return;
      }

      const prompt = `Genera una lista de 3 canciones aleatorias de ${selectedGenre} - Seed: ${randomSeed}`;
      const response = await fetch(process.env.BACKEND_URL + "/api/generate_recommendation", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, model: "gpt-3.5-turbo" }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Respuesta de GPT-3:', result);

        const artistInfo = result.artist_info;
        const artistName = artistInfo && artistInfo.name ? artistInfo.name : 'Artista Desconocido';

        // Agregar la nueva sugerencia al conjunto existente
        setSuggestions(prevSuggestions => new Set([...prevSuggestions, artistName]));
      } else {
        console.error('Error al obtener sugerencia de OpenAI GPT-3:', response.status, response.statusText);
        setSuggestions(new Set(['Error al obtener información de la pista']));
      }
    } catch (error) {
      console.error('Error al obtener sugerencia de OpenAI GPT-3', error);
      setSuggestions(new Set(['Error al obtener información de la pista']));
    } finally {
      // Habilitar el botón después de 6 segundos
      setTimeout(() => {
        setButtonDisabled(false);
      }, 6000);
    }
  };

  return (
    <div className="container mb-5">
      <h1 className="display-2 my-5 link-green">Recommendations</h1>
      <label className="form-label fs-2 text-white me-5" htmlFor="genreSelector">Select your genre.</label>
      <select className="dropdown-genre me-5" id="genreSelector" onChange={(e) => setSelectedGenre(e.target.value)}>
        <option value="">-- Genres --</option>
        <option value="metal">Metal</option>
        <option value="house">House</option>
        <option value="pop">Pop</option>
        <option value="rap">Rap</option>
        <option value="clasica">Clasic</option>
        <option value="jazz">Jazz</option>
        <option value="rock and roll">Rock and Roll</option>
        <option value="country">Country</option>
        <option value="flamenco">Flamenco</option>
      </select>

      <button className="btn text-white btn-pink" onClick={handleGetGPT3Suggestion} disabled={buttonDisabled}>
        Suggest a song
      </button>

      {/* Mapear y mostrar las sugerencias */}
      {[...suggestions].map((suggestion, index) => (
        <div className="mt-3 text-white " key={index}>
          <strong className="text-white">Suggestion {index + 1}:</strong> {suggestion}
        </div>
      ))}
    </div>
  );
};

export default MusicSuggestionApp;
