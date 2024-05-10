import { Input as MUIInput, styled } from '@mui/material';

export const Input = styled(MUIInput)({
  width: '100%',
  marginTop: '20px',
  '& > .MuiInput-input': {
    color: 'white',
    border: '1px solid rgba(255,255,255, 0.1)',
    height: '42px',
    padding: '0 15px',
    borderRadius: 6,
    width: '100%',
  },

  '& > .Mui-disabled': {
    textFillColor: 'rgba(255,255,255,0.2)!important',
  },
});
