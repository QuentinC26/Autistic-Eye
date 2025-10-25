import './App.css'
// Access the data of the context you created
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// Component used to display the list of items
const Article = () => {
   // Get the user from the context
    const { user } = useContext(AuthContext);
    // Contains the list of items retrieved from the API.
    const [articles, setArticles] = useState([]);
    // Indicates whether data retrieval is in progress.
    const [loading, setLoading] = useState(true);
    // Contains an error message if the recovery fails. Initialized to null.
    const [error, setError] = useState(null);

    // Used to make an API call when the component is loaded
    useEffect(() => {
      // Used to retrieve the authentication token of the logged in user.
      const token = localStorage.getItem('accessToken');
      
      // Make an HTTP GET request to your Django API
      fetch('http://localhost:8000/api/article/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
      // Processes the response returned by the server after the fetch request
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des articles');
        }
        return response.json();
      })
      // Processes JSON data received from the API
      .then(data => {
        // Stores the received data (list of items) in the "items" state
        setArticles(data);
        // Indicates that loading is complete
        setLoading(false);
      })
      .catch(err => {
        // Logs the error message in the error state.
        setError(err.message);
        // Stops the loading state.
        setLoading(false);
      });
    // 
    }, []);

    if (loading) {
      return <p>Chargement des articles...</p>;
    } 
    if (error) {
      return <p>Erreur : {error}</p>;
    }

    return (
      <>
      {/* ? = the condition is True */}
      {/* : = the condition is False */}
       {user ? (
          <div>
          <h3>Articles</h3>
          {/* For each article in articles, we will display a personalized article "card" */}
          {articles.map(article => (
            // With this line, each article is displayed in a separate <div>
            <div key={article.id} style={{ marginBottom: '20px' }}>
            {/* Displays the title of the article */}
            <h2>{article.title}</h2>
            {/* Displays the description of the article */}
            <p>{article.description.length > 50
              // Condition that allows you to cut descriptions that are too long to avoid making the page heavier.
              ? article.description.slice(0, 50) + "..."
              : article.description}</p>
            {/* The user can click “Read more” to open the article in another tab. */}
            <a href={article.link} target="_blank" rel="noopener noreferrer">Lire plus</a>
            {/* Displays the title of the article */}
            <p><small>{new Date(article.publication_date).toLocaleDateString()}</small></p>
             </div>
            ))}
           </div>
          ) : (
            // Redirects the user to the Register/Login page
            <Navigate to="/Register_and_login" />
        )}
      </>
  )
}

export default Article
