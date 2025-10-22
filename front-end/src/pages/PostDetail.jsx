import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

function PostDetail() {
  // Retrieves the id parameter from the URL
  const { id } = useParams();
  // State to store post data retrieved from the API
  const [post, setPost] = useState(null);
  // State to store the list of comments related to the post
  const [comments, setComments] = useState([]);
  // State to manage the content of the new comment entered by the user
  const [newComment, setNewComment] = useState('');
  // Get the user from the context
  const { user } = useContext(AuthContext);
  // Get a navigate function that will be used to change pages in the application
  const navigate = useNavigate();

  // This code runs at the start, and every time you change posts
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    // This is the API call to get the post details.
    fetch(`http://localhost:8000/api/community/posts/${id}/`, {
      headers: {
        // Allows you to identify the connected user with their token
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      },
    })
      // This line transforms the raw response into usable data.
      .then(res => res.json())
      // This line stores the post information in the state so that it can be displayed.
      .then(data => {
        setPost(data);
      });

    // Request all comments
    fetch('http://localhost:8000/api/community/commentaries/', {
      headers: {
        // Adds the authentication token stored in localStorage (used to prove that the user is logged in)
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      },
    })
      // This line transforms the raw response into usable data.
      .then(res => res.json())
      // Process the list of comments
      .then(data => {
        // Keep only comments associated with the displayed post
        const filtered = data.filter(comment => comment.post === Number(id));
        // Saves filtered comments for display
        setComments(filtered);
      });
    // Restart this code every time the ID changes (e.g. new article displayed)
  }, [id]);

  // Function called when the user clicks “Comment”
  const AddComment = async () => {
    await fetch('http://localhost:8000/api/community/commentaries/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Adds the authentication token stored in localStorage (used to prove that the user is logged in)
        'Authorization': 'Token ' + localStorage.getItem('accessToken'),
      },
      // The content and ID of the post are sent in the body
      body: JSON.stringify({ content: newComment, post: id }),
    });

    // Reset the input field so the user can write a new comment without having to delete the old one.
    setNewComment('');

    // Refresh the comments list after adding the new one.
    fetch('http://localhost:8000/api/community/commentaries/', {
      headers: {
        // Adds the authentication token stored in localStorage (used to prove that the user is logged in)
        'Authorization': 'Token ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    })
      // This line transforms the raw response into usable data.
      .then(res => res.json())
      // Show only comments on the current post, including the new one just added.
      .then(data => {
        const filtered = data.filter(comment => comment.post === Number(id));
        setComments(filtered);
      });
  };
   
   // Asynchronous function called when the "Edit" button is clicked
   const handleEdit = async () => {
      // Asks the user to modify items via windows prompt()
      const newTitle = prompt("Nouveau titre :", post.title);
      const newContent = prompt("Nouveau contenu :", post.content);

      // Checks that the user has not clicked “Cancel” and left the fields blank.
      if (newTitle && newContent) {
        await fetch(`http://localhost:8000/api/community/posts/${id}/`, {
          method: 'PUT',
          headers: {
            // Adds the authentication token stored in localStorage (used to prove that the user is logged in)
            'Authorization': 'Token ' + localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
          },
          // Returns the data (even unchanged) to update the post in the database
          body: JSON.stringify({
            title: newTitle,
            content: newContent,
            subject: post.subject
          })
        });

      // Allows you to retrieve updated data
      const res = await fetch(`http://localhost:8000/api/community/posts/${id}/`, {
        headers: {
          // Adds the authentication token stored in localStorage (used to prove that the user is logged in)
          'Authorization': 'Token ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      // Updates the displayed post without reloading the page
      const updatedPost = await res.json();
      setPost(updatedPost);
      }
    };

    // Function called when the "Delete" button is clicked
    const handleDelete = async () => {
        // Confirmation window to verify that the user really wants to delete the post
        const confirmDelete = window.confirm("Es-tu sûr de vouloir supprimer ce post ?")
        // If the user clicks "Cancel", the deletion is interrupted
        if (!confirmDelete) {
          return;
        } 

      // Sends a DELETE request to the API to delete the post in question.
      await fetch(`http://localhost:8000/api/community/posts/${id}/`, {
        method: 'DELETE',
        headers: {
          // Adds the authentication token stored in localStorage (used to prove that the user is logged in)
          'Authorization': 'Token ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
       }
    });
    
    navigate('/community');
    }

    // Asynchronous function called when the "Edit" button is clicked
   const EditComment = async (commentId, commentContent) => {
      // Asks the user to modify items via windows prompt()
      const newContent = prompt("Nouveau contenu :", commentContent);

      // Checks that the user has not clicked “Cancel” and left the fields blank.
      if (newContent) {
        await fetch(`http://localhost:8000/api/community/commentaries/${commentId}/`, {
          method: 'PUT',
          headers: {
            // Adds the authentication token stored in localStorage (used to prove that the user is logged in)
            'Authorization': 'Token ' + localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
          },
          // Returns the data (even unchanged) to update the comments of the post in the database
          body: JSON.stringify({
            content: newContent,
          })
        });

      // Allows you to retrieve updated data
      const res = await fetch(`http://localhost:8000/api/community/commentaries/`, {
        headers: {
          // Adds the authentication token stored in localStorage (used to prove that the user is logged in)
          'Authorization': 'Token ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      // Updates the displayed post without reloading the page
      const updatedCommentPost = await res.json();
      // Keep only comments that belong to the current post
      const filteredComments = updatedCommentPost.filter(comment => comment.post === Number(id));
      // Updates the list of displayed comments with those filtered from the current post
      setComments(filteredComments);
      }
    };

    // Function called when the "Delete" button is clicked
    const DeleteComment = async (commentId) => {
        // Confirmation window to verify that the user really wants to delete the comment
        const confirmDelete = window.confirm("Es-tu sûr de vouloir supprimer ce commentaire ?")
        // If the user clicks "Cancel", the deletion is interrupted
        if (!confirmDelete) {
          return;
        } 

      // Sends a DELETE request to the API to delete the post in question.
      await fetch(`http://localhost:8000/api/community/commentaries/${commentId}/`, {
        method: 'DELETE',
        headers: {
          // Adds the authentication token stored in localStorage (used to prove that the user is logged in)
          'Authorization': 'Token ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
       }
    });
    // Used to remove a specific comment from the displayed list, without making another call to the server
    setComments(comments.filter(comment => comment.id !== commentId));
   }

  // Displays a loading message until the post data is available.
  if (!post) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <h4>{post.subject}</h4>
      <p>{post.content}</p>
      <hr />

      {/* Show buttons only if the user is the author of the post */}
      {/* setUser?.id = "Give me user.username only if user exists" */}
      {user?.email === post.author.email && (
        <>
          <button onClick={handleEdit}>Modifier</button>
          <button onClick={handleDelete}>Supprimer</button>
        </>
      )}

      <hr />

      <h3>Commentaires</h3> 
      {/* Go through each comment and display it with its author. */}
      {comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.content} —  {comment.author.first_name} {comment.author.last_name}</p>
          {/* Show buttons only if the user is the author of the post */}
          {/* setUser?.username = "Give me user.username only if user exists" */}
          {user?.email === post.author.email && (
            <>
              <button onClick={() => EditComment(comment.id, comment.content)}>Modifier</button>
              <button onClick={() => DeleteComment(comment.id)}>Supprimer</button>
            </>
          )}
        </div>
      ))}
      <br />
      <textarea
      placeholder="Ajouter un commentaire..."
      value={newComment}
      onChange={event => setNewComment(event.target.value)}
      />
      <br />
      <button onClick={AddComment}>Commenter</button>
    </div>
  );
}

export default PostDetail;
