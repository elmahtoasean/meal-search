import React, { useState, useEffect } from 'react';
import Category from '../components/Category';
import './Home.css'; 

function Home() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchingFunction = () => 
  {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((response) => response.json())
      .then((data) => 
      {
        setData(data.categories);
        console.log(data.categories);
      }
    );
  };

  useEffect(() => 
  {
    if (searchText.trim() !== '') 
    {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then((response) => response.json())
        .then((data) => 
        {
          if (data.meals) 
          {
            const filtered = data.meals.filter(meal =>
              meal.strMeal.toLowerCase().includes(searchText.toLowerCase())
            );
            setData(filtered);
          } 
          else 
          {
            setData([]);
          }
        }
        );
    } 
    else 
    {
      fetchingFunction();
    }
  }, [searchText]);

  return (
    <div className="home-container">
      <h1>MealDB</h1>
      <h2>Search for your favorite meal</h2>
      <input
        type="text"
        placeholder="Search for a meal"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="meal-search-input"
      />

      <div className="grid-container">
        {data.map((item, index) => {
          if (item.strCategory) {
            return <Category key={item.idCategory || index} category={item} />;
          } else {
            return (
              <div key={index} className="card">
                <img
                  src={item.strMealThumb}
                  alt={item.strMeal}
                  style={{ borderRadius: '10px' }}
                />
                <h3>{item.strMeal}</h3>
                <p>{item.strInstructions}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Home;
