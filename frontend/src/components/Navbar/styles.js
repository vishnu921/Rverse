import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    margin: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 70px',
    position: 'fixed',
    top: '0',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: '10px 0',
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]:{
      marginTop: '10px'
    }
  },
  profile: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  userName: {
    alignItems: 'center',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));