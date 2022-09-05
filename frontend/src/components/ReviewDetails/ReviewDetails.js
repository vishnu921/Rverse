import React, { useEffect } from 'react';
import { Grid,Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import useStyles from './styles';
import { getReview , getReviewBySearch} from '../../actions/reviews';
import noImage from '../../images/noImage.png';
import CommentSection from './CommentSection';


const ReviewDetails = () => {
    const { review, reviews, isLoading } = useSelector((state) => state.reviews);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();
    

    useEffect(() => {
        dispatch(getReview(id));
    }, [dispatch, id])
    
    useEffect(()=>{
        if(review){
            dispatch(getReviewBySearch({search:'none',tags: review?.tags.join(',')}))
        }
    },[dispatch, review])
    
    if (!review || isLoading) {
        return <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size='7em' style={{marginBottom:'20px'}} />
            <Typography>Loading Image may take some time</Typography>
        </Paper>
    }
    
    
    const recommendedReviews = reviews.filter(({_id})=> _id !== review._id);
    const openReview = (_id)=> history.push(`/reviews/${_id}`); 

    const shortDescription = (description) => {
        if (description.trim().length > 200) {
            return description.substring(0, 200).concat('...')
        }
        return description
    }

    return (
        <div>
        <Paper className={classes.ReviewDetailsContainer} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h4" component="h4" style={{fontWeight: '700'}}>{review.title}</Typography>
                    <div className={classes.mediaContainer}>
                        <img className={classes.media} src={review.selectedFile || noImage} alt={review.title} />
                    </div>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{review.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p" className={classes.description}>{review.description}</Typography>
                    <Typography variant="body1" style={{fontWeight: '600'}}>Created by: {review.name}</Typography>
                    <Typography variant="body2">{moment(review.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '10px 0' }} />
                    <CommentSection review={review} />
                    <Divider style={{ margin: '10px 0' }} />
                </div>
            </div>
        </Paper>

           {
            recommendedReviews.length && (
                <div>
                    <Typography gutterBottom variant='h5' style={{fontWeight: '800', marginTop: '50px'}}>You might also like </Typography>
                    <Divider />
                    <Grid className={classes.recommendedReviews} container alignItems='stretch' spacing={3}>
                        {recommendedReviews.map(({title,description,name,likes,selectedFile,_id})=>(
                            <Grid item  key={_id} xs={12} sm={12} md={6} lg={3}>
                                <Paper  className={classes.recommendedReview} elevation={6} onClick={()=>openReview(_id)}>
                                    <Typography gutterButtom variant='h6'style={{fontWeight: '600'}}>{title}</Typography>
                                    <Typography gutterButtom variant='subtitle2' style={{fontWeight: '600', marginBottom: '20px'}}>{name}</Typography>
                                    <Typography gutterButtom variant='subtitle2'>{shortDescription(description)}</Typography>
                                    <Typography gutterButtom variant='subtitle1'style={{fontWeight: '600', marginTop: '20px'}}>Likes : {likes.length}</Typography>
                                    <img src={selectedFile || noImage}  width='200px' alt={title}/>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )
           }
        </div>

    );
}

export default ReviewDetails;