import classes from './Loader.module.css';

const Loader =  () =>{
    return(
      <div className={classes.loaderContainer}>
          <div className={classes['custom-loader']}></div>
      </div>

    )
}

export default Loader
