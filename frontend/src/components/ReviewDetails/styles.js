import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  ReviewDetailsContainer: {
    padding: '10px', 
    borderRadius: '10px'
  },
  mediaContainer: {
    margin: '20px auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  media: {
    borderRadius: '0px',
    objectFit: 'cover',
    width: '100%',
    [theme.breakpoints.down('sm')]:{
    }
    
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    margin: '10px',
    flex: 1,
  },
  recommendedReviews: {
    marginTop: '20px'
  },
  recommendedReview: {
    height: '100%',
    borderRadius: '5px',
    padding: '20px',
    cursor:'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  loadingPaper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '20px',
    height: '39vh',
  },
  description: {
    whiteSpace: 'pre-line',
    marginBottom: '30px',
  },
  commentsOuterContainer:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'space-between',
    [theme.breakpoints.down('sm')]:{
      flexDirection:'column'
    }
  },
  commentsInnerContainer:{
    height: '200px',
    overflowY:'auto',
    marginRight:'30px'
  },
  comment:{
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '70%',
    [theme.breakpoints.down('sm')]:{
      width:'100%',
      flexDirection: 'column',
      alignItems: 'flex-start',
    }
  },
  singleComment: {
    width: 'fit-content',
    padding: '5px 10px',
    backgroundColor: '#F0F2F5',
    borderRadius: '5px',
  },
  singleCommentContainer: {
    maxWidth: '60%',
    marginBottom: '8px',
    [theme.breakpoints.down('sm')]:{
      maxWidth:'90%',
    }
  },
}));

