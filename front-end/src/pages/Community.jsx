import './App.css'
// Access the data of the context you created
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, Navigate, useLocation } from "react-router-dom";


function Community() {
   // Get the user from the context
    const { user } = useContext(AuthContext);
    // posts is a state variable (for example, React "listens" to its value and updates the rendering if it changes).
    // setPosts is the function for modifying posts.
    // useState([]) means: "I'm starting with an empty list."
    const [posts, setPosts] = useState([]);
    const location = useLocation()
     // Indicates whether data retrieval is in progress.
    const [loading, setLoading] = useState(true);
    // Contains an error message if the recovery fails. Initialized to null.
    const [error, setError] = useState(null);
    // Used to load the URL of the next page
    const [nextPage, setNextPage] = useState(null);
    // Used to load the URL of the previous page
    const [prevPage, setPrevPage] = useState(null);

    // Function to retrieve articles from a given URL
    const fetchPosts = (url = 'http://localhost:8000/api/community/posts/') => {
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
      .then(res => res.json())
      .then(data => {
        // Populates the item list with items received from the API
        setPosts(data.results);
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
    };

    // Call the API on every page load or URL change
    useEffect(() => {
      fetchPosts();
    }, [location]);
      
    if (!Array.isArray(posts)) {
      return <p>Chargement ou erreur, aucun post disponible.</p>;
    }

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
            <h3>Page Community</h3>
            <Link to="/community/new">
            <button>Créer un post</button>
            </Link>

            <ul>
            {/* Loop through all post objects in the array */}
            {posts.map(post => (
            <li key={post.id}>
            <Link to={`/community/posts/${post.id}`}>
            {post.title} — par {post.author.first_name} {post.author.last_name}
            </Link>
          </li>
        ))}
            </ul>
          {/* Pagination button that appears even if there is only one post */}
          <div style={{ marginTop: '20px' }}>
            <button onClick={() => fetchPosts(prevPage || '#')} disabled={!prevPage}>Page précédente</button>
            <button onClick={() => fetchPosts(nextPage || '#')} disabled={!nextPage} style={{ marginLeft: '10px' }}>Page suivante</button>
          </div>
          </div>
      </>
  )
}

export default Community;
