import "./RecipeDetails.css"
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as recipeService from '../../services/recipeService'
import * as commentService from '../../services/commentService'
import { AuthContext } from "../../context/AuthContext";

export const RecipeDetails = () => {
    const { user } = useContext(AuthContext)
    const { recipeId } = useParams()

    const [recipe, setRecipe] = useState({})
    const [comment, setComment] = useState('');
    const [username, setUsername] = useState(user.username);


    useEffect(() => {
        recipeService.getOneRecipe(recipeId)
            .then(result => {
                setRecipe(result)
            })

        loadAllComments(recipeId)

    }, [recipeId])


    const navigate = useNavigate()

    const deleteHandler = async (e) => {
        const result = await recipeService.deleteRecipe(recipe._id, user.accessToken);
        navigate('/catalog')
        return result
    }


    const isOwner = user?._id === recipe?._ownerId
    const isAuthenticated = user?._id ? true : false


    const onCommentSubmit = async (e) => {
        e.preventDefault()

        const username = user.username
        const result = await commentService.addComment(user.accessToken, {
            recipeId,
            username,
            comment,
        })


        loadAllComments(recipeId)

    }
    //Loading Comments 
    function loadAllComments(recipeId) {
        commentService.getAllComments(recipeId)
            .then(commentsResult => {
                setRecipe(state => ({ ...state, comments: commentsResult }))
            })
    }


    return (
        <section className="details-wrapper">
            <img className="details-img" src={recipe.img} alt="" />

            <h2 className="details-title">{recipe.name}</h2>
            <h5 className="details-text-title">Description:</h5>
            <p className="details-text"><span>{recipe.desc}</span></p>
            <h5 className="details-text-title">Ingredients:</h5>
            <p className="details-text">{recipe.ingredients}</p>
            <h5 className="details-text-title">How to prepare:</h5>
            <p className="details-text">{recipe.instructions}</p>
            <div className="prep-servings-wrapper">
                <p className="prep-servings">Prep Time: {recipe.prepTime} minutes.</p>
                <p className="prep-servings">Servings: {recipe.servings} portions.</p>
            </div>

            {isOwner && (
                <div className="details-buttons-wrapper">
                    <Link to={`/catalog/${recipe._id}/edit`} className="edit-btn">Edit Recipe</Link>
                    <button className="delete-btn" onClick={deleteHandler}>Delete Recipe</button>
                </div>
            )}
            {isAuthenticated && (
                <>
                    <div className="details-comments">
                        <h2 className="comments-title">Comments:</h2>
                        <ul className="comments-wrapper">
                            {recipe.comments && Object.values(recipe.comments).map(x => (
                                <li key={x._id} className="comment">
                                    <p className="comment-paragraph"><span className="comment-username">{x.username}</span>: {x.comment}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <article className="create-comment">
                        <label className="comment-label">Add new comment:</label>
                        <form className="form" onSubmit={onCommentSubmit}>
                            <label className="comment-username-label">{username}:</label>
                            <textarea className="comment-text-area" name="comment" placeholder="Comment......" value={comment} onChange={(e) => setComment(e.target.value)} ></textarea>
                            <input className="comment-btn" type="submit" value="Add Comment" />
                        </form>
                    </article>
                </>
            )}
        </section>

    )
}