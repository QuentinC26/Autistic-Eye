import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost() { 
    // Values ​​that the user enters in the form to create their post.
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('Partage d’expérience');
    const [content, setContent] = useState(''); 
    // Get a navigate function that will be used to change pages in the application
    const navigate = useNavigate(); 

    const CreatePost = async (CreatePost) => {
        // Prevents page reload on submission 
        CreatePost.preventDefault(); 
        // Sends an HTTP POST request to the API at the given URL
        await fetch('http://localhost:8000/api/community/posts/', 
            { method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json', 
                    // Adds the authentication token stored in localStorage (used to prove that the user is logged in)
                    'Authorization': 'Token ' + localStorage.getItem('accessToken') 
                }, 
                // Sends a JSON object containing the title and content of the post to be created
                body: JSON.stringify({ title, content, subject }) 
            }); 
        navigate('/community');
     }; 
 
    return ( 
      <form onSubmit={CreatePost}> 
      <h2>Créer un nouveau post</h2> 
      <input
      placeholder="Titre" 
      value={title} 
      onChange={CreatePost => setTitle(CreatePost.target.value)} />
      <br></br>
      <br></br>
      <select value={subject} onChange={e => setSubject(e.target.value)}>
      <option value="Partage d’expérience">Partage d’expérience</option>
      <option value="Demande d’aide">Demande d’aide</option>
      <option value="Sondage">Sondage</option>
      <option value="Proposition">Proposition</option>
      <option value="Autre">Autre</option>
      </select>
      <br></br>
      <br></br>
      <textarea 
      placeholder="Contenu" 
      value={content} 
      onChange={CreatePost => setContent(CreatePost.target.value)} />
      <br></br>
      <br></br>
      <button type="submit">Publier</button> </form> ); 
    } 

export default CreatePost;
