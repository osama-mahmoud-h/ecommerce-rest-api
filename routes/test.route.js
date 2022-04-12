const express = require('express');
const router = express.Router();

//const {fileUploader} = require("../utils/fileUploader");

const {
    createTest,
    updateTest

} = require('../controllers/test.controller');

//router.post('/test',fileUploader,createTest)
router.route('/test/create').post(createTest);
router.route('/test/update/:id').put(updateTest);

module.exports = router;