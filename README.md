- To start backend
    `cd backend`
    `node app.js`
- To start frontend
    `cd frontend`
    `npm run start`

##Router
The documentation can be found https://reactrouter.com/en/main
- To install router run `npm install react-router-dom`
- Create router/index.js
    - import {
          createBrowserRouter,
      } from 'react-router-dom';
    - define the available pages
    - import HomePage from '../pages/Home';
    - const router = createBrowserRouter([
         {
            path: '/',
            element:  'RootLayout', //Component which has to be rendered as page
            errorElement: <ErrorPage/>,  //Error page if user tpe wrong url
            children: [
                        {
                            index: true,  // to set default  route, that should be loaded when parent route is active
                          //  path: '', // '/' - absolute path, thus here we need to use relative path
                            element: <HomePage/> // component that should be rendered
                        },
                        {
                            path: 'products',
                            element: <ProductsPage/>
                        },
                        {
                            path: 'products/:productId',   //:productId - variable for dynamic routes
                            element: <ProductDetailPage/>
                        }
                    ]

         },
         {}  //represents one route
    ])
- in App.js
   - import { RouterProvider } from 'react-router-dom';
   - import router from './router/index';
   - function App () {
         return <RouterProvider router={router}/>;
     }
- in place where we want to display all pages - RootLayout -add <Outlet/>

- To reach the route (navigate) to it
    - import { NavLink } from 'react-router-dom';
    -    <NavLink
            className={({ isActive }) => { return isActive ? classes.active : undefined;}}  //isActive - pass automatically by React
            to=''   //relative path
            end>    // end={true} React will consider the route as active only if it finishes ''(relative pass as mentioned in "to") if end={false}  React will consider the route as active if it has '' (relative pass as mentioned in "to")
        </NavLink>
        - to style nav link use a:hover,
                                a.active
                                a
     OR
     - import {Link} from 'react-router-dom';
     <Link to = {`/products/${id}`}>Text</Link>
- Programatically navigate to the pages - To get access to navigation object
   import {useNavigate} from 'react-router-dom';

   const navigate = useNavigate();
   navigate('/');
   navigate('products')

- Dynamic routes
  - in router
        path: 'products/:productId',
  - in component we need this parameter
    import { useParams} from 'react-router-dom';
    const params = useParams();
    productId = params.productId //the same as in router

- Paths are relative this means that child routes are appended to parent route
- To go back   <p><Link to = ".." relative='path'>Back</Link></p>


- Loader property
    to perform the action while navigation to page add loader property to router
    -  loader: eventsLoader, //eventsLoader - function which is executed just before the react navigate to the page, as a rule this function is defined at the component/page we need these data
    - at the page the data returned from loader is available
        import { useLoaderData } from 'react-router-dom';
        const {events} = useLoaderData(PATH or ID);
    - to use async and perform few action add

        export async function loader () {
            // React hooks can NOT be used here
            return defer({
                events: await loadEvents()    // to execute function which return promise
                event: await loadEvent(id)
                .....
            });

        }

        - to ReactRouter will wait till data is fetched

         const {events} = useRouteLoaderData('events'); // data that returns from loader
        return
        <Suspense fallback={<p style={{textAlign : 'center'}}>Loading...</p>}>
               <Await resolve={events}>
                    {loadedEvents => <EventsList events={loadedEvents}/>}
                </Await>
         </Suspense>

        - it there is error,  router will render the closest ErrorElement
        - Handling Error
           if error occurred and new Error is thrown, ReactRouter renders the closest ErrorElement (in router.index)
            then trow error
                OR
            import { json } from 'react-router-dom';
            use  throw json({message: "TExt"}, {status: 500}) if !response.ok

- Loading route indicator
    It is visible NOT at the page that is loaded but on lower level, which is already rendered (RootLayout)
    import { useNavigation} from 'react-router-dom';
    const navigation = useNavigation();
    navigation.state can be 'loading'/'submiting'/'idle'
        {navigation.state === 'loading' && <p>Loading... </p>}



