import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import Tasks from './pages/Task'
import './index.css'

import './index.css' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Tasks />
  </Provider>
)
