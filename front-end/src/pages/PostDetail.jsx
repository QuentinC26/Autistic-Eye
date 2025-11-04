import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
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
  // It is used to determine if the post is being edited.
  const [isEditingPost, setIsEditingPost] = useState(false);
  // Remembers the ID of the comment being edited (or null if none).
  const [editingCommentId, setEditingCommentId] = useState(null);
  // Temporary states for editing
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

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
        setNewTitle(data.title);
        setNewContent(data.content);
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
      // Displays existing comments when the component loads
      .then(data => {
        // data.results is for data that has been paginated
        const filtered = data.results
          // Keep only comments that belong to the displayed post
          ? data.results.filter(comment => comment.post === Number(id)) 
          // Does the same as the line above but for the case where the page is not paginated
          : data.filter(comment => comment.post === Number(id));
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
    const token = localStorage.getItem('accessToken');
    fetch('http://localhost:8000/api/community/commentaries/', {
      headers: {
        // Adds the authentication token stored in localStorage (used to prove that the user is logged in)
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        const filtered = data.results
          ? data.results.filter(comment => comment.post === Number(id)) 
          : data.filter(comment => comment.post === Number(id));
        setComments(filtered);
      });
  };

  // Asynchronous function called when the "Edit" button is clicked
  const handleEdit = async (event) => {
    // Prevents the page from reloading
    event.preventDefault();

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
      // Resets the isEditingPost state to false, which exits edit mode and returns the post to its normal display.
      setIsEditingPost(false);
    };

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
  };

  // Function called when the "Delete" button is clicked
  const handleDelete = async () => {
    // Confirmation window to verify that the user really wants to delete the post
    const confirmDelete = window.confirm("Es-tu sûr de vouloir supprimer ce post ?");
    // If the user clicks "Cancel", the deletion is interrupted
    if (!confirmDelete) return;

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
  };

  // Asynchronous function called when the "Edit" button is clicked
  const EditComment = async (event, commentId) => {
    event.preventDefault();

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
        body: JSON.stringify({ content: newContent })
      });
      // Used to exit comment editing mode, indicating that no comments are currently being edited.
      setEditingCommentId(null);
    }

    // Allows you to retrieve updated data
    const res = await fetch(`http://localhost:8000/api/community/commentaries/`, {
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      }
    });
    const updatedCommentPost = await res.json();
    const commentsArray = Array.isArray(updatedCommentPost.results)
      ? updatedCommentPost.results
      : updatedCommentPost;
    const filteredComments = commentsArray.filter(comment => comment.post === Number(id));
    setComments(filteredComments);
  };

  // Function called when the "Delete" button is clicked
  const DeleteComment = async (commentId) => {
    const confirmDelete = window.confirm("Es-tu sûr de vouloir supprimer ce commentaire ?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:8000/api/community/commentaries/${commentId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      }
    });

    setComments(comments.filter(comment => comment.id !== commentId));
  };

  // Allows the field to grow naturally over time
  const autoResize = (event) => {
    // Allows you to reset the height to 0
    event.target.style.height = "auto";
    // Allows the textarea to resize according to what the user writes
    event.target.style.height = event.target.scrollHeight + "px";
  };

  // Displays a loading message until the post data is available.
  if (!post) return <p>Chargement...</p>;

  return (
  <div><h3>Post sélectionné :</h3>
    <div className="card_postdetails">
      {/* Displaying or editing the post */}
      {isEditingPost ? (
        <form onSubmit={handleEdit}>
          <input
            type="text"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            style={{ 
              width: '100%', 
              backgroundColor: '#FFF48D',
              marginBottom: '10px',
              fontSize: '16px',
              // black border
              border: '1px solid black',
              borderRadius: '2px'}}
          />
          <textarea
            value={newContent}
            onChange={(event) => {
              setNewContent(event.target.value); 
              // Activates self-adjustment
              autoResize(event); 
            }}
            // Defines the minimum height
            rows={3}
            style={{
              width: '100%',
              minHeight: '100px',
              // Prevents manual resizing
              resize: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#FFF48D', 
              fontSize: '16px',
              // black border
              border: '1px solid black',
              borderRadius: '2px'
            }}
          />
          <button type="submit">Enregistrer</button>
          <button type="button" onClick={() => setIsEditingPost(false)}>Annuler</button>
        </form>
      ) : (
        <>
          <h3>{post.title}</h3>
          <h5>{post.subject}</h5>
          <p>{post.content}</p>

          {user?.email === post.author.email && (
            <>
              <button onClick={() => setIsEditingPost(true)}>Modifier</button>
              <button onClick={handleDelete}>Supprimer</button>
            </>
          )}
        </>
      )}
    </div>

    <hr />

    <h3>Commentaires</h3>
    <div className="cards-grid">
      {comments.map(comment => (
        <div key={comment.id} className="card_postdetails">
          {editingCommentId === comment.id ? (
            <form onSubmit={(event) => EditComment(event, comment.id)}>
              <textarea
                value={comment.content}
                onChange={(event) => {
                  const updated = comments.map(c =>
                    c.id === comment.id ? { ...c, content: event.target.value } : c
                  );
                  setComments(updated);
                  setNewContent(event.target.value);
                  // Activates self-adjustment
                  autoResize(event); 
            }}
            // Defines the minimum height
            rows={3}
            style={{
              width: '100%',
              minHeight: '100px',
              // Prevents manual resizing
              resize: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#FFF48D', 
              fontSize: '16px',
              // black border
              border: '1px solid black',
              borderRadius: '2px'
            }}
          />
              <button type="submit">Enregistrer</button>
              <button type="button" onClick={() => setEditingCommentId(null)}>Annuler</button>
            </form>
          ) : (
            <>
              <p>{comment.content} — {comment.author.first_name} {comment.author.last_name}</p>
              {user?.email === comment.author.email && (
                <>
                  <button onClick={() => { setEditingCommentId(comment.id); setNewContent(comment.content); }}>Modifier</button>
                  <button onClick={() => DeleteComment(comment.id)}>Supprimer</button>
                </>
              )}
            </>
          )}
        </div>
      ))}
    </div>

    <br /><br />
    <textarea
      placeholder="Ajouter un commentaire..."
      value={newComment}
      onChange={event => { setNewComment(event.target.value)
        // Activates self-adjustment
        autoResize(event); 
      }}
      // Defines the minimum height
      rows={3}
      style={{
        width: '100%',
        minHeight: '100px',
        // Prevents manual resizing
        resize: 'none',
        boxSizing: 'border-box',
        backgroundColor: '#FFF48D', 
      }}
    />
    <br />
    <button onClick={AddComment}>Commenter</button>
  </div>
);
}

export default PostDetail;
