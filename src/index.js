import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://yourwebsite.infinityfreeapp.com";

function App() {
  const [meals, setMeals] = useState([]);
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    axios.get(`${API_URL}/index.php`)
      .then(response => setMeals(response.data))
      .catch(error => console.error("Error fetching meals:", error));
  }, []);

  const handleMarkDone = (day) => {
    axios.post(`${API_URL}/index.php`, { day })
      .then(() => alert(`Day ${day} marked as done!`))
      .catch(error => console.error("Error marking day done:", error));
  };

  return (
    <div>
      <h2>Meal Plan</h2>
      <div>
        {[...new Set(meals.map(m => m.day))].map(day => (
          <button key={day} onClick={() => setSelectedDay(day)}>
            Day {day}
          </button>
        ))}
      </div>
      {meals.filter(meal => meal.day === selectedDay).map((meal, index) => (
        <div key={index}>
          <h3>{meal.calories} Calories</h3>
          <p>Breakfast: {meal.breakfast}</p>
          <p>Lunch: {meal.lunch}</p>
          <p>Dinner: {meal.dinner}</p>
          <button onClick={() => handleMarkDone(meal.day)}>Mark as Done</button>
        </div>
      ))}
    </div>
  );
}

export default App;
