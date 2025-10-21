import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PostDetail() {
  // Retrieves the id parameter from the URL
  const { id } = useParams();
  // State to store post data retrieved from the API
  const [post, setPost] = useState(null);
  // State to store the list of comments related to the post
  const [comments, setComments] = useState([]);
  // State to manage the content of the new comment entered by the user
  const [newComment, setNewComment] = useState('');

  // This code runs at the start, and every time you change posts
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    // This is the API call to get the post details.
    fetch(`http://localhost:8000/api/community/posts/${id}/`, {
      headers: {
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

      <h3>Commentaires</h3>
      {/* Go through each comment and display it with its author. */}
      {comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.content} — {comment.author}</p>
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
