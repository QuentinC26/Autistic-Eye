import AutisticEye from '../assets/Autistic_Eye.png'
import './Home.css'

function Article() {
  return (
    <>
      <div>
        <h1>Autistic Eye</h1>
        <a href="index.html" target="_blank">
          <img src={AutisticEye} className="logo Autistic Eye" alt="Autistic Eye logo" />
        </a>
      </div>
        <p>
        <a href="index.html" target="_blank">
          <h3>Article</h3>
        </a>
        </p>
    </>
  )
}

export default Article
