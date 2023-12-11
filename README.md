- To start backend
    `cd backend`
    `node app.js`
- To start frontend
    `cd frontend`
    `npm run start`

###Router
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
   - `function App () {
         return <RouterProvider router={router}/>;
     }`
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
        import { useRouteLoaderData } from 'react-router-dom';
        const {events} =useRouteLoaderData(ID);

        OR if it is the direct page with loader

        import { useLoaderData } from 'react-router-dom';
        const {events} = useLoaderData();

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
            use  throw json({message: "Text"}, {status: 500}) if !response.ok

- Loading route indicator
    It is visible NOT at the page that is loaded but on lower level, which is already rendered (RootLayout)
    import { useNavigation} from 'react-router-dom';
    const navigation = useNavigation();
    navigation.state can be 'loading'/'submiting'/'idle'
        {navigation.state === 'loading' && <p>Loading... </p>}

- To redirect page
    import { redirect } from 'react-router-dom';
    redirect('/events');

- To send form data
    - add actions in router.js to needed route. This action is as a rule define in the component that need these data
    - import {Form} from 'react-router-dom';
            !!!! Form will NOT be sent to BE, but all data will be sent to action in Router
    - all fields has to have field name attribute
    - {request, params} is sent automatically to route action, by clicking <button type='submit'> inside <Form>
    - request contains all form data
    - to get form data => formData = await request.formData();
    - data.get('fieldName');
    - to set error data (for validation) return {validationError : "Error"}
      to access this error => data.validationError

      - to trigger action programatically
        - import {useSubmit} from 'react-router-dom'
        - const submit = useSubmit();
        - submit(DATA, {method: 'delete'}, ROUTE_PATH) - will trigger action, which defined in router, ROUTE_PATH if the action if defined in another route

    - To handle the response data from the action
        - import { useActionData } from 'react-router-dom';
        - const data = useActionData();
        - data is set when action return some data ether From BackEnd or by validation

- useFetcher
    - import {useFetcher} from 'react-router-dom';
    - const fetcher = useFetcher()
    - fetcher.Form - will still trigger the action, but will not initialize the route transition
      It means that the action will dispatch without navigation to this page
      therefore add the action='pathToPage' which action has to be dispatched.

     - const {data, state} = fetcher; to get data of from fetcher
        - state - 'idle/loading/submitting'
        - use the state to change UI

-Defer loading
    - import { defer, Await } from 'react-router-dom';
    - import { Suspense } from 'react';
    - make loaderFunction separate function(async func)

    - export async function loader () {
          // React hooks can NOT be used here
          return defer({
              events: await loaderFunction()    // to execute function which return promise
              data: await secondLoaderFunction() // Execute here
          });
      }
      //omit await if we do not nee to wait some data
      -We still have access to loaded data  const {events} = useRouteLoaderData('events'); OR const {data} = useLoaderData(); (if it is root page)
    - return <Await resolve=events>
                 <Suspense fallback={<Loader/>}>  // Is us to to fallback while we fetching the data
                {loadedEvents => <EventsList events={loadedEvents}/>} //await will wait till data loaded and will call this func  with loadedEvents automatically
             </Await>
