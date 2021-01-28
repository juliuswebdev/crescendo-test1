import React, { useState, Fragment, useEffect } from "react";
import { postRecipe } from "../settings/Api";
import { useHistory, Link } from "react-router-dom";

import { Input } from './Input';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

import { HeadingH1, HeadingH2 } from '../styles/Styles';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import {  Button } from 'react-bootstrap';

import { Formik, Form, FieldArray, Field } from "formik";
import { v4 as uuidv4 } from "uuid";


const AddRecipe = () => {

    const history = useHistory();

    const initialData = {
        uuid: uuidv4(),
        title: "",
        description: "",
        servings: 0,
        prepTime: "",
        cookTime: "",
        postDate: "",
        editDate: "",
        amount: 0,
        ingredients: [
            {
                uuid: uuidv4(),
                amount: 0,
                measurement: "",
                name: "",
            },
        ],
        directions: [
            {
                instructions: "",
                optional: false
            }
        ]
    };

    const [formData, setFormData] = useState(initialData);

    return (
        <Fragment>
            <Container>
                <HeadingH1>
                    <Link to="/" className="back-button"><FontAwesomeIcon icon={faLongArrowAltLeft} size="lg" /></Link>
                    <h1>Add Recipe</h1>
                </HeadingH1>
                <Formik
                    initialValues={formData}
                    onSubmit={ async (values, { setSubmitting }) => {
                        console.log(values);
                        await postRecipe(values);
                        history.push("/");
                        setSubmitting(false);
                    }}
                    render={({ values }) => {
                    return (

                        <Form>
                            <Input type="text" name="title" placeholder="Title" label="Title" classname="form-control" />
                            <Input as="textarea" name="description" placeholder="Description" label="Description" classname="form-control" />
                            <Input type="number" name="servings" placeholder="Servings" label="Servings" classname="form-control" />
                            <Input type="text" name="prepTime" placeholder="Prep Time" label="Prep Time" classname="form-control" />
                            <Input type="text" name="cookTime" placeholder="Cook Time" label="Cook Time" classname="form-control" />

                            <Row>
                                <Col md={6}>
                                    <HeadingH2><h2>Ingredients</h2></HeadingH2>
                                    <FieldArray
                                        name="ingredients"
                                        render={({ push }) => (
                                        <Fragment>
                                            <div className="mb-1">
                                                {values.ingredients.map((ingredients, i) => (
                                                    <div key={i} className="mb-4">
                                                        <Input type="number" name={`ingredients[${i}].amount`} placeholder="Amount" label="Amount" classname="form-control" />
                                                        <Input type="text" name={`ingredients[${i}].measurement`}  placeholder="Measurement" label="Measurement" classname="form-control" />
                                                        <Input type="text" name={`ingredients[${i}].name`} placeholder="Name" label="Name" classname="form-control" />
                                                        <hr/>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={ async () => {
                                                    await push({
                                                        uuid: null,
                                                        amount: 0,
                                                        measurement: "",
                                                        name: "",
                                                    });
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                        </Fragment>
                                        )}
                                    >
                                    </FieldArray>
                                </Col>
                                <Col md={6}>
                                    <HeadingH2><h2>Directions</h2></HeadingH2>
                                    <FieldArray
                                        name="directions"
                                        render={({ push }) => (
                                        <Fragment>
                                            <div className="mb-1">
                                                {values.directions.map((directions, i) => (
                                                    <div key={i} className="mb-4">
                                                        <Input as="textarea" name={`directions[${i}].instructions`} placeholder="Direction" label={`Direction ${i+1}`} classname="form-control" />
                                                        <hr/>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={ async () => {
                                                    await push({
                                                        uuid: null,
                                                        amount: 0,
                                                        measurement: "",
                                                        name: "",
                                                    });
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                        </Fragment>
                                        )}
                                    >
                                    </FieldArray>
                                </Col>
                                <Col md={12} className="mt-3 mb-5">
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>                     
                        </Form>
                    );
                    }}
                >
                </Formik>
            </Container>
        </Fragment>
    );
};

export default AddRecipe;