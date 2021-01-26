import React, { Fragment, useState, useEffect } from 'react';
import { getSpecials, getRecipe, apiUrl } from '../settings/Api';
import '../styles/Recipe.css';

const Recipe = (data) => {

    const id = data.match.params.id;

    const [ recipe, setRecipe ] = useState();
    const [ specials, setSpecials ] = useState();
    const [ loading, setLoading] = useState(true);

    const loadRecipe = async () => {
        setRecipe(await getRecipe(id));
        setSpecials(await getSpecials())
        setLoading(false);
    }

    useEffect(() => {
        loadRecipe()
    }, []);

    const loadSpecials = (ingredients) => {
        const specialsId = specials.map(specialid => specialid.ingredientId)
        return (
            <div>
                {
                    ingredients.map((ingredient) => {
                        if ( specialsId.indexOf(ingredient.uuid) != -1 ) {
                            const sID = specialsId.indexOf(ingredient.uuid)
                            return (
                                <li className="special-item">
                                    <p>{ingredient.name}</p>
                                    <p>{specials[sID].title}</p>
                                    <p>{specials[sID].type}</p>
                                    <p>{specials[sID].text}</p>
                                </li>
                            )
                        } else {
                            return (
                                <li>
                                    <p>{ingredient.name}</p>
                                </li>
                            )
                        }
                    })
                }
            </div>
        )
    }

    const loadDirections = (directions) => {
        return (
            directions ? 
            directions.map((direction) => (
                <li>{ direction.instructions }</li>
            ))
            : <li>N/A</li>
        )
    }

    return (
        <Fragment>
            <div className="container">
               {
                   loading ? 'loading...' : 
                    <div className="recipe-details">
                        <h1>{ recipe.title }</h1>
                        <p><small>{ recipe.postDate }</small></p>
                        <div className="row">
                            <div className="left">
                                { recipe.images ?
                                <img src={apiUrl + recipe.images.full} alt={ recipe.title } />
                                : '' }
                            </div>
                            <div className="right">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Description</th>
                                        <td>{ recipe.description }</td>
                                    </tr>
                                    <tr>
                                        <th>Servings</th>
                                        <td>{ recipe.servings }</td>
                                    </tr>
                                    <tr>
                                        <th>Preparation Time</th>
                                        <td>{ recipe.prepTime }</td>
                                    </tr>
                                    <tr>
                                        <th>Cook Time</th>
                                        <td>{ recipe.cookTime }</td>
                                    </tr>
                                    <tr>
                                        <th>Ingredients</th>
                                        <td>
                                            <ul>
                                                { loadSpecials(recipe.ingredients) }
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Directions</th>
                                        <td>
                                            <ul>
                                            { loadDirections(recipe.directions) }
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
               }
            </div>
        </Fragment>
    )

}

export default Recipe;