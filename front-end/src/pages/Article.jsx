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
    // Used to load the URL of the next page
    const [nextPage, setNextPage] = useState(null);
    // Used to load the URL of the previous page
    const [prevPage, setPrevPage] = useState(null);

    // Function to retrieve articles from a given URL
    const fetchArticle = (url = "http://localhost:8000/api/article/") => {
      // Used to retrieve the authentication token of the logged in user.
      const token = localStorage.getItem('accessToken');

      // Make an HTTP GET request to your Django API 
      fetch(url, {
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
        // Populates the item list with items received from the API
        setArticles(data.results);
        // Saves the URL of the next page for pagination
        setNextPage(data.next);
        // Saves the URL of the previous page for pagination
        setPrevPage(data.previous);  
        setLoading(false);
      })
      .catch(err => {
        // Logs the error message in the error state.
        setError(err.message);
        // Stops the loading state.
        setLoading(false);
      });
   }

    // Call the API on every page load or URL change
    useEffect(() => {
      fetchArticle();
    // Executes this code only once, when the component is first displayed
    }, []);

    if (!user) {
      return <Navigate to="/Register_and_login" />;
    }

    if (loading) {
      return <p>Chargement des articles...</p>;
    } 
    if (error) {
      return <p>Erreur : {error}</p>;
    }

    return (
      <>
          <div>
          <h3>Articles</h3>
          <br />
          <p className="sizetext"> Retrouvez ici la liste de tous les articles liés à l’autisme provenant de différentes sources.</p>
          <br />
          <br />
          <div className="cards-grid">
          {/* For each article in articles, we will display a personalized article "card" */}
          {articles.map(article => (
            // With this line, each article is displayed in a separate <div>
            <div key={article.id} style={{ marginBottom: '20px' }} className="card">
            {/* Displays the title of the article */}
            <h2 className="card-header">{article.title.substring(0, 50)}...</h2>
            {/* The user can click “Read more” to open the article in another tab. */}
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="card-content">Lire plus</a>
            {/* Displays the title of the article */}
            <p><small>{new Date(article.publication_date).toLocaleDateString()}</small></p>
            </div>
            ))}
            </div>
           {/* Pagination button that appears even if there is only one post */}
          <div style={{ marginTop: '20px' }}>
            <button onClick={() => fetchArticle(prevPage || '#')} disabled={!prevPage}>Page précédente</button>
            <button onClick={() => fetchArticle(nextPage || '#')} disabled={!nextPage} style={{ marginLeft: '10px' }}>Page suivante</button>
          </div>
          </div>
      </>
  )
}

export default Article
