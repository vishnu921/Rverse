import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    margin: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2px 30px',
    position: 'fixed',
    top: '0',
    [theme.breakpoints.down('sm')]: {
      padding: '2px 0',
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
    justifyContent: 'center'
  },
  profile: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  userName: {
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    cursor: 'pointer'
  },
  profileOptions: {
    padding: '10px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '5px',
    position: 'absolute',
    width: '300px',
    top: '60px',
    right: '20px',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      right: '10px',
    },
  },
  profileOption: {
    cursor: 'pointer',
    width: '100%',
    padding: '10px 15px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    "&:hover": {
      backgroundColor: '#F0F2F5'
    },
  },
  hide: {
    display: 'none',
  }
}));