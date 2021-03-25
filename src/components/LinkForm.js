import { react, useState, useEffect } from 'react';

import { db } from '../firebase';
const LinkForm = (props) => {

    const initialStateValues = {
        url: "",
        name: "",
        description: "",
    };

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = e => {
        const { name, value } = e.target; // Allow acces to the control name and its value
        setValues({...values, [name]: value}) // ...values copy actual value and update the value
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        props.addOrEditLink(values);

        setValues({...initialStateValues});
    }

    const getLinkById = async (id) => {
        const doc = await db.collection('links').doc(id).get();
        setValues({...doc.data()})
    }

    useEffect(() => {
        if (props.currentId === '') {
            setValues({...initialStateValues});
        } else {
            getLinkById(props.currentId);
        }
    }, [props.currentId]);

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input onChange={handleInputChange} type="text" className="form-control" placeholder="https://someurl.com" name="url" value={values.url} />
            </div>

            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input onChange={handleInputChange} type="text" className="form-control" placeholder="name" placeholder="Website name" name="name" value={values.name}/>
            </div>

            <div className="form-group">
                <textarea onChange={handleInputChange} className="description" rows="3" className="form-control" placeholder="Write a description" name="description" value={values.description}></textarea>
            </div>

            <button className="btn btn-primary btn-block">
                {props.currentId === '' ? 'Save' : 'Update'}
            </button>
        </form>
    )
};

export default LinkForm;
