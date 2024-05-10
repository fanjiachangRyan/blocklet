import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  Container: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    background: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  Wrap: {
    width: '100%',
    maxWidth: '1196px',
    height: 'calc(100% - 200px)',
    display: 'flex',
    flexGrow: 1,
    marginTop: '30px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      overflow: 'hidden',
      overflowY: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  AvatarWrap: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '60px',
      padding: '20px',
      display: 'flex',
      alignItems: 'flex-end',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      justifyContent: 'flex-start',
    },
    [theme.breakpoints.up('md')]: {
      borderRight: '1px solid rgba(255,255,255,0.1)',
      height: '100%',
      alignItems: 'center',
      padding: '20px 50px 20px 0',
    },
  },
  AvatarName: {
    color: 'white',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
      marginLeft: '10px',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '20px',
      width: '100%',
      textAlign: 'center',
      '& > .MuiAvatar-root': {
        fontSize: '20px',
      },
    },
  },
  AvatarImg: {
    [theme.breakpoints.down('md')]: {
      width: '60px',
      height: '60px',
      fontSize: '17px',
    },
    [theme.breakpoints.up('md')]: {
      width: '200px',
      height: '200px',
      '& > .MuiAvatar-root': {
        fontSize: '100px',
      },
    },
  },
  FormItem: {
    [theme.breakpoints.down('md')]: {
      marginTop: '30px',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '20px',
    },
  },
}));
