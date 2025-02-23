import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "./api";

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
    <div className="p-4">
      <h2 className="text-xl font-bold">Meal Plan</h2>
      <div className="flex gap-2 my-4 overflow-x-auto">
        {[...new Set(meals.map(m => m.day))].map(day => (
          <button
            key={day}
            className={selectedDay === day ? "bg-blue-500 text-white px-4 py-2 rounded" : "bg-gray-200 px-4 py-2 rounded"}
            onClick={() => setSelectedDay(day)}
          >
            Day {day}
          </button>
        ))}
      </div>
      {meals.filter(meal => meal.day === selectedDay).map((meal, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-lg font-semibold">{meal.calories} Calories</h3>
          <p><strong>Breakfast:</strong> {meal.breakfast}</p>
          <p><strong>Lunch:</strong> {meal.lunch}</p>
          <p><strong>Dinner:</strong> {meal.dinner}</p>
          <button onClick={() => handleMarkDone(meal.day)} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Mark Day {meal.day} as Done</button>
        </div>
      ))}
    </div>
  );
}

export default App;
