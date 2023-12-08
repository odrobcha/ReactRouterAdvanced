import React from 'react';
import { Fragment } from 'react';
import MainNavigation from '../components/MainNavigation';
import PageContent from '../components/PageContent';
import {useRouteError} from 'react-router-dom'

function ErrorPage () {

    const error = useRouteError();

  //  const errorData = JSON.parse(error.data);  //when use throw Response
  //
  //
    let title = "An error occurred!";
    let message = "Could not find this page";


    if (error.status === 500){
        console.log("ERROR_BODY ", error.message)
      //  message = errorData.message;   // JSON.parse if use throw Response
        message = error.data.message;
    }
    if (error.status === 404){
        title = "Not found";
        message = "Could not find resource or page";
    }


    return <Fragment>
        <MainNavigation/>
        <PageContent title = {title}>
        <h1>
            <p>{message}</p>
        </h1>
        </PageContent>

    </Fragment>;
}

export default ErrorPage;
