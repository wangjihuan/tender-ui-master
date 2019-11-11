import Login from '@/pages/Login'
import Supplier from '@/pages/Supplier'
import TenderPublish from '@/pages/TenderPublish'
import TenderPublishCard from '@/pages/TenderPublishCard'
import NotifyList from '@/pages/NotifyList'
import NoticeList from '@/pages/NoticeList'
import NoticeCard from '@/pages/NoticeCard'
import OpenTenderNotice from '@/pages/OpenTenderNotice'
import TenderCard1 from '@/pages/TenderCard1'
import Frame2 from '@/pages/Frame2'
import SupplierList from '@/pages/SupplierList'
import NotifyCard from '@/pages/NotifyCard'
import SysMenu from '@/pages/sys/SysMenu'
import SysResource from '@/pages/sys/SysResource'
import SysRole from '@/pages/sys/SysRole'
import UserManager from '@/pages/UserManager'
import Enroll from '@/pages/Enroll'
import EnrollCard from '@/pages/EnrollCard'
import SysDict from '@/pages/sys/SysDict'
import SysDictDetails from '@/pages/sys/SysDictDetails'
import UploadTest from '@/pages/sys/UploadTest'
import TenderOpen from '@/pages/TenderOpen'
import TenderOpenCard from '@/pages/TenderOpenCard'
import Answer from '@/pages/Answer'
import AnswerCard from '@/pages/AnswerCard'
import Bid from '@/pages/Bid'
import BidCard from '@/pages/BidCard'
import ApproveRole from '@/pages/approve/ApproveRole'
import ActMembership from '@/pages/approve/ActMembership'
import ActWaitTask from '@/pages/approve/ActWaitTask'
import ApproveSupplier from '@/pages/approve/ApproveSupplier'
import ActHisTask from '@/pages/approve/ActHisTask'
import ApproveProject from '@/pages/approve/ApproveProject'
import ApproveProjConfig from '@/pages/approve/ApproveProjConfig'
import SysLog from '@/pages/sys/SysLog'

const routes =
  [
    {path: '/login', name: 'login', component: Login},
    {path: '/', name: '_login', redirect: '/login'},
    {path: '/logout', name: '_logout', redirect: '/login'},
    {
      path: '/',
      name: 'Frame2',
      component: Frame2,
      children: [
        { path: 'supplier-list', name: 'supplier-list',component: SupplierList},
        { path: 'supplier/:id', name: 'supplier', component: Supplier},
        //发标管理
        { path: 'tender-publish',name: 'TenderPublish',component: TenderPublish},
        { path: 'tender-publish/card/:id',name: 'TenderPublishCard',component: TenderPublishCard},
        { path: 'notify-list',name: 'notify-list', component: NotifyList},
        { path: 'notice-list',name: 'noticeList',component: NoticeList},
        { path: 'notice-card',name: 'NoticeCard',component: NoticeCard},
        { path: 'open-tender-notice',name: 'NoticeCard',component: OpenTenderNotice},
        { path: 'tender-card1',name: 'TenderCard1',component: TenderCard1},
        { path: 'notify-card',name: 'notify-card', component: NotifyCard},
        { path: 'sys-menu',name: 'sys-menu',component: SysMenu},
        { path: 'sys-resource',name: 'sys-resource',component: SysResource},
        { path: 'sys-role',name: 'sys-role',component: SysRole},
        { path: 'userManager',name: 'userManager',component: UserManager},
        { path: 'sys-dict',name: 'sys-dict',component: SysDict },
        { path: 'sys-dict/details',name: 'sysDictDetails',component: SysDictDetails },
        { path: 'enroll',name: 'enroll',component: Enroll},
        { path: 'enrollCard/:id',name: 'EnrollCard',component: EnrollCard},
        { path: 'UploadTest',name: 'UploadTest',component: UploadTest},
        { path: 'tender-open',name: 'TenderOpen',component: TenderOpen},
        { path: 'tender-open/card/:id',name: 'TenderOpenCard',component: TenderOpenCard},
        { path: 'answer',name: 'answer',component: Answer},
        { path: 'answerCard/:id',name: 'AnswerCard',component: AnswerCard},
        { path: 'bid',name: 'bid',component: Bid},
        { path: 'bidCard/:id',name: 'BidCard',component: BidCard},
        { path: 'approve-role',name: 'ApproveRole',component: ApproveRole},
        { path: 'approve-supplier/membership',name: 'ActMembership',component: ActMembership},
        { path: 'awit-task',name: 'ActWaitTask',component: ActWaitTask},
        { path: 'approve-supplier',name: 'ApproveSupplier',component: ApproveSupplier},
        { path: 'his-task',name: 'ActHisTask',component: ActHisTask},
        { path: 'approve-project',name: 'ApproveProject',component: ApproveProject},
        { path: 'approve-proj-config',name: 'ApproveProjConfig',component: ApproveProjConfig},
        { path: 'sys-log',name: 'SysLog',component: SysLog},
      ]
    },
  ];


export default routes;
