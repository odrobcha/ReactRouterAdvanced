import React from 'react';
import { useLoaderData, json } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage () {
    const data = useLoaderData(); // data that returns from loader

    // if (data.isError){
    //     return(
    //       <p>{data.message}</p>
    //     )
    // }

        const events = data.events;
        return (
              <EventsList events={events}/>
        );


}

export default EventsPage;

export async function loader () {
    // React hooks can NOT be used here
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
        // return {isError : true , message: "Could not fetch request"}
        // throw {message : "Could not fetch request"}  //when throw the error React will render the closest error element

       // throw new Response (JSON.stringify({message : "Could not fetch events", status: 500}));


        throw json(                               // json() method of react-router-dom. It do the same as throw new Response
          { message: "Could not fetch events"},
          {
              status: 500,
          }
       );
    } else {

        // const resData = await response.json();
        //  return resData.events;  // returned data is available in this component, i.e.<Events>
        //  const res = new Response('data', {status: 201},)
        // return res;

        return response;

    }
}
