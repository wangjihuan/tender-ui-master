import Timeline from '@/pages/Timeline'
import Article from '@/pages/Article'
import Login from '@/pages/Login'
import Supplier from '@/pages/Supplier'
import ResetPwd from '@/pages/ResetPwd'
import Register from '@/pages/Register'
import SupplierEdit from '@/pages/SupplierEdit'
import SupplierTypEdit from '@/pages/SupplierTypEdit'
import Frame from '@/pages/Frame'
import TenderList from '@/pages/TenderList'
import TenderCard from '@/pages/TenderCard'
import NotifyList from '@/pages/NotifyList'
import NotifyCard from '@/pages/NotifyCard'
import MyTenderList from '@/pages/MyTenderList'
import MyTenderCard from '@/pages/MyTenderCard'
import activate from '@/pages/activate'
import MyEnrollList from '@/pages/MyEnrollList'
import MyEnrollCard from '@/pages/MyEnrollCard'
import TenderAnswerList from '@/pages/TenderAnswerList'
import ForgetPassword from '@/pages/ForgetPassword'

const routes = [
  {path: '/login', name: 'login', component: Login},
  {path: '/register', name: 'register', component: Register},
  {path: '/', redirect: '/login'},
  {path: '/activate', name: 'activate', component: activate},
  {path: '/forget-password', name: 'ForgetPassword', component: ForgetPassword},
  {
    path: '/', component: Frame,
    meta: {requireAuth: true},
    children: [
      {path: 'tender-list', name: 'TenderList', meta: {keep_alive: true}, component: TenderList},
      {path: 'tender-card/:id', name: 'TenderCard', component: TenderCard},
      {path: 'supplier', name: 'supplier', component: Supplier},
      {path: 'resetPwd', name: 'resetPwd', component: ResetPwd},
      {path: 'supplier-edit', name: 'supplier-edit', component: SupplierEdit},
      {path: 'supplier-typ-edit', name: 'supplier-typ-edit', component: SupplierTypEdit},
      {path: 'notify-list', name: 'notify-list', component: NotifyList},
      {path: 'notify-card/:id/:status', name: 'notify-card', component: NotifyCard},
      {path: 'mtender-card/:id/:status', name: 'MyTenderCard', component: MyTenderCard},
      {path: 'mtender-list', name: 'MyTenderList', component: MyTenderList},
      {path: 'menroll-list', name: 'MyEnrollList', component: MyEnrollList},
      {path: 'menroll-card/:id/:status', name: 'MyEnrollCard', component: MyEnrollCard},
      {path: 'answer-list', name: 'TenderAnswerList', component: TenderAnswerList},

    ]
  },
  {path: '/time-line', name: 'time-line', component: Timeline},
  {path: '/article', name: 'article', component: Article},

];


export default routes;
