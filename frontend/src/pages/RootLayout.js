import React, { Fragment } from 'react';
import { Outlet, /*useNavigation*/ } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

//<Outlet/>  // place where chilld rout element has to be placed
function RootLayout () {
   // const navigation = useNavigation();
    return (
      <Fragment>
          <MainNavigation></MainNavigation>
          <main>
              {/*navigation.state === 'loading' && <p>Loading... </p>*/}
              <Outlet/>
          </main>
      </Fragment>
    );

}

export default RootLayout;
