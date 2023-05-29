import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Example from './pages/Example';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "example",
        element: <Example />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Page Not Found</h1>
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
