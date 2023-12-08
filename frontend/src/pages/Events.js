import React, { Suspense } from 'react';
import { useRouteLoaderData, json, defer, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';
function EventsPage () {
    const {events} = useRouteLoaderData('/'); // data that returns from loader

    // <Suspense> - to display fallBack while data is loading
    //  {(loadedEvents)=> <EventsList events={loadedEvents}/>}   // function that reurns when data is loaded
    return (
      <Suspense fallback={<p style={{textAlign : 'center'}}>Loading...</p>}>
          <Await resolve={events}>
              {loadedEvents => <EventsList events={loadedEvents}/>}
          </Await>
      </Suspense>
    );
}

export default EventsPage;

export async function loadEvents () {
    const response = await fetch('http://localhost:8080/events1');
    if (!response.ok) {
        throw json(
          { message: 'Could not fetch data for TEST events' },
          { status: 500 }
        );
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

export async function loader () {
    // React hooks can NOT be used here
    return defer({
        events: await loadEvents()    // to execute function which return promise
    });

}
