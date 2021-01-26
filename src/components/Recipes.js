import React, { Fragment, useState, useEffect } from 'react';
import { getRecipes, apiUrl } from '../settings/Api';
import { Link } from 'react-router-dom';
import '../styles/Recipes.css';

const Recipes = () => {

    const [ recipesData, setRecipes ] = useState();
    const [ loading, setLoading] = useState(true);

    const loadRecipes = async () => {
        setRecipes(await getRecipes());
        setLoading(false);
    }

    useEffect(() => {
        loadRecipes();
    }, []);

    return (
        <Fragment>
            <div className="container">
                <h1>Recipes List <small><Link to="/addrecipe">Add</Link></small></h1>
                <div className="recipes-lists row">
                {    
                    loading ? 'loading...' :
                        recipesData ? 
                        recipesData.map( (res) => (
                            <div key={res.uuid}  className="recipe-item">
                                <Link to={`/recipe/${res.uuid}`}>
                                    { (res.images) ?
                                    <img src={apiUrl + res.images.medium} />
                                    : '' }
                                    <h2>{res.title}</h2>
                                    <p>{res.description}</p>
                                    <p><small>{res.postDate}</small></p>
                                </Link>
                            </div>
                        )) :
                        <p>No Result Found!</p>
                }
                </div>
            </div>
        </Fragment>
    );
}

export default Recipes;
