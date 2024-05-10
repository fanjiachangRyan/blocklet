import { makeStyles } from '@mui/styles';

export const useLoginStyle = makeStyles((theme: any) => ({
  Container: {
    maxWidth: 500,
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    [theme.breakpoints.down('md')]: {
      width: '70%',
    },
    [theme.breakpoints.up('md')]: {
      width: '40%',
    },
  },
  FormItem: {
    width: '80%',
    [theme.breakpoints.down('md')]: {
      marginTop: '30px',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '20px',
    },
  },
  Button: {
    width: 200,
    marginTop: 20,
  },
}));
