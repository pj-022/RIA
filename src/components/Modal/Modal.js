import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: '#fffff0',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal(props) {
    const { open, setOpen, handleButton } = props

    return (
        <div>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete Blogg?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        You sure want to delete it?
                    </Typography>
                    <Typography>
                        <button className='my-2 mx-2 btn btn-outline-danger' onClick={handleButton}>Delete</button>
                        <button className='my-2 mx-2 btn btn-outline-primary' onClick={() => { setOpen(false) }}>Cancel</button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}


