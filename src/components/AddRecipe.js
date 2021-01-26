import React, { useState, Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import { Formik, Form, FieldArray, Field } from "formik";
import { postRecipe } from "../settings/Api";
import { v4 as uuidv4 } from "uuid";
import '../styles/AddRecipe.css';

const AddRecipe = () => {

    const history = useHistory();
    const [formData, setFormData] = useState({
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
    });

    return (
        <Fragment>
            <div class="container">
                <h1>Add Recipe</h1>
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
                        <Form className="form">
                        <Field type="text" name="title" label="Title" ></Field>
                        <Field as="textarea" name="description" label="Description"></Field>
                        <Field type="number" name="servings" label="Servings" ></Field>
                        <Field type="text" name="prepTime" label="Prep Time" ></Field>
                        <Field type="text" name="cookTime" label="Cook Time" ></Field>
                        <p><strong>Ingredient</strong></p>
                        <FieldArray
                            name="ingredients"
                            render={({ push }) => (
                            <Fragment>
                                <div>
                                    {values.ingredients.map((ingredients, i) => (
                                        <div key={i}>
                                            <Field type="number" name={`ingredients[${i}].amount`} label="Amount"></Field>
                                            <Field type="text" name={`ingredients[${i}].measurement`} label="Measurement"></Field>
                                            <Field type="text" name={`ingredients[${i}].name`} label="Name"
                                            ></Field>
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
                                        Add Ingredients
                                    </button>
                                </div>
                            </Fragment>
                            )}
                        >
                        </FieldArray>
                            <button type="submit">Submit</button>
                        </Form>
                    );
                    }}
                >
                </Formik>
            </div>
        </Fragment>
    );
};

export default AddRecipe;