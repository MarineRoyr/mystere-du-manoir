import { createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import Layout from './pages/layout/Layout'
import FirstStep from '../components/pages/FirstStep'
import SecondStep from '../components/pages/SecondStep'
import ThirdStep from '../components/pages/ThirdStep'
import FourStep from '../components/pages/FourStep'
import FiveStep from '../components/pages/FiveStep'
import SixStep from '../components/pages/SixStep'
import SevenStep from '../components/pages/SevenStep'
import UltimateStep from '../components/pages/UltimateStep'
import RituelStep from '../components/pages/RituelStep'
import Score from '../components/pages/ScoreStep'
import App from './App'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/first-step',
        element: <FirstStep />
      },
      {
        path: '/second-step',
        element: <SecondStep />
      },
      {
        path: '/third-step',
        element: <ThirdStep />
      },
      {
        path: '/four-step',
        element: <FourStep />
      },
      {
        path: '/five-step',
        element: <FiveStep />
      },
      {
        path: '/six-step',
        element: <SixStep />
      },
      {
        path: '/seven-step',
        element: <SevenStep />
      },
      {
        path: '/ultimate-step',
        element: <UltimateStep />
      },
      {
        path: '/rituel-step',
        element: <RituelStep />
      },
      {
        path: '/score-step',
        element: <Score />
      }
    ]
  }
]);

export default Router;