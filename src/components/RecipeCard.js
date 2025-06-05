import { useState } from "react";

function RecipeCard({ recipe, onToggleFavorite, isFavorite }) {
  const [showDetails, setShowDetails] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "#4CAF50";
      case "Medium":
        return "#FF9800";
      case "Hard":
        return "#F44336";
      default:
        return "#757575";
    }
  };

  return (
    <div className="recipe-card">
      <h3>{recipe.name}</h3>
      <div className="recipe-meta">
        <span className="cuisine">{recipe.cuisine}</span>
        <span
          className="difficulty"
          style={{ backgroundColor: getDifficultyColor(recipe.difficulty) }}
        >
          {recipe.difficulty}
        </span>
        <span className="time">⏱️ {recipe.cookTime}</span>
      </div>

      <div className="card-actions">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="details-btn"
        >
          {showDetails ? "🔼 Hide Recipe" : "🔽 Show Recipe"}
        </button>
        <button
          onClick={() => onToggleFavorite(recipe.id)}
          className={`favorite-btn ${
            isFavorite ? "favorited" : "not-favorited"
          }`}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      {showDetails && (
        <div className="recipe-details">
          {recipe.story && (
            <div className="recipe-story">
              <h4>🏠 Story:</h4>
              <p>
                <em>{recipe.story}</em>
              </p>
            </div>
          )}

          <h4>🥘 Ingredients:</h4>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <h4>👩‍🍳 Instructions:</h4>
          <p>{recipe.instructions}</p>

          <div className="tags">
            {recipe.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeCard;
