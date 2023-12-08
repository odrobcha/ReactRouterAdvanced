import React, { useEffect, useState } from 'react';
import {useFetcher} from 'react-router-dom'
import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
    const fetcher = useFetcher();
    //fetcher has to be used where to trigger  Action or Loader without navigating to the page to with Action or Loader belong to
    //without route transition
    // do not move to another route

    const {data , state} = fetcher;
    const [email, setEmail] = useState('');

    const emailHandler = (event)=>{
        setEmail(event.target.value)
    }


    useEffect(()=> {
        if (state === 'idle' && data && data.message){
            window.alert(data.message);
            setEmail('');
        }
    }, [data, state])


    return (
      <fetcher.Form
        method="post"
        action = "/newsletter"
        className={classes.newsletter}

      >
          <input
            type="email"
            placeholder="Sign up for newsletter..."
            aria-label="Sign up for newsletter"
            value = {email}
            onChange={emailHandler}
          />
          <button>Sign up</button>
      </fetcher.Form>
    );
}

export default NewsletterSignup;
