import { useNavigate, useNavigation, useActionData, Form, json, redirect } from 'react-router-dom'; //Form will NOT be sent to BE, but all data will be sent to action in Router

import classes from './EventForm.module.css';

function EventForm ({ method, event }) {
    const navigate = useNavigate();

    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    const data = useActionData();


    function cancelHandler () {
        navigate('..');
    }
// action ='/any-other-path' // add this prop to Form to trigger the action on another path
    return (
      <Form
        method={method}
        className={classes.form}
      >
          {
              data && data.validationError && <p>{data.validationError}</p>
          }
          {data && data.errors &&
          <ul>
              {Object.values(data.errors).map(err =>{
                  return <li key = {err} >{err}</li>
              })}
          </ul>
          }
          <p>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                name="title"

                defaultValue={event ? event.title : ''}
              />
          </p>

          <p>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="url"
                name="image"
                required
                defaultValue={event ? event.image : ''}
              />
          </p>
          <p>
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                name="date"
                required
                defaultValue={event ? event.date : ''}
              />
          </p>
          <p>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                required
                defaultValue={event ? event.description : ''}
              />
          </p>
          <div className={classes.actions}>
              <button
                disabled={isSubmitting}
                type="button"
                onClick={cancelHandler}>
                  Cancel
              </button>
              <button disabled={isSubmitting}
              >
                  {isSubmitting ? 'Submitting...' : 'Save'}
              </button>
          </div>
      </Form>
    );
}

export default EventForm;

export async function action ({request, params}) {
    const method = request.method;
    const data = await request.formData();
    //  const enteredTitle = data.get('title') //get() method extracts data from field with the given name in form

    const eventData = {
        title : data.get('title'),
        image : data.get('image'),
        date : data.get('date'),
        description: data.get("description"),
    };

    if(eventData.title === ''){
        return {validationError : 'Please, enter title'}
    }
    let url = 'http://localhost:8080/events';

    if (method === 'PATCH'){
        const id = params.id; //id from router definition
        url = url + '/' + id;
    }

    const response = await fetch(url,
      {
          method: method,
          headers : {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData)
      }
    );


    if(response.status === 422){
        return response;
    }

    if (!response.ok){
        throw json({message: 'Could not save the event'}, {status: 500})
    }

    return redirect('/events');


    // return axios.post(
    //  'http://localhost:8080/events',
    //   eventData,
    //  {
    //      headers : {
    //          'Content-Type': 'application/json',
    //        },
    //  }
    //  )
    //  .then(()=>{
    //     return redirect('/events');
    //  })
    //  .catch(()=>{
    //      throw json({message: 'Could not save the event'}, {status: 500})
    //  })

}

