import './App.css'
// Access the data of the context you created
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

function Home() {
  // Get the user from the context
  const { user } = useContext(AuthContext);
  // List of posts to display
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // You tell React what to do when the page is rendered or when the user logs in or out.
  useEffect(() => {
    // Retrieves the token stored in the browser
    const token = localStorage.getItem('accessToken');

    // Basic Url to Retrieves the posts
    let url = 'http://localhost:8000/api/community/recent_posts/';

    // If the user is logged in, add ?limit=5 to the URL (so 5 posts).
    // Otherwise, add ?limit=1 (only the most recent).
    if (user) {
      url += '?limit=3';
    } else {
      url += '?limit=1';
    }

    // Send a request to the API to retrieve all the comments
    fetch(url, {
      // If the user is logged in, the authentication token is added to the header
      headers: (user && token) ? { 
        'Authorization': 'Token ' + token,
      } 
      // If the user is not logged in, nothing is added to the header
      : {
      },
    })

    // Get the response from the API and check if it is correct
     .then(res => {
      if (!res.ok) {
        throw new Error('Erreur ' + res.status);
      }
      // Transforms the response into JSON
      return res.json();
    })
    .then(data => {
      // Check that the data received is indeed an array, otherwise you put an empty array
      setPosts((Array.isArray(data) ? data : []));
    })
    // If there is an error in the query, you display it in the console
    .catch(err => {
      console.error("Erreur fetch posts", err);
      // Reset the list of posts to empty to avoid display errors
      setPosts([]);
    });
  // useEffect restarts if the user changes
  }, [user]);

  const handleRegister = () => {
    // To put the user on the home page
    navigate('/Register_and_login');
  };

  return (
    <>
    {/* ? = the condition is True */}
    {/* : = the condition is False */}
     {user ? (
        <div>
        <h3>Bienvenue sur Autistic Eye !!</h3>
        <br />
        <p>Voici les trois post les plus récents :</p>
        <br />
        <br />
        {/* If the posts list is empty, displays a message: No posts to display */}
        {posts.length === 0 && <p>Aucun post à afficher</p>}
        {/* Loops through the posts list to process each post */}
        {posts.map(post => (
          // Creates a <div> element for each post with a unique key
          <div key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.content.substring(0, 100)}...</p>
            <br />
          </div>
        ))}
        <br />
        <br />
        <p>Voici les trois articles les plus récents :</p>
        <br />
        <br />
        <p>ARTICLE LES PLUS RECENTS</p>
        <br />
        </div>
        ) : (
        <div>
        <h3>Bienvenue sur Autistic Eye !!</h3>
        <br />
        <p>Autistic Eye est un réseau social communautaire qui réunit les personnes autistes et leurs proches. Son but est de combattre l'isolement des personnes autistes et de leur permettre de partager leurs expériences.</p>
        <br />
        <p>Les membres d'Autistic Eye ont un accès illimité à la partie Communauté, qui leur permet de partager leurs expériences, d'échanger entre eux et d'obtenir de l'aide. Pour vous donner un aperçu de cette section, voici le post le plus récent ci-dessous :</p>
        <br />
        {/* If the posts list is empty, displays a message: No posts to display */}
        {posts.length === 0 && <p>Aucun post à afficher</p>}
        {/* Loops through the posts list to process each post */}
        {posts.map(post => (
          // Creates a <div> element for each post with a unique key
          <div key={post.id}>
            {/* Displays the post information (title, subject and part of the content) */}
            <h4>{post.title}</h4>
            <p>{post.content.substring(0, 100)}...</p>
            <br />
          </div>
        ))}
         <br />
         <p>L'autre partie de l'application est la section Article. Dans cette section, les membres d'Autistic Eye ont accès à toutes les ressources externes qui les concernent, comme les démarches administratives, les associations, et bien plus encore.</p>
         <br />
         <p>ARTICLE LE PLUS RECENT</p>
         <br />
         <p>Viens nous rejoindre en cliquant sur le boutton ci-dessous :</p>
         <br />
         <button onClick={handleRegister}>Inscription</button>
        </div>
      )}
    </>
  )
}

export default Home
