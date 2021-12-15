import { ADD_CHAPTER } from "store/subject-management/chapters/actionTypes"
import { del, get, patch,post, put } from "../api_helper"
import * as api from "../url_helper"

//Authentication
export const loginApi = data => {
  return post(api.SUPER_ADMIN_LOGIN, data)
}
export const forgotPassword = data => {
  data.redirect_url=process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL
  return post(api.FORGOT_PASSWORD, data)
}

export const getProfile = data => {
  return post(api.GET_PROFILE, data)
}

export const updateProfile = data => {
  return post(api.UPDATE_PROFILE, data)
}

export const ResetPassword = data => {
  return post(api.RESET_PASSWORD, data)
}


// Roles
export const getRoles = () => {
  return post(api.GET_ROLES)
}
export const addNewRole = role => {
  return post(api.ADD_NEW_ROLE, role)
}
export const updateRole = role => {
  return post(api.UPDATE_ROLE, role)
}
export const deleteRole = role => {
  return post(api.DELETE_ROLE, role)
}

// Permissions
export const getPermissions = () => {
  return post(api.GET_PERMISSIONS)
}
export const assignPermission = data => {
  return post(api.ASSIGN_PERMISSIONS, data)
}

// Users
export const getUsers = () => {
  return post(api.GET_ALL_USERS)
}
export const addNewUser = user => {
  return post(api.CREATE_USER, user)
}
export const updateUser = user => {
  return post(api.UPDATE_THE_USER, user)
}
export const deleteUser = user => {
  return post(api.DELETE_THE_USER, user)
}

// Exam-Boards
export const getExamBoards = () => {
  return post(api.GET_EXAM_BOARDS)
}
export const addNewExamBoard = exam_board => {
  return post(api.CREATE_EXAM_BOARD, exam_board)
}
export const updateExamBoard = exam_board => {
  return post(api.UPDATE_EXAM_BOARD, exam_board)
}
export const deleteExamBoard = exam_board => {
  return post(api.DELETE_EXAM_BOARD, exam_board)
}

// Key-Stages
export const getKeyStages = () => {
  return post(api.GET_KEY_STAGES)
}
export const addKeyStage = key_stage => {
  return post(api.CREATE_KEY_STAGE, key_stage)
}
export const updateKeyStage = key_stage => {
  return post(api.UPDATE_KEY_STAGE, key_stage)
}
export const deleteKeyStage = key_stage => {
  return post(api.DELETE_KEY_STAGE  , key_stage)
}

// Years
export const getYears = () => {
  return post(api.GET_YEARS)
}
export const addYear = key_stage => {
  return post(api.CREATE_YEAR, key_stage)
}
export const updateYear = key_stage => {
  return post(api.UPDATE_YEAR, key_stage)
}
export const deleteYear = key_stage => {
  return post(api.DELETE_YEAR  , key_stage)
}

// Subjects
export const getSubjects = () => {
  return post(api.GET_SUBJECTS)
}
export const addSubject = subject => {
  return post(api.CREATE_SUBJECT, subject)
}
export const updateSubject = subject => {
  return post(api.UPDATE_SUBJECT, subject)
}
export const deleteSubject = subject => {
  return post(api.DELETE_SUBJECT  , subject)
}

// Chapters
export const getChapters = (data) => {
  return post(api.GET_CHAPTERS,data)
}
export const addChapter = chapter => {
  return post(api.CREATE_CHAPTER, chapter)
}
export const updateChapter = chapter => {
  return post(api.UPDATE_CHAPTER, chapter)
}
export const deleteChapter = chapter => {
  return post(api.DELETE_CHAPTER  , chapter)
}

// Lessons
export const getLessons = (data) => {
  return post(api.GET_LESSON,data)
}
export const addLesson = lesson => {
  return post(api.CREATE_LESSON, lesson)
}
export const updateLesson = lesson => {
  return post(api.UPDATE_LESSON, lesson)
}
export const deleteLesson = lesson => {
  return post(api.DELETE_LESSON  , lesson)
}
export const getAccessToken = lesson => {
  return post(api.GET_ACCESS_TOKEN  , lesson)
}
export const createVideo = lessonData => {
  return post(api.CREATE_VIDEO  , lessonData)
}
export const verifyVideo = ({upload_link,size}) => {
    let config = {
        headers: {
            "Tus-Resumable": "1.0.0",
            "Accept":"application/vnd.vimeo.*+json;version=3.4",
            "Upload-Offset": size,
            "Content-Type": "application/offset+octet-stream",
        }
    }   
  return patch(upload_link,{},config)
}

// Plan and Prices
export const getPlans = (data) => {
  return post(api.GET_PLANS,data)
}
export const addPlan = plan => {
  return post(api.CREATE_PLAN, plan)
}
export const updatePlan = plan => {
  return post(api.UPDATE_PLAN, plan)
}
export const deletePlan = plan => {
  return post(api.DELETE_PLAN  , plan)
}

// Question and Answers
export const getQuestions = (data) => {
  return post(api.GET_QUESTIONS,data)
}
export const addQuestion = question => {
  return post(api.CREATE_QUESTION, question)
}
export const updateQuestion = question => {
  return post(api.UPDATE_QUESTION, question)
}
export const deleteQuestion = question => {
  return post(api.DELETE_QUESTION  , question)
}

// Self Test
export const getSelfTests = (data) => {
  return post(api.GET_SELF_TEST,data)
}
export const addSelfTest = selftest => {
  return post(api.CREATE_SELF_TEST, selftest)
}
export const updateSelfTest = selftest => {
  return post(api.UPDATE_SELF_TEST, selftest)
}
export const deleteSelfTest = selftest => {
  return post(api.DELETE_SELF_TEST  , selftest)
}

// Self Test - Questions
export const getSelfTestQuestions = (data) => {
  return post(api.GET_SELF_TEST_QUESTIONS,data)
}
export const addSelfTestQuestion = selftest => {
  return post(api.CREATE_SELF_TEST_QUESTION, selftest)
}
export const updateSelfTestQuestion = selftest => {
  return post(api.UPDATE_SELF_TEST_QUESTION, selftest)
}
export const deleteSelfTestQuestion = selftest => {
  return post(api.DELETE_SELF_TEST_QUESTION  , selftest)
}

// Worksheet
export const getWorksheet = (data) => {
  return post(api.GET_WORKSHEET,data)
}
export const addWorksheet = selftest => {
  return post(api.CREATE_WORKSHEET, selftest)
}
export const updateWorksheet = selftest => {
  return post(api.UPDATE_WORKSHEET, selftest)
}
export const deleteWorksheet = selftest => {
  return post(api.DELETE_WORKSHEET  , selftest)
}

// Worksheet - Questions
export const getWorksheetQuestions = (data) => {
  return post(api.GET_SELF_TEST_QUESTIONS,data)
}
export const addWorksheetQuestion = selftest => {
  return post(api.CREATE_SELF_TEST_QUESTION, selftest)
}
export const updateWorksheetQuestion = selftest => {
  return post(api.UPDATE_SELF_TEST_QUESTION, selftest)
}
export const deleteWorksheetQuestion = selftest => {
  return post(api.DELETE_SELF_TEST_QUESTION  , selftest)
}

// Video Management - Vimeo
export const getVideos = (data) => {
  return post(api.GET_VIDEOS,data)
}
export const addVideo = video => {
  return post(api.CREATE_NEW_VIDEO, video)
}
export const updateVideo = video => {
  return post(api.UPDATE_VIDEO, video)
}
export const deleteVideo = video => {
  return post(api.DELETE_VIDEO  , video)
}

export const verifyNewVideo = ({upload_link,size}) => {
  let config = {
      headers: {
          "Tus-Resumable": "1.0.0",
          "Accept":"application/vnd.vimeo.*+json;version=3.4",
          "Upload-Offset": size,
          "Content-Type": "application/offset+octet-stream",
      }
  }   
  return patch(upload_link,{},config)
}
  
// Past Paper
export const getPastPaper = (data) => {
  return post(api.GET_PASTPAPER,data)
}
export const addPastPaper = pastpaper => {
  return post(api.CREATE_PASTPAPER, pastpaper)
}
export const updatePastPaper = pastpaper => {
  return post(api.UPDATE_PASTPAPER, pastpaper)
}
export const deletePastPaper = pastpaper => {
  return post(api.DELETE_PASTPAPER  , pastpaper)
}

// Worksheet - Questions
export const getPastPaperQuestions = (data) => {
  return post(api.GET_PASTPAPER_QUESTIONS,data)
}
export const addPastPaperQuestion = pastpaper => {
  return post(api.CREATE_PASTPAPER_QUESTION, pastpaper)
}
export const updatePastPaperQuestion = pastpaper => {
  return post(api.UPDATE_PASTPAPER_QUESTION, pastpaper)
}
export const deletePastPaperQuestion = pastpaper => {
  return post(api.DELETE_PASTPAPER_QUESTION  , pastpaper)
}
