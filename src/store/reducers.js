import { combineReducers } from "redux"
import { reducer as thunkReducer } from 'redux-saga-thunk'

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"
import ecommerce from "./e-commerce/reducer"

import roles from "./user-management/roles/reducer"
import permissions from "./user-management/permissions/reducer"
import examboard from "./settings/examboard/reducer"
import keystage from "./settings/keystage/reducer"
import years from "./settings/years/reducer"
import subjects from "./subject-management/subjects/reducer"
import chapters from "./subject-management/chapters/reducer"
import lessons from "./subject-management/lessons/reducer"
import plansAndPrices from "./plan-and-prices/reducer"
import questionAndAnswer from "./question-and-answer/reducer"
import selfTest from "./self-test/reducer"
import selfTestQuestions from "./self-test/questions/reducer"
import worksheet from "./worksheet/reducer"
import worksheetQuestions from "./worksheet/questions/reducer"
import video from "./video/reducer"
import pastpaper from "./pastpaper/reducer"
import pastPaperQuestions from "./pastpaper/questions/reducer"



// Old Reducers


//Calendar
import calendar from "./calendar/reducer"

//chat
import chat from "./chat/reducer"

//crypto
import crypto from "./crypto/reducer"

//invoices
import invoices from "./invoices/reducer"

//projects
import projects from "./projects/reducer"

//tasks
import tasks from "./tasks/reducer"

//contacts
import contacts from "./user-management/contacts/reducer"

//mails
import mails from "./mails/reducer";

//Dashboard 
import Dashboard from "./dashboard/reducer";

//Dasboard saas
import DashboardSaas from "./dashboard-saas/reducer";

const rootReducer = combineReducers({
  thunk:thunkReducer,
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  ecommerce,
  roles,
  permissions,
  examboard,
  keystage,
  years,
  subjects,
  chapters,
  lessons,
  plansAndPrices,
  questionAndAnswer,
  selfTest,
  selfTestQuestions,
  worksheet,
  worksheetQuestions,
  video,
  pastpaper,
  pastPaperQuestions,
  // Old
  calendar,
  chat,
  mails,
  crypto,
  invoices,
  projects,
  tasks,
  contacts,
  Dashboard,
  DashboardSaas
})

export default rootReducer
