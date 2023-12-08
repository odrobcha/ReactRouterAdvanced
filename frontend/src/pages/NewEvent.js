import React from 'react';
import EventForm from '../components/EventForm';
import axios from 'axios';
import {json, redirect} from 'react-router-dom';

const NewEvent = () => {
    return (
      <>
          <EventForm method="post">

          </EventForm>
      </>
    );
};

export default NewEvent;

