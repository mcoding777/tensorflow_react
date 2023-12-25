import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { routes } from './routes'

const P_홈 = lazy(() => import('../Main/Home'))
const P_슈팅게임 = lazy(() => import('../Shooting/ShootingGame'))
const P_얼굴랜드마크 = lazy(() => import('../FaceLandmark/FaceLandmarkDetection'))
const P_마이홈 = lazy(() => import('../Myhome/Myhome'))

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <P_홈 />,
      },
      {
        path: routes.얼굴랜드마트,
        element: <P_얼굴랜드마크 />,
      },
      {
        path: routes.슈팅게임,
        element: <P_슈팅게임 />,
      },
      {
        path: routes.마이홈,
        element: <P_마이홈 />,
      },
    ],
  },
])
