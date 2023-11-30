import { Link } from 'react-router-dom'

import { routes } from '../routes/routes'

const Home = () => {
  return (
    <>
      <Link to={routes.얼굴랜드마트}>
        <p>face-landmark-detection</p>
      </Link>
      <Link to={routes.슈팅게임}>
        <p>shooting game</p>
      </Link>
    </>
  )
}

export default Home
