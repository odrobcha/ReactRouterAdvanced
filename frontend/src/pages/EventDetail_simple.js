import React from 'react';
import {useParams, useRouteLoaderData, json, redirect} from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
const EventDetail = ()=> {
    const params = useParams();

    const data = useRouteLoaderData('event-detail');
    return (
      <>
        <EventItem event={data.event} />
        <EventsList />
      </>
    )
};

export default EventDetail;

export async function loader({request, params}) {
    const id = params.id;
    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok){
        throw json(
          { message: 'Could not fetch data for this event'},
          {status : 500}
          )
    }
    return response;
}

export async function action({request, params}) {
    const id = params.id;
    const response = await fetch('http://localhost:8080/events/' + id, {
      //  method: "DELETE"
        method: request.method
    });
    if (!response.ok){
        throw json(
          { message: 'Could not delete this event'},
          {status : 500}
        )
    }

    return redirect('/events')
}
