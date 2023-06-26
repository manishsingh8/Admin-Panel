import React, { useEffect, useState } from "react";
import "./admin.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const Admin = () => {
  const [adminData, setAdminData] = useState([]);
  //  modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editRow, setEditRow] = useState({
    name: "",
    email: "",
    role: "",
    id: "",
  });
  const [filteredData, setFiltredData] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const apiCall = async () => {
    try {
      const url =
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
      const res = await fetch(url);
      const data = await res.json();
      setAdminData(data);
      setFiltredData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    apiCall();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "name", headerName: "Name", minWidth: 250 },
    { field: "email", headerName: "Email", minWidth: 250 },
    { field: "role", headerName: "Role", minWidth: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <strong>
          <EditNoteIcon
            onClick={() => {
              handleEdit(params.row);
            }}
          />
          <DeleteOutlineIcon
            onClick={() => handleDelete(params.row.id)}
            sx={{ color: "red" }}
          />
        </strong>
      ),
    },
  ];

  const handleEdit = (e) => {
    handleOpen(true);
    const rowData = filteredData.filter((currVal) => {
      return currVal.id === e.id;
    });
    console.log(rowData[0]);
    setEditRow((preVal) => {
      return {
        ...preVal,
        name: rowData[0].name,
        email: rowData[0].email,
        role: rowData[0].role,
        id: rowData[0].id,
      };
    });
  };

  const handleDelete = (index) => {
    const updatedData = filteredData.filter((currEle) => {
      return currEle.id !== index;
    });
    setFiltredData(updatedData);
  };

  //   Modal CSS
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  };

  const closeHandler = () => {
    setOpen(false);
  };

  useEffect(() => {
    const index = filteredData.findIndex((value) => {
      return value.id === editRow.id;
    });
    const updatedData = [...filteredData];
    updatedData[index] = editRow;
    setFiltredData(updatedData);
  }, [editRow.name, editRow.email, editRow.role]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setEditRow((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const multipleDelete = () => {
    const updatedData = filteredData.filter((value) => {
      if (rowSelectionModel.includes(value.id)) {
        return null;
      } else {
        return value;
      }
    });
    // console.log("filterdata",filteredData);
    setFiltredData(updatedData);
  };

  // search the name and email
  const inputChangeHandler = (inputEvent) => {
    const searchedItem = adminData.filter((value) => {
      return value.name
        .toLowerCase()
        .includes(inputEvent.target.value.toLowerCase());
    });
    console.log(searchedItem);
    setFiltredData(searchedItem);
  };
  return (
    <>
      <Container
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          fullWidth
          sx={{ backgroundColor: "#f7feff" }}
          onChange={inputChangeHandler}
        />
        <Box
          sx={{
            height: "70vh",
            width: "100%",
            marginTop: "10px",
            backgroundColor: "#f7feff",
          }}
        >
          <DataGrid
            rows={filteredData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20]}
            checkboxSelection={(e) => {
              console.log(e);
            }}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
              console.log(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
          />
        </Box>

        {/* modal */}
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
        <Button variant="contained" color="error" onClick={multipleDelete}>
          Delete Selected
        </Button>
      </Container>
    </>
  );
};

export default Admin;
