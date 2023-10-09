
import express from 'express';
import {registerAdmin} from '../controllers/adminSignupController.js';
import { createVideo} from '../controllers/addVideoController.js';
import { addQuestion } from '../controllers/addQuestionController.js';
import { createCategory } from "../controllers/categoriesController.js";
import { getCategory } from '../controllers/categoriesController.js';
import { delteCategory } from '../controllers/categoriesController.js';
import { quizDetails } from '../controllers/createQuizController.js';
import { populateVideoId } from '../controllers/createQuizController.js';
import { AdminDetails } from '../controllers/adminLoginController.js';
import { populateQuizId } from '../controllers/addQuestionController.js';
import { forgotPassword } from '../controllers/forgotPasswordController.js';
import { resetPassword } from '../controllers/forgotPasswordController.js';
import { updatePassword } from '../controllers/forgotPasswordController.js';
import upload from '../middleware/multer.js';
import { getAllVideo } from '../controllers/addVideoController.js';
import { paginateAdmin } from '../controllers/paginateAdminHome.js';
import { paginateQuestion } from '../controllers/paginateAdminHome.js';
import { getVideosData } from '../controllers/addVideoController.js';
import { userData } from '../controllers/userController.js';
import { getUserData } from '../controllers/userController.js';

const router = express.Router();

router.route('/register').post(registerAdmin);
router.route('/login').post(AdminDetails);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:id/:token').get(resetPassword);
router.route('/updatePassword/:id/:token').post(updatePassword);
router.route('/addVideo').post(upload.fields([{name: 'videoURL', maxCount:1}, {name:'videoThumbnailURL', maxCount:1}]), createVideo);
router.route('/getVideosData').get(getVideosData);
router.route('/addQuestion/:id').post(addQuestion);
router.route("/videoCategory").post(createCategory);
router.route("/videoCategoryData").get(getCategory);
router.route("/videoCategories/:id").delete(delteCategory);
router.route('/createQuiz/:id').post(quizDetails);
router.route('/QuizData').get(populateVideoId);
router.route('/QuestionData').get(populateQuizId);
router.route('/getAllVideo').get(getAllVideo);
router.route('/paginateUser').get(paginateAdmin);
router.route('/paginateQuestion/:id').get(paginateQuestion);
router.route('/userData').post(userData);
router.route('/getUserData').get(getUserData);


export default router;

