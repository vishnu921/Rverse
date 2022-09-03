import React, {useState,useEffect} from "react"
import { TextField, Button,Typography,Paper } from "@material-ui/core"
import FileBase from 'react-file-base64'
import {useDispatch} from 'react-redux'
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import useStyles from './styles'
import { createReview, updateReview } from "../../actions/reviews"

const Form = ({currentId, setCurrentId}) => {
    const [reviewData, setReviewData] = useState({
         title:'', description:'', tags:'', selectedFile:''
    });
 
    const review = useSelector((store)=> currentId? store.reviews.reviews.find((p)=> p._id === currentId): null );
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();


    useEffect(()=>{
        if(review)
            setReviewData(review);
    },[review])

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        if(currentId){
            dispatch(updateReview(currentId,{...reviewData, name: user?.result?.name}));
        }
        else{
            dispatch(createReview({...reviewData, name: user?.result?.name},history));
        }
        clear();
    }
    const clear = ()=>{
        setCurrentId(null);
        setReviewData({title:'', description:'', tags:'', selectedFile:''});
    }


    if(!user?.result?.name){
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant='h6' align='center'>
                    Please sign in to your own account to create Reviews like others.
                </Typography>
            </Paper>
        )
    }

    return ( 
        <Paper className={classes.paper} elevation={3}>
            <form  autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Review</Typography>
                <TextField name='title' variant='outlined' label='Title' fullWidth value={reviewData.title} onChange={(e)=> setReviewData({...reviewData, title: e.target.value})} />
                <TextField name='description' variant='outlined' label='description' fullWidth minRows={3} multiline value={reviewData.description} onChange={(e)=> setReviewData({...reviewData, description: e.target.value})} />
                <TextField name='tags' variant='outlined' label='Tags' placeholder="separate tags with comma  tag1,tag2,tag3 " fullWidth value={reviewData.tags} onChange={(e)=> setReviewData({...reviewData, tags: e.target.value.toLocaleLowerCase().split(',')})} />
                <div className={classes.fileInput}><Typography variant='subtitle1' >Upload an image </Typography><FileBase  type='file' multiple={false} onDone={({base64})=> setReviewData({...reviewData, selectedFile: base64}) } /></div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth >Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth >Clear</Button>
            
            </form>

        </Paper>
     );
}
 
export default Form