import React, { useState } from "react"
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useHistory, useLocation } from "react-router-dom"
import ChipInput from 'material-ui-chip-input'


import Form from "../Form/Form"
import Reviews from "../Reviews/Reviews"
import { useDispatch } from 'react-redux'
import { getReviewBySearch } from '../../actions/reviews'
import useStyles from './styles'
import Pagination from '../Pagination'


function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null)
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const classes = useStyles()
  const dispatch = useDispatch()
  const query = useQuery()
  const history = useHistory()
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')

  

  const searchReview = () => {
    if (search.trim() || tags) {
      dispatch(getReviewBySearch({ search, tags: tags.join(',') }));
      history.push(`/reviews/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    } else {
      history.push('/')
    }
  }
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchReview()
    }
  }
  const handleAdd = (tag) => {
    tag = tag.toLocaleLowerCase().trim()
    setTags([...tags, tag])
  }
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete))
  }


  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid container className={classes.gridContainer} justifyContent='space-between' alignItems='stretch' spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Reviews setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
              
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField name='search' variant='outlined' label='Search Reviews' fullWidth value={search} onKeyPress={handleKeyPress} onChange={(e) => { setSearch(e.target.value) }} />
              <br/>
              <ChipInput styles={{ margin: '10px 0' }} value={tags} placeholder="type tag and press ENTER" onAdd={handleAdd} onDelete={handleDelete} label='Search Tags' variant='outlined' />
              <br/>
              <Button onClick={searchReview} className={classes.serachButton} variant='contained' color='primary'>Search</Button>
            </AppBar>
            
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {
              (!searchQuery && !tags.length) && (
                  <Paper elevation={6}>
                      <Pagination page={page} />
                  </Paper>
              )
            }
              
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home