import React, { useState } from 'react'
import { ButtonBase, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import noImage from '../../../images/noImage.png'


import useStyles from './styles';
import { deleteReview, likeReview } from '../../../actions/reviews'


const Review = ({ review, setCurrentId }) => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const history = useHistory()
    const [likes, setLikes] = useState(review?.likes)
    const userId = (user?.result?.googleId || user?.result?._id)
    const hasLikedReview = likes.find((like) => like === userId)
    let newDescription = ""

    if (review.description.trim().length > 200) {
        newDescription = review.description.substring(0, 200).concat('...')
    } else {
        newDescription = review.description
    }

    const handleLike = () => {
        dispatch(likeReview(review._id))
        if (hasLikedReview) {
            setLikes(likes.filter((id) => id !== userId))
        } else {
            setLikes([...likes, userId])
        }
    };

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId)
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const handleEdit = (e, id) => {
        e.stopPropagation()
        setCurrentId(id)
        window.scrollTo(0, 200)
    }
    const openReview = () => {
        history.push(`/reviews/${review._id}`)
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openReview} >
                <CardMedia className={classes.media} image={review.selectedFile || noImage} title={review.title} />
                <div className={classes.overlay}>
                    <Typography variant='h6'>{review.name}</Typography>
                    <Typography variant='body2'>{moment(review.createdAt).fromNow()}</Typography>
                </div>
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>{review.tags.map((tag) => '#' + tag + ' ')}</Typography>
                </div>
                <Typography className={classes.title} variant='h6' gutterBottom>{review.title}</Typography>

                <CardContent>
                    <div>
                        <Typography nowrap="true" variant='body2' color='textSecondary'>
                           {newDescription}
                        </Typography>
                    </div>
                    
                </CardContent>
            </ButtonBase>

            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={handleLike} disabled={!user?.result}>
                    <Likes />
                </Button>
                
                {(user?.result?.googleId === review?.creator || user?.result?._id === review?.creator) && (
                    <div className={classes.overlay2} name="edit">
                        <Button onClick={(e) => handleEdit(e, review._id)} style={{ color: 'white' }} size="small" >
                            edit
                        </Button>
                    </div>
                )}
                {(user?.result?.googleId === review?.creator || user?.result?._id === review?.creator) && (
                    <Button size='small' color='secondary' onClick={() => dispatch(deleteReview(review._id))}>
                        <DeleteIcon fontSize='small' /> Delete
                    </Button>
                )}
            </CardActions>


        </Card>
    );
}

export default Review