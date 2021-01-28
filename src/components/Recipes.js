import React, { Fragment, useState, useEffect } from 'react';
import { getRecipes, deleteRecipe, apiUrl } from '../settings/Api';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPlusSquare, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

import { RecipeItems, LoaderSpinner, HeadingH1, ActionControls } from '../styles/Styles';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'


const Recipes = () => {

    const [ recipesData, setRecipes ] = useState();
    const [ loading, setLoading] = useState(true);

    const loadRecipes = async () => {
        setRecipes(await getRecipes());
        setLoading(false);
    }

    const removeRecipe = async (id) => {
        if( window.confirm('Are you sure you want to delete this item?') ) {
            deleteRecipe(id);
            loadRecipes();
        }
    };

    useEffect(() => {
        loadRecipes();
    }, []);



    return (
        <Fragment>
            <Container>
                <HeadingH1>
                    <h1>Recipes List 
                        <Link to="/addrecipe">
                            <FontAwesomeIcon icon={faPlusSquare} size="sm" />
                        </Link>
                    </h1>
                </HeadingH1>
                <Row>
                {    
                    loading ? 
                        <LoaderSpinner>
                            <FontAwesomeIcon icon={faSpinner} size="lg" className="loader" spin />
                        </LoaderSpinner>
                     :
                        recipesData ? 
                        recipesData.map( (recipe) => (
                            <Col key={recipe.uuid} md={4}>
                                <RecipeItems>
                                    { (recipe.images) ?
                                    <div className="image-holder">
                                        <Link to={`/recipe/${recipe.uuid}`}>
                                            <img src={apiUrl + recipe.images.medium} alt={recipe.title} />
                                        </Link>
                                    </div>
                                    : '' }
                                    <h2>
                                        <Link to={`/recipe/${recipe.uuid}`}>{recipe.title}</Link>
                                    </h2>
                                    <p>{recipe.description}</p>
                                    <p><small>{recipe.postDate}</small></p>
                                    <ActionControls>
                                        <a href="#" onClick={() => removeRecipe(recipe.uuid)} className="danger">
                                            <FontAwesomeIcon icon={faTrash} size="sm" />
                                        </a>
                                        <Link to={`/recipe/${recipe.uuid}`} className="primary">
                                            <FontAwesomeIcon icon={faEye} size="sm" />
                                        </Link>
                                    </ActionControls>
                                </RecipeItems>
                            </Col>
                        )) :
                        <Col md={12}>
                            <p>No Result Found!</p>
                        </Col>
                }
                </Row>
            </Container>
        </Fragment>
    );
}

export default Recipes;
