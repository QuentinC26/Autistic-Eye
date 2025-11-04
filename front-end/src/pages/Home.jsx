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
  // List of articles to display
  const [articles, setArticles] = useState([]);
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

    // You tell React what to do when the page is rendered or when the user logs in or out.
    useEffect(() => {
      // Retrieves the token stored in the browser
      const token = localStorage.getItem('accessToken');

      // Retrieves the token stored in the browser
      let url = 'http://localhost:8000/api/article/';

      // If the user is logged in, add ?limit=5 to the URL (so 5 articles).
      // Otherwise, add ?limit=1 (only the most recent).
      if (user) {
        url += '?limit=3';
      } else {
        url += '?limit=1';
      }

      // Call the fetch() function to send an HTTP request to the address contained in the url variable
      fetch(url, {
        headers: {
          'Authorization': token ? `Token ${token}` : '',
          'Content-Type': 'application/json'
        }
      })
      // When the server response arrives, execute this code with that response.
      .then(res => {
        if (!res.ok) { 
          throw new Error('Erreur ' + res.status);
        } else {
          // Transforms the response (res) into a JavaScript object via res.json()
          return res.json();
        }
      })
      // Receives JSON data once it is converted
      .then(data => {
        // Checks if data.results exists and if it is an array.
        if (data.results && Array.isArray(data.results)) {
          // Updates the React articles state with the first 3 elements of the array (slice(0, 3))
          setArticles(data.results.slice(0, 3));
        } else {
          // Empty the list (items = []).
          setArticles([]);
        }
      })
      .catch(err => {
        console.error("Erreur fetch articles", err);
        setArticles([]);
      });
    // Code executes every time the user variable changes
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
        <p className="sizetext"> Voici les trois post les plus récents :</p>
        <br />
        <br />
        <div className="cards-grid">
        {/* If the posts list is empty, displays a message: No posts to display */}
        {posts.length === 0 && <p>Aucun post à afficher</p>}
        {/* Loops through the posts list to process each post */}
        {posts.map(post => (
          // Creates a <div> element for each post with a unique key
          <div key={post.id} className="card">
          <div className="card-header"><h4>{post.title}</h4></div>
          <div className="card-content">{post.content.substring(0, 80)}...</div>
          </div>
        ))}
        </div>
        <br />
        <br />
        <p className="sizetext">Voici les trois articles les plus récents :</p>
        <br />
        <br />
        <div className="cards-grid">
        {/* If the posts articles is empty, displays a message: No articles to display */}
        {articles.length === 0 && <p>Aucun article à afficher</p>}
        {/* Loops through the articles list to process each article */}
        {articles.map(articles => (
          // Creates a <div> element for each article with a unique key
          <div key={articles.id} className="card">
            <div className="card-header"><h4>{articles.title.substring(0, 80)}...</h4></div>
            <a href={articles.link} target="_blank" rel="noopener noreferrer" className="card-content">Lire plus</a>
            <br />
            <br />
            <medium>{new Date(articles.publication_date).toLocaleDateString()}</medium>
            <br />
          </div>
        ))}
        </div>
        <br />
      </div>
    ) : (
      <div>
        <h3>Bienvenue sur Autistic Eye !!</h3>
        <br />
        <p className="sizetext">Autistic Eye est un réseau social communautaire qui réunit les personnes autistes et leurs proches. Son but est de combattre l'isolement des personnes autistes et de leur permettre de partager leurs expériences. Les membres d'Autistic Eye ont un accès illimité à la partie Communauté, qui leur permet de partager leurs expériences, d'échanger entre eux et d'obtenir de l'aide. Pour vous donner un aperçu de cette section, voici le post le plus récent ci-dessous :</p>
        <br />
        <div className="cards-grid">
        {/* If the posts list is empty, displays a message: No posts to display */}
        {posts.length === 0 && <p>Aucun post à afficher</p>}
        {/* Loops through the posts list to process each post */}
        {posts.map(post => (
          // Creates a <div> element for each post with a unique key
          <div key={post.id} className="card">
            {/* Displays the post information (title, subject and part of the content) */}
            <div className="card-header"><h4>{post.title}</h4></div>
            <div className="card-content"><p>{post.content.substring(0, 100)}...</p></div>
          </div>
        ))}
        </div>
        <br />
        <p className="sizetext">L'autre partie de l'application est la section Article. Dans cette section, les membres d'Autistic Eye ont accès à toutes les ressources externes qui les concernent, comme les démarches administratives, les associations, et bien plus encore.</p>
        <br />
        <div className="cards-grid">
        {/* If the articles list is empty, displays a message: No articles to display */}
        {articles.length === 0 && <p>Aucun post à afficher</p>}
        {/* Loops through the articles list to process each article */}
        {articles.map(articles => (
          // Creates a <div> element for each article with a unique key
          <div key={articles.id} className="card">
            {/* Displays the article information (title, subject and part of the content) */}
             <div className="card-header"><h4>{articles.title}</h4></div>
             <a href={articles.link} target="_blank" rel="noopener noreferrer" className="card-content">Lire plus</a>
             <br />
             <br />
             <medium>{new Date(articles.publication_date).toLocaleDateString()}</medium>
            <br />
          </div>
        ))}
        </div>
        <br />
        <p className="sizetext"> Viens nous rejoindre en cliquant sur le boutton ci-dessous :</p>
        <br />
        <button onClick={handleRegister} className="buttonforregister">Inscription</button>
        <br />
        <br />
      </div>
    )}
  </>
)}

export default Home
