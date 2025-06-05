import { useState, useEffect } from "react";
import { recipes } from "./data/recipes";
import RecipeCard from "./components/RecipeCard";
import FilterBar from "./components/FilterBar";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Get unique cuisines
  const cuisines = [...new Set(recipes.map((recipe) => recipe.cuisine))];

  // Filter recipes
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      recipe.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCuisine =
      selectedCuisine === "" || recipe.cuisine === selectedCuisine;
    const matchesFavorites =
      !showFavoritesOnly || favorites.includes(recipe.id);

    return matchesSearch && matchesCuisine && matchesFavorites;
  });

  // Toggle favorite
  const toggleFavorite = (recipeId) => {
    setFavorites((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  // Update document title
  useEffect(() => {
    document.title = `Fomubad's Cameroonian Recipes (${filteredRecipes.length} recipes)`;
  }, [filteredRecipes.length]);

  return (
    <div className="App">
      <header>
        <h1>🇨🇲 Fomubad's Cameroonian Recipe Collection</h1>
        <p>Traditional recipes from Mbengwi, Northwest Cameroon</p>
        <div className="author-info">
          <p>
            <strong>By Fomubad Borista Fondi</strong> • Preserving our culinary
            heritage
          </p>
        </div>
      </header>

      <div className="controls">
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={setSelectedCuisine}
          cuisines={cuisines}
        />
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`favorites-toggle ${showFavoritesOnly ? "active" : ""}`}
        >
          {showFavoritesOnly ? "📋 Show All" : "❤️ Favorites Only"}
        </button>
      </div>

      <div className="stats">
        <p>
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </p>
      </div>

      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(recipe.id)}
          />
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="no-results">
          <h3>🔍 No recipes found</h3>
          <p>Try adjusting your search or browse all recipes!</p>
        </div>
      )}

      <footer>
        <p>🌍 Bringing the flavors of Mbengwi, Cameroon to the world</p>
      </footer>
    </div>
  );
}

export default App;
