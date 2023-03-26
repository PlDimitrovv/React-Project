import "./OneRecipe.css"
import { Link } from 'react-router-dom'

export const OneRecipe = ({ recipe }) => {


    return (
        <article className="article">
            <img className="article-img" src={recipe.img} alt="" />
            <h1 className="article-title">{recipe.name}</h1>
            <p className="article-description">{recipe.desc}</p>
            <div className="info-wrapper">
                <p className="article-prep">Prep Time: {recipe.prepTime}</p>
                <p className="article-prep">Servings: {recipe.servings}</p>
            </div>
            <div className="details-button-wrapper">
            <Link to={`/catalog/details/${recipe._id}`} className="details-button">Details</Link>
            </div>
        </article>
    )
}