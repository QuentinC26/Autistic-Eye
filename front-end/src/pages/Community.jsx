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
     // Current page where I am
    const [currentPage, setCurrentPage] = useState(1);
    // The total number of pages
    const [totalPages, setTotalPages] = useState(1);

    // Used to calculate the total number of pages to display in the pagination.
     const pageSize = 12;

    // Function that retrieves articles from your Django API
    const fetchPosts = async (page = 1) => {
      // Indicates that loading begins
      setLoading(true);
      // Used to retrieve the authentication token of the logged in user.
      const token = localStorage.getItem('accessToken');

      // Make an HTTP GET request to your Django API 
      fetch(`http://localhost:8000/api/community/posts/?page=${page}`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Erreur lors de la récupération des posts');
        }
        return res.json();
      })
      .then(data => {
        // Updates the React posts state with the results array returned by the backend
        // The "|| []" guarantees an empty list if data.results does not exist.
        setPosts(data.results || []);
        // Updates the current page in the React state
        setCurrentPage(page);
        // data.count = total number of posts in the database
        // Calculate the total number of pages and round up to the next highest number to ensure correct pagination.
        setTotalPages(Math.ceil(data.count / pageSize));
        // Indicates that loading is complete
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
      // Load the first page of articles automatically
      fetchPosts(1);
    }, [location]);
      
  // A function that will calculate the list of page numbers to display.
  const renderPageNumbers = () => {
    // Create an empty table that will contain the page numbers and possibly the ellipses.
    const pages = [];
    // Determine how many pages will be visible before and after the current page
    const visiblePages = 2;
    // Defines the first page to be displayed around the current page, while ensuring that it never goes below 1
    const start = Math.max(1, currentPage - visiblePages);
    // Defines the last page to be displayed around the current page, while ensuring that the total number of pages never exceeds the limit.
    const end = Math.min(totalPages, currentPage + visiblePages);

    // Condition that checks if the first visible page is not page 1.
    if (start > 1) {
      // Add the number 1 to the very beginning of the page numbering.
      pages.push(1);
      // If there are at least 2 hidden pages before the displayed block
      if (start > 2) {
        // So we add the...
        pages.push("...");
      }
    }

    // Adds all visible page numbers around the current page
    for (let index = start; index <= end; index++) {
      pages.push(index);
    }

    // Condition that checks if the last visible page is not the actual last page
    if (end < totalPages) {
      // Add ellipses before adding the last page if you're not already near the last page.
      if (end < totalPages - 1) {
        pages.push("...");
      }
      // Add the last page so the user can always access the end
      pages.push(totalPages);
    }

     // pages.map: We iterate through each element of the pages array.
     // num: The current value of the element. This can be a number (page) or "...".
     // index: The index of the element in the array. Useful for React keys when the element is text like "...".
     // return: Here, we return a new array containing JSX (React elements) to display.
     return pages.map((num, index) =>
      // Ternary condition that checks if num is "...".
      num === "..." ? (
        // Displays "..." for hidden pages
        <span key={index} style={{ margin: "0 5px", backgroundColor: "#FFF48D", padding: "5px 10px" }}>...</span>
      ) : (
        // Create a button if num is a number
        <button
          // Unique key for each button
          key={num}
          onClick={() => fetchPosts(num)}
          style={{
            margin: "0 5px",
            // Makes the text bold if it's the current page
            fontWeight: num === currentPage ? "bold" : "normal",
            backgroundColor: num === currentPage ? "#FFF48D" : "#FFF48D",
            border: "1px solid #FFF48D",
            padding: "5px 10px",
          }}
        >
          {/* Button Content */}
          {num}
         </button>
       )
     );
    };

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
            <h3>Communauté</h3>
             <br />
             <p className="sizetext"> Sur cette page, vous avez la possibilité de créer votre post, de consulter la liste de tous les posts existants et de lire ceux qui vous intéressent.</p>
            <br />
            <br />
            <Link to="/community/new">
            <button>Créer un post</button>
            </Link>
            <br />
            <br />
            <div className="cards_community-grid">
            {/* Loop through all post objects in the array */}
            {posts.map(post => (
            <div key={post.id} className="card_community">
            <Link to={`/community/posts/${post.id}`}>
            {post.title} — par {post.author.first_name} {post.author.last_name}
            </Link>
          </div>
        ))}
        </div>
      {/* Pagination with ellipses */}
      {/* Create a container for the pagination buttons and add a space above it. */}
      <div style={{ marginTop: "20px" }}>
        <button
          // When you click, the fetchArticles function is called, taking you to the previous page.
          onClick={() => fetchPosts(currentPage - 1)}
          // The button is disabled if you are already on the first page to prevent going below 1
          disabled={currentPage === 1}
        >
        Page précédente
        </button>

        {/* Call the function renderPageNumbers() */}
        {renderPageNumbers()}

        <button
          // Loads the next page
          onClick={() => fetchPosts(currentPage + 1)}
          // Disable the button if you are on the last page to avoid exceeding the total number of pages.
          disabled={currentPage === totalPages}
          style={{ marginLeft: "10px" }}
        >
        Page suivante
        </button>
      </div>
    </div>
    </>
  );
};

export default Community;
