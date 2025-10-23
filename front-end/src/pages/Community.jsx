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

    useEffect(() => {
      // Used to retrieve the authentication token of the logged in user.
      const token = localStorage.getItem('accessToken');
      console.log("Token:", token);

      fetch('http://localhost:8000/api/community/posts/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => setPosts(data));
    }, [location]);

    if (!Array.isArray(posts)) {
      return <p>Chargement ou erreur, aucun post disponible.</p>;
    }

    return (
      <>
      {/* ? = the condition is True */}
      {/* : = the condition is False */}
       {user ? (
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
          </div>
          ) : (
            // Redirects the user to the Register/Login page
            <Navigate to="/Register_and_login" />
        )}
      </>
  )
}

export default Community;
