import { Button, styled } from '@mui/material'

const CustomBtn = styled(Button)({
    width: "100%",
    backgroundColor:"chocolate",
    padding: "15px",
    marginTop: "10px",
    color: 'black',
    "&:hover": {
        boxShadow: 8,
        backgroundColor:"chocolate"
      },
})

export default CustomBtn