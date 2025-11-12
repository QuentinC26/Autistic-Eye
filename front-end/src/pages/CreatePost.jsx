import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Manages fields, validation and errors
import { useForm } from "react-hook-form";

function CreatePost() { 
    // Initializes the form with React Hook Form:
    // register: links each form field to internal management (values, validation, etc.)
    // handleSubmit: handles form submission and calls the onSubmit function if everything is valid
    // errors: contains validation error messages for each field
    // isSubmitting: indicates whether the form is being submitted (useful for disabling the button)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    // Stores network or backend errors
    const [errorMessage, setErrorMessage] = useState(null);
    // Get a navigate function that will be used to change pages in the application
    const navigate = useNavigate(); 
    // Stores the selected image
    const [image, setImage] = useState(null);

    const handleCreatePost = async (data) => {
        // setErrorMessage(null) resets errorMessage to indicate that there are no errors at the moment.
        setErrorMessage(null);

        // Prepare the data to send to your backend.
        const formData = new FormData();
        // Adds the data to the FormData “bag”
        formData.append("title", data.title);
        formData.append("subject", data.subject);
        formData.append("content", data.content);
        // Adds the image to the Formdata bag if the user includes an image.
        if (image) {
          formData.append("image", image);
        }

        try {
          // Sends an HTTP POST request to the API at the given URL
          const response = await fetch('http://localhost:8000/api/community/posts/', 
            { method: 'POST', 
                headers: { 
                    // Adds the authentication token stored in localStorage (used to prove that the user is logged in)
                    'Authorization': 'Token ' + localStorage.getItem('accessToken') 
                }, 
                body: formData,
            }); 

            // Handles the case where there is an error when retrieving the response
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.detail || "Erreur lors de la création du post.");
            }
            alert("Post publié avec succès !");
            navigate('/community');
      } catch (error) {
        setErrorMessage(error.message);
        console.error(error);
      }
    };

    // Allows the field to grow naturally over time
    const autoResize = (event) => {
      // Allows you to reset the height to 0
      event.target.style.height = "auto";
      // Allows the textarea to resize according to what the user writes
      event.target.style.height = event.target.scrollHeight + "px";
    };
 
    return (
      <div className="card">
      {/* Submit the form with field validation. */}
      <form onSubmit={handleSubmit(handleCreatePost)}
      // The style centers the form and limits its width.
      style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Créer un nouveau post</h2> 
      {/* Title field */}
      <label htmlFor="title">Titre :</label>
      <input
        id="title"
        type="text"
        placeholder="Titre du post"
        {...register("title", { required: "Le titre est obligatoire" })}
        style={{ width: "100%", boxSizing: "border-box" }}
      />
      {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
      <br></br>
      <br></br>
       {/* Subject field */}
      <label htmlFor="subject">Sujet :</label>
      <select
        id="subject"
        {...register("subject")}
        style={{ width: "100%", boxSizing: "border-box" }}
        defaultValue="Partage d’expérience"
      >
        <option value="Partage d’expérience">Partage d’expérience</option>
        <option value="Demande d’aide">Demande d’aide</option>
        <option value="Sondage">Sondage</option>
        <option value="Proposition">Proposition</option>
        <option value="Autre">Autre</option>
      </select>
      <br></br>
      <br></br>
      {/* Image */}
        <label htmlFor="image">Ajouter une image :</label>
        <input
          // Tells HTML that it's a file selector
          type="file"
          id="image"
          onChange={(event) => setImage(event.target.files[0])}
        />
      <br></br>
      <br></br>
        {/* Content Field */}
      <label htmlFor="content">Contenu :</label>
      <textarea
        id="content"
        placeholder="Racontez votre expérience..."
        {...register("content", { required: "Le contenu est obligatoire" })}
        // Activates self-adjustment
        onInput={autoResize}
        // Defines the minimum height
        rows={3}
        style={{
          width: "100%",
          minHeight: "100px",
          // Prevents manual resizing
          resize: "none",
          boxSizing: "border-box",
        }}
      />
      <button
        type="submit"
        // Locks the button during the fetch
        disabled={isSubmitting}
        style={{ padding: "0.5rem 1rem" }}
      >
        {isSubmitting ? "Publication..." : "Publier"}
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
    </div>
    )} 

export default CreatePost;
