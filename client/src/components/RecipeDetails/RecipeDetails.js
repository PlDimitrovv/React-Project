import "./RecipeDetails.css"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import * as recipeService from '../../services/recipeService'

export const RecipeDetails = () => {
    const { recipeId } = useParams()

    const [recipe, setRecipe] = useState({})

    useEffect(() => {
        recipeService.getOneRecipe(recipeId)
            .then(result => {
                setRecipe(result)
            })
    }, [recipeId])

    return (
        <section className="details-wrapper">
            <img className="details-img" src={recipe.img} alt="" />

            <h2 className="details-title">{recipe.name}</h2>
            <h5 className="details-text-title">Description:</h5>
            <p className="details-text"><span>{recipe.desc}</span></p>
            <h5 className="details-text-title">Ingredients:</h5>
            <p className="details-text">{recipe.ingredients}</p>
            <h5 className="details-text-title">How to prepare:</h5>
            <p className="details-text">{recipe.desc}</p>
            <div className="prep-servings-wrapper">
                <p className="prep-servings">Prep Time: {recipe.prepTime} minutes.</p>
                <p className="prep-servings">Servings: {recipe.servings} portions.</p>
            </div>


            <div className="details-buttons-wrapper"> 
            <Link to={`/catalog/${recipe._id}/edit`} className="edit-btn">Edit Recipe</Link>
            <Link to={`/catalog/${recipe._id}/delete`} className="delete-btn">Delete Recipe</Link>
            </div>
        </section>
    )
}