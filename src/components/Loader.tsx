import {Box, CircularProgress} from "@mui/material";

interface LoaderSizeType {
  size: 'small' | 'large';
  loaderColor?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}
const Loader = (props: LoaderSizeType) => {
    const {size, loaderColor = 'primary'} = props
    const smallLoader = { display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
    const largeLoader = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }
    return (
        <Box
            sx={size === 'small' ? smallLoader : largeLoader}
        >
            <CircularProgress color={loaderColor}/>
        </Box>
    );
}
export default Loader
