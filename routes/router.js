const express = require('express');
const userController = require('../controller/userController');
const adminController = require('../controller/adminController'); // Import admin controller
const jwtMiddleware = require('../middleware/jwtMiddleware');
const donorController = require('../controller/donorController')
const patientController = require('../controller/patientController')
const router = express.Router();

// User Routes
router.post('/register', userController.registerController);
router.post('/login', userController.loginController);

// Admin Routes
router.post('/admin/login', adminController.adminLoginController); // Admin login route

// add-donor
router.post('/add-donor',jwtMiddleware,donorController.addDonorController)

//all donors 
router.get('/donors',donorController.getDonorController)

//edit-donors
router.put('/edit-donors/:id',jwtMiddleware,donorController.editDonorController)

// delete-donor
router.delete('/donors/:id/delete',donorController.removeDonorController)

// add-patient
router.post('/add-patient', (req, res, next) => {
    if (req.headers.authorization) {
        return jwtMiddleware(req, res, next); // Apply JWT middleware if a token exists
    }
    next(); // Allow guest users to proceed without authentication
}, patientController.addPatientController);


//all patients  
router.get('/patients',patientController.getAllPatientsComponent)

// all donors in request
router.get('/patients/donors', donorController.getDonorController);

// router.post('/patinet/request',patientController.requestOrganController)

router.put('/edit-patients/:id',jwtMiddleware,patientController.editPatientController)

router.delete('/patients/:id/delete',patientController.removePatientController)

router.get('/user-data/:id',jwtMiddleware,userController.getUserActivity)

router.put('/user-data/:id/edit',jwtMiddleware,userController.editUser)

module.exports = router;
