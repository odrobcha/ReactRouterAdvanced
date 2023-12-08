import React, { Suspense } from 'react';
import { useParams, useRouteLoaderData, json, redirect, defer, Await } from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

const EventDetail = () => {
    const params = useParams();

    const { event, events } = useRouteLoaderData('event-detail');
    console.log(event)
    return (
      <>
          <Suspense fallback={<p style={{textAlign : 'center'}}>Loading...</p>}>
              <Await resolve={event}>
                  {loadedEvent => <EventItem event={loadedEvent}/>}
              </Await>
          </Suspense>
          <Suspense fallback={<p style={{textAlign : 'center'}}>Loading...</p>}>
              <Await resolve={events}>
                  {loadedEvents => <EventsList events={loadedEvents}/>}
              </Await>
          </Suspense>
      </>
    );
};

export default EventDetail;

async function loadEvent (id) {
    const response = await fetch('http://localhost:8080/events1/' + id);

    if (!response.ok) {
        throw json(
          { message: 'Could not fetch data for this detail event' },
          { status: 500 }
        );
    } else {
        const resData = await response.json();
        return resData.event;
    }
}

async function loadEvents () {
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
        throw json(
          { message: 'Could not fetch events' },
          {
              status: 500,
          }
        );
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

export async function loader ({ request, params }) {
    const id = params.id;

    return defer({
          event: await loadEvent(id),   //to await to move to the page (first wait for the event and thn move to the page)
          events: await loadEvents()
      }
    );

}

export async function action ({ request, params }) {
    const id = params.id;
    const response = await fetch('http://localhost:8080/events/' + id, {
        //  method: "DELETE"
        method: request.method
    });
    if (!response.ok) {
        throw json(
          { message: 'Could not delete this event' },
          { status: 500 }
        );
    }

    return redirect('/events');
}
