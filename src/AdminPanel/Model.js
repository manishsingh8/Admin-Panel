import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";


const Model = () => {
  return (
    <div>
       <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Details...
            </Typography>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              onChange={changeHandler}
              value={editRow.name}
              name="name"
              sx={{ marginTop: "5px" }}
            />

            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              onChange={changeHandler}
              value={editRow.email}
              name="email"
              sx={{ marginTop: "5px" }}
            />

            <TextField
              id="standard-basic"
              label="Role"
              variant="standard"
              onChange={changeHandler}
              value={editRow.role}
              name="role"
              sx={{ marginTop: "5px" }}
            />

            <Box
              sx={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={closeHandler}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
    </div>
  )
}

export default Model;
