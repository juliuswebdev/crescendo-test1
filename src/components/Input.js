import React, { Fragment } from 'react';
import { Field } from 'formik';

export const Input = ({ type, name, as, placeholder, label, classname }) => {

    const fieldInput = as ? (
        <Field as={as} name={name} label={label} className={classname} placeholder={placeholder}></Field>
    ) : (
        <Field type={type} name={name} label={label} className={classname} placeholder={placeholder}></Field>
    );

    return (
        <Fragment>
            <div className="form-group">
                <label htmlFor={name}><strong>{label}:</strong></label>
                { fieldInput }
            </div>
        </Fragment>
    );
};

