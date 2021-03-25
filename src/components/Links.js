import { react, useState, useEffect } from 'react';
import { toast } from "react-toastify";
import LinkForm from './LinkForm';

import { db } from '../firebase';

const Links = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');
    
    const addOrEditLink = async (linkObject) => {        
        if (currentId === ''){
            console.log(linkObject)
            await db.collection('links').doc().set(linkObject); //collection create a stack of data - doc create an id - set savedata
            toast('New link added', { type: 'success' })
        } else {
            await db.collection('links').doc(currentId).update(linkObject);
            toast('Link updated', { type: 'info' });
            setCurrentId('');
        }
    };

    const onDeleteLink = async (id) => {
        if (window.confirm('Are you sure you want to delete this link?')) {
            await db.collection('links').doc(id).delete();
            toast('Link removed', { type: 'error', autoClose: 2000 })
        }
    }

    const getLinks = async () => {
         db.collection('links').onSnapshot((querySnapshot) => { // Allows you to get the data updated every time you add something new
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({...doc.data(), id:doc.id}); // Get data from registry and add its id
            }); 
            setLinks(docs);
        });
    }

    useEffect(() => {
        getLinks();
    }, [])
//<LinkForm addOrEditLink={addOrEditLink}/>
    return (
    <div>
        <div className="col-md-16 p-2">
            <LinkForm {...{addOrEditLink, currentId, links}} />
        </div>
        <div className="col-md-16 p-2">
            {links.map(link => (
                <div className="card mb-1" key={link.id}>
                    <div className="card-body"> 
                        <div className="d-flex justify-content-between">
                        <h4>{link.name}</h4>
                        <div>
                            <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                            <i className="material-icons" onClick={() => setCurrentId(link.id)}>create</i>
                        </div>
                        </div>
                        <p>{link.description}</p>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">Go to website</a>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

export default Links;
