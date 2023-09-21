import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CutomizedButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  padding: '15px 20px',
  borderRadius: '30px',
  '&:hover': {
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
  },
});

export default CutomizedButton;
