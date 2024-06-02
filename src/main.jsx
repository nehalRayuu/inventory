import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'; 
import './index.css'
import store from './components/Store/Store.jsx'
import { ChakraProvider} from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import  theme  from './assets/Theme.jsx';

const queryClient = new QueryClient();



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>   
     <BrowserRouter>
     <QueryClientProvider client={queryClient}>
      <Provider store={store}>  
       <ChakraProvider theme={theme} >
        <App />
       </ChakraProvider>    
      </Provider>
      </QueryClientProvider>
     </BrowserRouter> 
  </React.StrictMode>,
)
