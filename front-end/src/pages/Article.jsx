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
    // Current page where I am
    const [currentPage, setCurrentPage] = useState(1);
    // The total number of pages
    const [totalPages, setTotalPages] = useState(1);

    // Used to calculate the total number of pages to display in the pagination.
     const pageSize = 12;

    // Function that retrieves articles from your Django API
    const fetchArticles = async (page = 1) => {
    try {
      // Indicates that loading begins
      setLoading(true);
      // Used to retrieve the authentication token of the logged in user.
      const token = localStorage.getItem("accessToken");
    
      const response = await fetch(`http://localhost:8000/api/article/?page=${page}`, {
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Prevents the application from continuing if the server has not responded correctly
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des articles');
      }

      // Wait for the HTTP response to finish reading and convert it into usable JSON.
      const data = await response.json();

      // Updates the React articles state with the results array returned by the backend
      // The "|| []" guarantees an empty list if data.results does not exist.
      setArticles(data.results || []);
      // data.count = total number of articles in the database
      // Calculate the total number of pages and round up to the next highest number to ensure correct pagination.
      setTotalPages(Math.ceil(data.count / pageSize));
      // Updates the current page in the React state
      setCurrentPage(page);
      } catch (err) {
      // Contains the error text
      setError(err.message);
    } finally {
      // Indicates that loading is complete
      setLoading(false);
    }
  };
    
  // Call the API on every page load or URL change
  useEffect(() => {
    // Load the first page of articles automatically
    fetchArticles(1);
  // Executes this code only once, when the component is first displayed
  }, []);

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
          onClick={() => fetchArticles(num)}
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
      <br />
      <br />
      {/* Displays the title of the article */}
      <span className="medium-text">{new Date(article.publication_date).toLocaleDateString()}</span>
      </div>
      ))}
      </div>
      {/* Pagination with ellipses */}
      {/* Create a container for the pagination buttons and add a space above it. */}
      <div style={{ marginTop: "20px" }}>
        <button
          // When you click, the fetchArticles function is called, taking you to the previous page.
          onClick={() => fetchArticles(currentPage - 1)}
          // The button is disabled if you are already on the first page to prevent going below 1
          disabled={currentPage === 1}
        >
          Précédente
        </button>

        {/* Call the function renderPageNumbers() */}
        {renderPageNumbers()}

        <button
          // Loads the next page
          onClick={() => fetchArticles(currentPage + 1)}
          // Disable the button if you are on the last page to avoid exceeding the total number of pages.
          disabled={currentPage === totalPages}
          style={{ marginLeft: "10px" }}
        >
          Suivante
        </button>
      </div>
    </div>
    </>
  );
};

export default Article;
