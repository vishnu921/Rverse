import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
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
            <div style={{alignContent: 'center'}}>
            <CircularProgress size='7em' style={{marginBottom:'20px'}} />
            <Typography>Loading Image may take some time</Typography>
            </div>
        </Paper>
    }
    
    
    const recommendedReviews = reviews.filter(({_id})=> _id !== review._id);
    const openReview = (_id)=> history.push(`/reviews/${_id}`); 

    return (
        <Paper className={classes.ReviewDetailsContainer} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h4" component="h4" style={{fontWeight: '700'}}>{review.title}</Typography>
                    <div className={classes.mediaContainer}>
                        <img className={classes.media} src={review.selectedFile || noImage} alt={review.title} />
                    </div>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{review.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{review.description}</Typography>
                    <Typography variant="body1" style={{fontWeight: '600', marginTop: '20px'}}>Created by: {review.name}</Typography>
                    <Typography variant="body2">{moment(review.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '10px 0' }} />
                    <Typography gutterButtom variant='h6' style={{ color: '#077fa8' }}>Comments</Typography>
                    <CommentSection review={review} />
                    <Divider style={{ margin: '10px 0' }} />
                </div>
            </div>

           {
            recommendedReviews.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant='h5'>You might also like </Typography>
                    <Divider />
                    <div className={classes.recommendedReviews}>
                        {recommendedReviews.map(({title,description,name,likes,selectedFile,_id})=>(
                            <div style={{margin:'20px',cursor:'pointer'}} onClick={()=>openReview(_id)} key={_id}>
                                <Typography gutterButtom variant='h6'>{title}</Typography>
                                <Typography gutterButtom variant='subtitle2'>{name}</Typography>
                                <Typography gutterButtom variant='subtitle2'>{description}</Typography>
                                <Typography gutterButtom variant='subtitle1'>Likes : {likes.length}</Typography>
                                <img src={selectedFile || noImage} width='200px' alt={title}/>
                            </div>
                        ))}
                    </div>
                </div>
            )
           }
        </Paper>
        

    );
}

export default ReviewDetails;