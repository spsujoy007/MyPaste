import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { routes } from './Routes/Routes';

function App() {
  return (
    <div>
       <RouterProvider router={routes}></RouterProvider>
       <Toaster 
          position="bottom-left"
          reverseOrder={false}>
        </Toaster>
    </div>
  );
}

export default App;
