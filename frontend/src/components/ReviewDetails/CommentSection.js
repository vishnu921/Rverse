import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Divider } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentReview } from '../../actions/reviews';

const CommentSection = ({ review }) => {

    const classes = useStyles();
    const [comments, setComments] = useState(review?.comments);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    // const commentsRef = useRef();

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        setComment('');
        setComments([...comments, finalComment]);
        // commentsRef.current.scrollIntoView({ bahaviour: 'smooth' });
        dispatch(commentReview(finalComment, review._id));
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    
                    {
                        comments.map((c, i) => (
                            <Typography key={i} gutterButtom variant='subtitle1'>
                                <strong>{c.split(': ')[0]}</strong>
                                {c.split(':')[1]}
                            </Typography>
                        ))
                      
                    }
                   {/* <div ref={commentsRef} />  */}
                </div>
                
                {
                    user?.result?.name && (
                        <div className={classes.comment}>
                            <Typography gutterButtom variant='h6' style={{ color: '#077fa8' }}>Write a Comment..</Typography>
                            <TextField fullWidth minRows={1} variant='outlined' label='Comment' multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                            <Button style={{ marginTop: '10px' }} color='primary' fullWidth disabled={!comment} variant='contained' onClick={handleClick}>
                                comment
                            </Button>
                        </div>
                    )
                }

            </div>
        </div>
    );
}

export default CommentSection;