import React, { useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
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
                <Typography gutterButtom variant='h6' style={{ fontWeight: '700', color: '#077fa8' }}>Comments</Typography>
                {
                    user?.result?.name && (
                        <div className={classes.comment}>
                            <TextField fullWidth minRows={1} variant='filled' label='Write a Comment...' multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                            <div className={classes.commentButton}>
                                <Button color='primary' fullWidth disabled={!comment} variant='contained' onClick={handleClick}>
                                    comment
                                </Button>
                            </div>
                        </div>
                    )
                }

                <div className={classes.commentsInnerContainer}>
                    {
                        comments.map((c, i) => (
                            <div key={i} className={classes.singleCommentContainer}>
                                <Typography gutterButtom variant='subtitle2' className={classes.singleComment}>
                                    <strong>{c.split(': ')[0]}</strong>:
                                    {c.split(':')[1]}
                                </Typography>
                            </div>
                        ))
                      
                    }
                   {/* <div ref={commentsRef} />  */}
                </div>

            </div>
        </div>
    );
}

export default CommentSection;