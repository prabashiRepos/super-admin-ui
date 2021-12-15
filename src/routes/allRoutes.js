import React from "react"
import { Redirect } from "react-router-dom"

// Students
import StudentList from "../pages/Student/StudentList"
import CreateStudent from "../pages/Student/CreateStudent"
// Teachers
import TeacherList from "../pages/Teacher/TeacherList"
import CreateTeacher from "../pages/Teacher/CreateTeacher"

import UsersList from "../pages/Users/UsersList"
import RolesList from "../pages/Users/RolesList"
import Examboard from "../pages/Examboard/Examboard"
import KeyStage from "../pages/KeyStage/KeyStage"
import Year from "../pages/Year/Year"
import Subject from "../pages/Subject/Subject"
import Chapter from "../pages/Chapter/Chapter"
import Lessons from "../pages/Lessons/Lessons"
import PlanAndPrices from "../pages/PlanAndPrices/PlanAndPrices"
import CreatePlan from "../pages/PlanAndPrices/CreatePlan"
import QuestionAndAnswers from "../pages/QuestionAndAnswers/QuestionAndAnswers"
import HelpAndSupport from "../pages/HelpAndSupport/HelpAndSupport"
import SelfTest from "../pages/SelfTest/SelfTest"
import SelfTestQuestions from "../pages/SelfTest/SelfTestQuestions"
import Worksheet from "../pages/Worksheet/Worksheet"
import WorksheetQuestions from "../pages/Worksheet/WorksheetQuestions"
import PastPaper from "../pages/PastPaper/PastPaper"
import PastPaperQuestions from "../pages/PastPaper/PastPaperQuestions"

// Profile
import UserProfile from "../pages/Authentication/user-profile"


// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPassword from "../pages/Authentication/ForgetPassword"
import ResetPassword from "../pages/Authentication/ResetPassword"

// Dashboard
import DashboardSaas from "../pages_/Dashboard-saas/index"
import DashboardCrypto from "../pages_/Dashboard-crypto/index"
import Blog from "../pages_/Dashboard-Blog/index"

//Ui
// import UiAlert from "../pages_/Ui/UiAlert"
// import UiButtons from "../pages_/Ui/UiButtons"
// import UiCards from "../pages_/Ui/UiCards"
// import UiCarousel from "../pages_/Ui/UiCarousel"
// import UiColors from "../pages_/Ui/UiColors"
// import UiDropdown from "../pages_/Ui/UiDropdown"
// import UiGeneral from "../pages_/Ui/UiGeneral"
// import UiGrid from "../pages_/Ui/UiGrid"
// import UiImages from "../pages_/Ui/UiImages"
// import UiLightbox from "../pages_/Ui/UiLightbox"
// import UiModal from "../pages_/Ui/UiModal"
// import UiProgressbar from "../pages_/Ui/UiProgressbar"
// import UiSweetAlert from "../pages_/Ui/UiSweetAlert"
// import UiTabsAccordions from "../pages_/Ui/UiTabsAccordions"
// import UiTypography from "../pages_/Ui/UiTypography"
// import UiVideo from "../pages_/Ui/UiVideo"
// import UiSessionTimeout from "../pages_/Ui/UiSessionTimeout"
// import UiRating from "../pages_/Ui/UiRating"
// import UiRangeSlider from "../pages_/Ui/UiRangeSlider"
// import UiNotifications from "../pages_/Ui/ui-notifications"
import UiDrawer from "pages_/Ui/UiDrawer"
// import UiBreadcrumb from '../pages_/Ui/UiBreadcrumb';

//Pages
import PagesMaintenance from "../pages_/Utility/pages-maintenance"


const userRoutes = [
  { path: "/dashboard", component: PagesMaintenance },

  { path: "/students", component: StudentList },
  { path: "/students/create", component: CreateStudent },
  { path: "/teachers", component: TeacherList },
  { path: "/teachers/create", component: CreateTeacher },
  { path: "/users", component: UsersList },
  { path: "/roles", component: RolesList },
  { path: "/exam-board", component: Examboard },
  { path: "/key-stages", component: KeyStage },
  { path: "/years", component: Year },
  { path: "/subjects", component: Subject },
  { path: "/chapters", component: Chapter },
  { path: "/lessons", component: Lessons },
  { path: "/plan-and-prices", component: PlanAndPrices },
  { path: "/plan-and-prices/create", component: CreatePlan },
  { path: "/plan-and-prices/edit", component: CreatePlan },
  { path: "/questions", component: QuestionAndAnswers },
  { path: "/help-and-support", component: HelpAndSupport },
  { path: "/self-test", component: SelfTest },
  { path: "/self-test/:self_test_id", component: SelfTestQuestions },
  { path: "/worksheet", component: Worksheet },
  { path: "/worksheet/:work_sheet_id", component: WorksheetQuestions },
  { path: "/pastpaper", component: PastPaper },
  { path: "/pastpaper/:past_paper_id", component: PastPaperQuestions },

  { path: "/profile", component: UserProfile },
  { path: "/dashboard-saas", component: DashboardSaas },
  { path: "/dashboard-crypto", component: DashboardCrypto },
  { path: "/blog", component: Blog },


//   // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPassword },
  { path: "/register", component: Register },
  { path: "/resetpassword/*", component: ResetPassword },
]

export { userRoutes, authRoutes }
