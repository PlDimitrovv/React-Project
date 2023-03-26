import "./Home.css"
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <div>
            <article className="info">
                <div className=""> </div>
                <h1 className="banner-title">Explore delicious </h1>
                <h3 className="banner-subtitle">meals for you!</h3>
                <div className="redirect-home">
                    <Link className='catalog-link' to="/catalog">Browse Recipes</Link>
                </div>
            </article>

            <div className="wrapper">
                <article className="article">
                    <img className="article-img" src="" alt="" />
                    <h1 className="article-title">Title</h1>
                    <p className="article-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et dolore magna.</p>
                    <div className="info-wrapper">
                        <p className="article-prep">Prep Time:</p>
                        <p className="article-prep">Servings:</p>
                    </div>
                    <button className="article-btn">Details</button>
                </article>

                <article className="article">
                    <img className="article-img" src="" alt="" />
                    <h1 className="article-title">Title</h1>
                    <p className="article-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et dolore magna.</p>
                    <div className="info-wrapper">
                        <p className="article-prep">Prep Time:</p>
                        <p className="article-prep">Servings:</p>
                    </div>
                    <button className="article-btn">Details</button>
                </article>

                <article className="article">
                    <img className="article-img" src="" alt="" />
                    <h1 className="article-title">Title</h1>
                    <p className="article-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et dolore magna.</p>
                    <div className="info-wrapper">
                        <p className="article-prep">Prep Time:</p>
                        <p className="article-prep">Servings:</p>
                    </div>
                    <button className="article-btn">Details</button>
                </article>

            </div>
        </div>
    )
}