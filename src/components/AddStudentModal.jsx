import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddStudentModal = ({ open, handleClose, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
    class: Yup.string().required("Class is required"),
    section: Yup.string().required("Section is required"),
    rollNumber: Yup.number()
      .typeError("Roll Number must be a number")
      .positive("Roll Number must be positive")
      .integer("Roll Number must be an integer")
      .required("Roll Number is required"),
    admissionNumber: Yup.string()
      .matches(/^\d{4}-\d{6}$/, "Admission Number must follow the format YYYY-XXXXXX(Must be 4 digits, a hyphen, and 6 digits)")
      .required("Admission Number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Invalid phone number")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    dob: Yup.date().required("Date of birth is required"),
    guardianName: Yup.string().required("Guardian name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      class: "",
      section: "",
      rollNumber: "",
      admissionNumber: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      dob: "",
      guardianName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          width: "90%",
          maxWidth: 500,
          height: "80vh",
          backgroundColor: "white",
          padding: 4,
          margin: "auto",
          marginTop: "10vh",
          borderRadius: 2,
          boxShadow: 3,
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" textAlign="center">
          Add Student
        </Typography>

        <TextField
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
        />

        <TextField
          label="Class"
          name="class"
          value={formik.values.class}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.class && Boolean(formik.errors.class)}
          helperText={formik.touched.class && formik.errors.class}
          fullWidth
        />

        <TextField
          label="Section"
          name="section"
          value={formik.values.section}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.section && Boolean(formik.errors.section)}
          helperText={formik.touched.section && formik.errors.section}
          fullWidth
        />

        <TextField
          label="Roll Number"
          name="rollNumber"
          value={formik.values.rollNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.rollNumber && Boolean(formik.errors.rollNumber)}
          helperText={formik.touched.rollNumber && formik.errors.rollNumber}
          fullWidth
        />

        <TextField
          label="Admission Number"
          name="admissionNumber"
          value={formik.values.admissionNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.admissionNumber && Boolean(formik.errors.admissionNumber)}
          helperText={formik.touched.admissionNumber && formik.errors.admissionNumber}
          fullWidth
        />

        <TextField
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          fullWidth
        />

        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          fullWidth
        />

        <TextField
          label="Address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          fullWidth
        />

        <TextField
          label="City"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          fullWidth
        />

        <TextField
          label="State"
          name="state"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
          fullWidth
        />

        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formik.values.dob}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.dob && Boolean(formik.errors.dob)}
          helperText={formik.touched.dob && formik.errors.dob}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Guardian Name"
          name="guardianName"
          value={formik.values.guardianName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.guardianName && Boolean(formik.errors.guardianName)}
          helperText={formik.touched.guardianName && formik.errors.guardianName}
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddStudentModal;
