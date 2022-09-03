import React,{useEffect} from "react"
import {Pagination, PaginationItem} from '@material-ui/lab'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"

import {getReviews} from '../actions/reviews'
import useStyles from './styles'

const Paginate = ({page})=>{
    const {numberOfPages} = useSelector((store)=> store.reviews)
    
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(page) dispatch(getReviews(page))
    },[dispatch, page])

    return (
        <Pagination 
            classes={{ul: classes.ul}}
            count = {numberOfPages}
            page={Number(page)}
            variant='outlined'
            color='primary'
            renderItem={(item)=>(
                <PaginationItem {...item} 
                    component={Link}
                    to={`/reviews?page=${item.page}`} />
            )} />
    )
}


export default Paginate