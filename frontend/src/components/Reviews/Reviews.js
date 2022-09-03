import React from 'react'
import {useSelector} from 'react-redux'
import {Grid,CircularProgress,Typography} from '@material-ui/core'

import Review from './Review/Review'
import useStyles from './styles'
 
const Reviews = ({setCurrentId}) => {
  const classes = useStyles()
  const {reviews, isLoading} = useSelector((store)=> store.reviews)

  if(!reviews.length && !isLoading) return (<h1 style={{color:'red'}}>No Reviews at the moment</h1>)

  return ( 
    isLoading ? <div><CircularProgress style={{marginBottom: '15px'}}/> <Typography>Loading may take some time</Typography> </div>: (
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
        {
          reviews.map((review)=> (
            <Grid item key={review._id} xs={12} sm={12} md={6} lg={3}>
              <Review review={review} setCurrentId={setCurrentId} />
            </Grid>
          ))
        }
      </Grid>
    )
  );
}
 
export default Reviews