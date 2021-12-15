//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register"

//LOGIN
export const POST_FAKE_LOGIN = "/post-fake-login"
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login"
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd"
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd"
export const SOCIAL_LOGIN = "/social-login"

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile"
export const POST_EDIT_PROFILE = "/post-fake-profile"

//PRODUCTS
export const GET_PRODUCTS = "/products"
export const GET_PRODUCTS_DETAIL = "/product"

//Mails
export const GET_INBOX_MAILS = "/inboxmails"
export const ADD_NEW_INBOX_MAIL = "/add/inboxmail"
export const DELETE_INBOX_MAIL = "/delete/inboxmail"

//starred mail
export const GET_STARRED_MAILS = "/starredmails"

//important mails
export const GET_IMPORTANT_MAILS = "/importantmails"

//Draft mail
export const GET_DRAFT_MAILS = "/draftmails"

//Send mail
export const GET_SENT_MAILS = "/sentmails"

//Trash mail
export const GET_TRASH_MAILS = "/trashmails"

//CALENDER
export const GET_EVENTS = "/events"
export const ADD_NEW_EVENT = "/add/event"
export const UPDATE_EVENT = "/update/event"
export const DELETE_EVENT = "/delete/event"
export const GET_CATEGORIES = "/categories"

//CHATS
export const GET_CHATS = "/chats"
export const GET_GROUPS = "/groups"
export const GET_CONTACTS = "/contacts"
export const GET_MESSAGES = "/messages"
export const ADD_MESSAGE = "/add/messages"

//ORDERS
export const GET_ORDERS = "/orders"
export const ADD_NEW_ORDER = "/add/order"
export const UPDATE_ORDER = "/update/order"
export const DELETE_ORDER = "/delete/order"

//CART DATA
export const GET_CART_DATA = "/cart"

//CUSTOMERS
export const GET_CUSTOMERS = "/customers"
export const ADD_NEW_CUSTOMER = "/add/customer"
export const UPDATE_CUSTOMER = "/update/customer"
export const DELETE_CUSTOMER = "/delete/customer"

//SHOPS
export const GET_SHOPS = "/shops"

//CRYPTO
export const GET_WALLET = "/wallet"
export const GET_CRYPTO_ORDERS = "/crypto/orders"

//INVOICES
export const GET_INVOICES = "/invoices"
export const GET_INVOICE_DETAIL = "/invoice"

//PROJECTS
export const GET_PROJECTS = "/projects"
export const GET_PROJECT_DETAIL = "/project"
export const ADD_NEW_PROJECT = "/add/project"
export const UPDATE_PROJECT = "/update/project"
export const DELETE_PROJECT = "/delete/project"

//TASKS
export const GET_TASKS = "/tasks"

//CONTACTS
export const GET_USERS = "/users"
export const GET_USER_PROFILE = "/user"
export const ADD_NEW_USER = "/add/user"
export const UPDATE_USER = "/update/user"
export const DELETE_USER = "/delete/user"

//dashboard charts data
export const GET_WEEKLY_DATA = "/weekly-data"
export const GET_YEARLY_DATA = "/yearly-data"
export const GET_MONTHLY_DATA = "/monthly-data"

export const TOP_SELLING_DATA = "/top-selling-data"

export const GET_EARNING_DATA = "/earning-charts-data"

export const GET_PRODUCT_COMMENTS = "/comments-product"

export const ON_LIKNE_COMMENT = "/comments-product-action"

export const ON_ADD_REPLY = "/comments-product-add-reply"

export const ON_ADD_COMMENT = "/comments-product-add-comment"



// Authentication
export const SUPER_ADMIN_LOGIN = "/auth/login"
export const FORGOT_PASSWORD = "/auth/recovery"
export const CHECK_RESET_PASSWORD_TOKEN = "/auth/checkResetPasswordToken"
export const GET_PROFILE = "/viewProfile"
export const UPDATE_PROFILE = "/updateProfile"
export const RESET_PASSWORD = "/auth/reset"



// Users
export const GET_ALL_USERS = "/viewUser"
export const CREATE_USER = "/createUser"
export const UPDATE_THE_USER = "/updateUser"
export const DELETE_THE_USER = "/deleteUser"

// Roles
export const GET_ROLES = "/viewRole"
export const ADD_NEW_ROLE = "/createRole"
export const UPDATE_ROLE = "/updateRole"
export const DELETE_ROLE = "/deleteRole"

// Permissions
export const GET_PERMISSIONS = "/viewPermission"
export const ASSIGN_PERMISSIONS = "/assignDetachPermission"

// Exam Boards
export const GET_EXAM_BOARDS = "/viewExamBoard"
export const CREATE_EXAM_BOARD = "/createExamBoard"
export const UPDATE_EXAM_BOARD = "/updateExamBoard"
export const DELETE_EXAM_BOARD = "/deleteExamBoard"

// Exam Boards
export const GET_KEY_STAGES = "/viewKeyStage"
export const CREATE_KEY_STAGE = "/createKeyStage"
export const UPDATE_KEY_STAGE = "/updateKeyStage"
export const DELETE_KEY_STAGE = "/deleteKeyStage"

// Years
export const GET_YEARS = "/viewYear"
export const CREATE_YEAR = "/createYear"
export const UPDATE_YEAR = "/updateYear"
export const DELETE_YEAR = "/deleteYear"

// Subjects
export const GET_SUBJECTS = "/viewSubject"
export const CREATE_SUBJECT = "/createSubject"
export const UPDATE_SUBJECT = "/updateSubject"
export const DELETE_SUBJECT = "/deleteSubject"

// Chapters
export const GET_CHAPTERS = "/viewChapter"
export const CREATE_CHAPTER = "/createChapter"
export const UPDATE_CHAPTER = "/updateChapter"
export const DELETE_CHAPTER = "/deleteChapter"

// Lessons
export const GET_LESSON = "/viewLesson"
export const CREATE_LESSON = "/createLesson"
export const UPDATE_LESSON = "/updateLesson"
export const DELETE_LESSON = "/deleteLesson"
export const GET_ACCESS_TOKEN = "/accessToken"
export const CREATE_VIDEO = "/createVideo"
export const VERIFY_VIDEO = "/verifyVideo"

// PlanAndPrices
export const GET_PLANS = "/viewPlan"
export const CREATE_PLAN = "/createPlan"
export const UPDATE_PLAN = "/updatePlan"
export const DELETE_PLAN = "/deletePlan"

// Question and Answers
export const GET_QUESTIONS = "/viewQa"
export const CREATE_QUESTION = "/createQa"
export const UPDATE_QUESTION = "/updateQa"
export const DELETE_QUESTION = "/deleteQa"

// SelfTest
export const GET_SELF_TEST = "/viewSelfTest"
export const CREATE_SELF_TEST = "/createSelfTest"
export const UPDATE_SELF_TEST = "/updateSelfTest"
export const DELETE_SELF_TEST = "/deleteSelfTest"

export const GET_SELF_TEST_QUESTIONS = "/viewQuestion"
export const CREATE_SELF_TEST_QUESTION = "/createQuestion"
export const UPDATE_SELF_TEST_QUESTION = "/updateQuestion"
export const DELETE_SELF_TEST_QUESTION = "/deleteQuestion"

// Worksheet
export const GET_WORKSHEET = "/viewWorkSheet"
export const CREATE_WORKSHEET = "/createWorkSheet"
export const UPDATE_WORKSHEET = "/updateWorkSheet"
export const DELETE_WORKSHEET = "/deleteWorkSheet"

export const GET_WORKSHEET_QUESTIONS = "/viewQuestion"
export const CREATE_WORKSHEET_QUESTION = "/createQuestion"
export const UPDATE_WORKSHEET_QUESTION = "/updateQuestion"
export const DELETE_WORKSHEET_QUESTION = "/deleteQuestion"

//Video Management - Vimeo
export const GET_VIDEOS = ""
export const CREATE_NEW_VIDEO = "/createVimeoVideo"
export const UPDATE_VIDEO = "/"
export const DELETE_VIDEO = "/"
export const VERIFY_NEW_VIDEO = "/"

// PastPaper
export const GET_PASTPAPER = "/viewPastPaper"
export const CREATE_PASTPAPER = "/createPastPaper"
export const UPDATE_PASTPAPER = "/updatePastPaper"
export const DELETE_PASTPAPER = "/deletePastPaper"

export const GET_PASTPAPER_QUESTIONS = "/viewQuestion"
export const CREATE_PASTPAPER_QUESTION = "/createQuestion"
export const UPDATE_PASTPAPER_QUESTION = "/updateQuestion"
export const DELETE_PASTPAPER_QUESTION = "/deleteQuestion"