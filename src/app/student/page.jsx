'use client'
import React, { useState, useEffect } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton, Modal ,TextField} from "@mui/material";
import { Icon } from "@iconify/react";
import Sidebar from "../../components/Sidebar";
import AddStudentModal from "../../components/AddStudentModal";
import { db } from "../../firebase";
import {collection,getDocs,doc,updateDoc} from 'firebase/firestore';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    class: '',
    section: '',
    rollNumber: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    email: '',
    phoneNumber: '',
    guardianName: '',
    AdmissionNumber: ''
  });

  // Fetch students from Firestore
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      setIsVerified(!!token);
      try{
        const response = await fetch('/api/method',{
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
          },
        })
        if(response.ok){
          const data = await response.json();
          console.log("Token verified, user ID:", data.uid);
          setIsVerified(true);
        }
      }catch(err){
        console.error("Token verification failed",err);
      }
    }
    verifyToken();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      if (isVerified) { 
        const studentsCollection = collection(db, "students");
        const studentSnapshot = await getDocs(studentsCollection);
        const studentList = studentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setStudents(studentList);
      }
    };

    fetchStudents();
  }, [isVerified]);

  // Handle modal
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleViewModalOpen = (student) => {
    setSelectedStudent(student);
    setViewModalOpen(true);
  }
  const handleViewModalClose = () => setViewModalOpen(false);
  const handleEditModalOpen = (student) => {
    setSelectedStudent(student);
    setEditFormData(student);
    setEditModalOpen(true);
  }
  
  const handleEditModalClose = () => setEditModalOpen(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleAddStudent = async (data) => {
    try{
      const response = await fetch('/api/auth/add',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data),
      });

      const result = await response.json();
      if(result.success){
        setStudents((prev)=>[...prev,{id:result.id,...data}]);
        handleModalClose();
      }
      else{
        console.error("Error adding student in page",result.error);
      }
    }catch(err){
      console.error("Error adding student",err);
    }
  };

  const handleDelete = async (id) => {
    try{
      const response = await fetch('/api/auth/delete',{
        method:'DELETE',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({id}),
      });

      const result = await response.json();
      if(result.success){
        setStudents((prev)=>prev.filter((student)=>student.id!==id));
      }
      else{
        console.error("Error deleting student in page",result.error);
      }
    }catch(err){
      console.error("Error deleting student",err);
    }
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      const studentRef = doc(db, 'students', selectedStudent.id);
      await updateDoc(studentRef, editFormData);

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === selectedStudent.id ? { ...student, ...editFormData } : student
        )
      );
      handleEditModalClose();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };
  if (!isVerified) {
    return <Typography variant="h6" align="center">Access Denied</Typography>;
  }
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex={1} p={3} sx={{ marginLeft: "240px" }}>
        <Typography variant="h4" mb={3}>
          Students Page
        </Typography>
        <Button variant="contained" color="primary" onClick={handleModalOpen} sx={{ marginBottom: 3 }}>
          Add Student
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Roll Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.section}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleViewModalOpen(student)}>
                    <Icon icon="akar-icons:eye" />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleEditModalOpen(student)}>
                    <Icon icon="mdi:edit" />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(student.id)}>
                    <Icon icon="fluent:delete-24-filled" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <AddStudentModal open={modalOpen} handleClose={handleModalClose} onSubmit={handleAddStudent} />

        <Modal open={viewModalOpen} onClose={handleViewModalClose}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <Typography variant="h6" component="h2">
              Student Details
            </Typography>
            {selectedStudent && (
              <Box>
                <Typography>Name: {selectedStudent.name}</Typography>
                <Typography>Class: {selectedStudent.class}</Typography>
                <Typography>Section: {selectedStudent.section}</Typography>
                <Typography>Roll-No: {selectedStudent.rollNumber}</Typography>
                <Typography>Date Of Birth: {selectedStudent.dob}</Typography>
                <Typography>Place: {selectedStudent.address},{selectedStudent.city},{selectedStudent.state}</Typography>
                <Typography>Email: {selectedStudent.email}</Typography>
                <Typography>Phone Number: {selectedStudent.phoneNumber}</Typography>
                <Typography>Guardian Name: {selectedStudent.guardianName}</Typography>
                <Typography>Admission Number: {selectedStudent.admissionNumber}</Typography>
              </Box>
            )}
          </Box>
        </Modal>
        <Modal open={editModalOpen} onClose={handleEditModalClose}>
          <Box sx={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper', boxShadow: 24, p: 4, maxHeight: '90vh', overflowY: 'auto'
            }}>
            <Typography variant="h6" component="h2">
              Edit Student
            </Typography>
            <form onSubmit={handleUpdateStudent}>
              <TextField label="Name" name="name" value={editFormData.name} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="Class" name="class" value={editFormData.class} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="Section" name="section" value={editFormData.section} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="Roll Number" name="rollNumber" value={editFormData.rollNumber} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="Date of Birth" name="dob" value={editFormData.dob} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="Address" name="address" value={editFormData.address} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="City" name="city" value={editFormData.city} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="State" name="state" value={editFormData.state} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="Email" name="email" value={editFormData.email} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="Phone Number" name="phoneNumber" value={editFormData.phoneNumber} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="Guardian Name" name="guardianName" value={editFormData.guardianName} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="Admission Number" name="AdmissionNumber" value={editFormData.AdmissionNumber} onChange={handleInputChange} fullWidth margin="normal" />
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default StudentsPage;
