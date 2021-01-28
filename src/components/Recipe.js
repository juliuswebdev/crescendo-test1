import React, { Fragment, useState, useEffect } from 'react';
import { getSpecials, getRecipe, apiUrl } from '../settings/Api';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

import { Table, LoaderSpinner, HeadingH1, HeadingH2 } from '../styles/Styles';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

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
        loadRecipe();
    }, []);

    const loadSpecials = (ingredients) => {
        const specialsId = specials.map(specialid => specialid.ingredientId)
        return (
            <div>
                {
                    ingredients.map((ingredient) => {
                        if ( specialsId.indexOf(ingredient.uuid) !== -1 ) {
                            const sID = specialsId.indexOf(ingredient.uuid)
                            return (
                                <li className="special-item">
                                    <p>{ingredient.name} <small>({ingredient.measurement})</small></p>
                                    <p>{specials[sID].title}</p>
                                    <p>{specials[sID].type}</p>
                                    <p>{specials[sID].text}</p>
                                </li>
                            )
                        } else {
                            return (
                                <li>
                                    <p>{ingredient.name} <small>({ingredient.measurement})</small></p>
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
            <Container>
               {
                   loading ? 
                    <LoaderSpinner>
                        <FontAwesomeIcon icon={faSpinner} size="lg" className="loader" spin />
                    </LoaderSpinner>
                : 
                    <div className="recipe-details">
                        <HeadingH1>
                            <Link to="/" className="back-button"><FontAwesomeIcon icon={faLongArrowAltLeft} size="lg" /></Link>
                            <h1>{ recipe.title }</h1>
                            <p><small>{ recipe.postDate }</small></p>
                        </HeadingH1>
                        <Row>
                            <Col md={6}>
                                { recipe.images ?
                                <img src={apiUrl + recipe.images.full} alt={ recipe.title } />
                                : '' }
                            </Col>
                            <Col md={6}>
                                <Table>
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
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <HeadingH2>
                            <h2>Others</h2>
                        </HeadingH2>
                        <Row>   
                            <Col md={6}>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <th>Ingredients</th>
                                            <td>
                                                <ul>
                                                    { loadSpecials(recipe.ingredients) }
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                            <Col md={6}>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <th>Directions</th>
                                            <td>
                                                <ul>
                                                { loadDirections(recipe.directions) }
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </div>
               }
            </Container>
        </Fragment>
    )

}

export default Recipe;