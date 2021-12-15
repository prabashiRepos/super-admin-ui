import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"

import RolesSaga from "./user-management/roles/saga"
import PermissionSaga from "./user-management/permissions/saga"
import ExamBoardSaga from "./settings/examboard/saga"
import KeystageSaga from "./settings/keystage/saga"
import YearsSaga from "./settings/years/saga"
import SubjectsSaga from "./subject-management/subjects/saga"
import ChaptersSaga from "./subject-management/chapters/saga"
import LessonsSaga from "./subject-management/lessons/saga"
import planAndPricesSaga from "./plan-and-prices/saga"
import QuestionAndAnswerSaga from "./question-and-answer/saga"
import SelfTestSaga from "./self-test/saga"
import SelfTestQuestionSaga from "./self-test/questions/saga"
import WorksheetSaga from "./worksheet/saga"
import WorkSheetQuestionsSaga from "./worksheet/questions/saga"
import VideoSaga from "./video/saga"
import PastPaperSaga from "./pastpaper/saga"
import PastPaperQuestionsSaga from "./pastpaper/questions/saga"


import LayoutSaga from "./layout/saga"
import ecommerceSaga from "./e-commerce/saga"
import calendarSaga from "./calendar/saga"
import chatSaga from "./chat/saga"
import cryptoSaga from "./crypto/saga"
import invoiceSaga from "./invoices/saga"
import projectsSaga from "./projects/saga"
import tasksSaga from "./tasks/saga"
import mailsSaga from "./mails/saga"
import contactsSaga from "./user-management/contacts/saga";
import dashboardSaga from "./dashboard/saga";
import dashboardSaasSaga from "./dashboard-saas/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(RolesSaga),
    fork(PermissionSaga),
    fork(ExamBoardSaga),
    fork(KeystageSaga),
    fork(YearsSaga),
    fork(SubjectsSaga),
    fork(ChaptersSaga),
    fork(LessonsSaga),
    fork(planAndPricesSaga),
    fork(QuestionAndAnswerSaga),
    fork(SelfTestSaga),
    fork(SelfTestQuestionSaga),
    fork(WorksheetSaga),
    fork(WorkSheetQuestionsSaga),
    fork(VideoSaga),
    fork(PastPaperSaga),
    fork(PastPaperQuestionsSaga),



    fork(LayoutSaga),
    fork(ecommerceSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(mailsSaga),
    fork(cryptoSaga),
    fork(invoiceSaga),
    fork(projectsSaga),
    fork(tasksSaga),
    fork(contactsSaga),
    fork(dashboardSaga),
    fork(dashboardSaasSaga)
  ])
}
