export const CONTEXT = '/api';

//认证
export const AUTH = CONTEXT + '/auth';
export const LOGOUT = CONTEXT + '/sys/logout';
export const RESET_PASSWORD = CONTEXT + '/sys/resetpwd';
export const USER_CREDENTIALS= CONTEXT + '/sys/credentials';
export const USER_CREDENTIALS_SAVE= CONTEXT + '/sys/credentials/save';
export const USER_CREDENTIALS_UPLOAD= CONTEXT + '/sys/credentials/upload';
export const USER_INFO = CONTEXT + '/user/info';
export const USER_YJ = CONTEXT + '/user/yj';

//登陆页面
export const LOGIN_DICT_TYPE = CONTEXT + '/login/dict/';

//编辑用户
export const USER_EDIT =CONTEXT + '/user/editUser'
export const USER_TYP_EDIT =CONTEXT + '/user/editTypUser'
export const FILES_DOWNLOAD =CONTEXT + '/user/download'
export const FILES_UPLOAD =CONTEXT + '/user/upload'

//注册
export const REGISTER = CONTEXT + '/register/info';
export const ACTIVATE_ID = CONTEXT + '/register/activate';
export const REGISTER_UPLOAD = CONTEXT  + '/register/upload';
export const REGISTER_DICT_TYPE = CONTEXT + '/register/dict/type';
export const REGISTER_SMS_CODE = CONTEXT + '/register/sms-code/';
export const QUALIFICATION_LIST = CONTEXT + '/register/qualification-list';
export const SUB_TYPE_CLASS = CONTEXT + '/register/class-list';
//忘记密码
export const FORGET_SMS_CODE = CONTEXT + '/forget-password/sms-code/';
export const FORGET_SUBMIT = CONTEXT + '/forget-password/submit';


//招标信息
export const TENDER_PORTAL_LIST = CONTEXT + '/tender/list';
export const TENDER_DICT_STATUS= CONTEXT + '/tender/status/';
export const TENDER_INFO_ID= CONTEXT + '/tender/info/';
export const TENDER_ISENROLL_ID= CONTEXT + '/tender/isenroll/';
export const TENDER_TO_ENROLL= CONTEXT + '/tender/toenroll/';
export const QUALIFICATION = CONTEXT + '/tender/qualification';
export const TYPE_CLASS = CONTEXT + '/register/class-list';
// export const TYPE_CLASS = CONTEXT + '/type-class/list';

//我的报名
export const MENROLL_LIST = CONTEXT + '/menroll/list';
export const MENROLL_UPLOAD = CONTEXT + '/menroll/upload';
export const MENROLL_DOWNLOAD = CONTEXT + '/menroll/download';
export const MENROLL_TENDER = CONTEXT + '/menroll/tender';
//是否拥有权限查看，投标详情
export const TENDER_BID_STATUS= CONTEXT + '/menroll/bid-status/';

//答疑
export const ANSWER_LIST= CONTEXT + '/answer/list';
export const ANSWER_DOWNLOAD_FILE= CONTEXT + '/answer/download';


//我的投标
export const ME_TENDER_LIST= CONTEXT + '/me-tender/list';
export const ME_TENDER_INFO= CONTEXT + '/me-tender/info/';
export const ME_TENDER_DOWNLOAD= CONTEXT + '/me-tender/download';

//中标公告
export const NOTIFY_LIST= CONTEXT + '/bid-tender/list';
export const NOTIFY_TENDER_ID= CONTEXT + '/bid-tender/info/';
export const NOTIFY_DOWNLOAD= CONTEXT + '/bid-tender/download/';







