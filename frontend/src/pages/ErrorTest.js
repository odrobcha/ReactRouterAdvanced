import React from 'react';
import { Fragment } from 'react';
import MainNavigation from '../components/MainNavigation';
import PageContent from '../components/PageContent';
import {useRouteError} from 'react-router-dom'

function ErrorPage () {

    const error = useRouteError();
    console.log("ERROR COMPONENT")



    return <Fragment>
        <MainNavigation/>
        <PageContent title = "TEST">
        <h1>
            <p>ERROR</p>
        </h1>
        </PageContent>

    </Fragment>;
}

export default ErrorPage;
