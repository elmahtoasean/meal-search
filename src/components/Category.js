import React from 'react';
import './Category.css';

export default function Category({ category }) {
    
    let title,image,description;


    if (category && category.strMeal) 
    {
        title = category.strMeal;
    } 
    else if (category && category.strCategory) 
    {
        title = category.strCategory;
    } 
    else 
    {
        title = 'Unknown Category';
    }
    
    if (category && category.strMealThumb)
    {
        image = category.strMealThumb;
    } 
    else if (category && category.strCategoryThumb) 
    {
        image = category.strCategoryThumb;
    } 
    

    if (category && category.strInstructions) 
    {
        description = category.strInstructions;
    } 
    else if (category && category.strCategoryDescription) 
    {
        description = category.strCategoryDescription;
    } 
    else 
    {
        description = 'No description available.';
    }
        
    

    return (
        <div className="category-card">
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="category-image"
                />
            )}
            <h3 className="category-title">{title}</h3>
            <br />
            <p className="category-description">{description}</p>
        </div>
    );
}
