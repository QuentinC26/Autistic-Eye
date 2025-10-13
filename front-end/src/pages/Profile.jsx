import AutisticEye from '../assets/Autistic_Eye.png'
import './Home.css'

function Profile() {
  return (
    <>
      <div>
        <a href="index.html" target="_blank">
          <img src={AutisticEye} className="logo Autistic Eye" alt="Autistic Eye logo" />
        </a>
      </div>
        <p>
        <a href="index.html" target="_blank">
          <h3>Mon Profil :</h3>
         <br></br>
          <h5>first_name :</h5>
          <h5>last_name :</h5>
          <h5>age :</h5>
          <h5>location :</h5>
          <h5>email :</h5>
          <h5>password :</h5>
        </a>
        </p>
    </>
  )
}

export default Profile
