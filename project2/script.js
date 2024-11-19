// script.js

// DOM Elements
const introScreen = document.getElementById('introScreen');
const app = document.getElementById('app');
const historySection = document.getElementById('history');
const mealForm = document.getElementById('mealForm');
const viewHistoryButton = document.getElementById('viewHistoryButton');
const clearHistoryButton = document.getElementById('clearHistory');
const openHistoryButton = document.getElementById('openHistoryButton');
const closeHistoryButton = document.getElementById('closeHistoryButton');
const startMealButton = document.getElementById('startMealButton');
const mealList = document.getElementById('mealList');

// Initialize meal data from localStorage or start with an empty array
let meals = JSON.parse(localStorage.getItem('meals')) || [];

// Render the meal history
function renderMealHistory() {
  if (meals.length === 0) {
    mealList.innerHTML = '<li>No meals found! Start adding some.</li>';
    return;
  }

  mealList.innerHTML = meals.map(meal => `
    <li>
      <strong>${meal.date}</strong> - 
      <span class="${meal.mealType}">${meal.mealType.toUpperCase()}</span>: 
      ${meal.dish}
    </li>
  `).join('');
}

// Navigation: Show Add Meals Screen
function showApp() {
  introScreen.classList.add('hidden');
  app.classList.remove('hidden');
}

// Navigation: Show History Screen from Intro
function openHistoryFromIntro() {
  renderMealHistory();
  introScreen.classList.add('hidden');
  historySection.classList.remove('hidden');
}

// Navigation: Show History Screen from App
function openHistoryFromApp() {
  renderMealHistory();
  app.classList.add('hidden');
  historySection.classList.remove('hidden');
}

// Navigation: Close History Screen
function closeHistory() {
  historySection.classList.add('hidden');
  introScreen.classList.remove('hidden');
}

// Save a new meal entry
function saveMeal(event) {
  event.preventDefault();
  
  const date = document.getElementById('date').value;
  const mealType = document.getElementById('mealType').value;
  const dish = document.getElementById('dish').value.trim();
  
  if (!date || !mealType || !dish) {
    alert('Please fill out all fields.');
    return;
  }
  
  meals.push({ date, mealType, dish });
  localStorage.setItem('meals', JSON.stringify(meals));
  mealForm.reset();
  alert('Meal saved!');
}

// Clear the meal history
function clearMealHistory() {
  if (confirm('Are you sure you want to clear the meal history?')) {
    meals = [];
    localStorage.removeItem('meals');
    alert('Meal history cleared.');
  }
}

// Event Listeners
mealForm.addEventListener('submit', saveMeal);
clearHistoryButton.addEventListener('click', clearMealHistory);
openHistoryButton.addEventListener('click', openHistoryFromIntro);
closeHistoryButton.addEventListener('click', closeHistory);
viewHistoryButton.addEventListener('click', openHistoryFromApp);
startMealButton.addEventListener('click', showApp);

// Initial Screen
document.addEventListener('DOMContentLoaded', () => {
  introScreen.classList.remove('hidden');
  app.classList.add('hidden');
  historySection.classList.add('hidden');
});
