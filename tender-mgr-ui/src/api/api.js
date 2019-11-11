export const CONTEXT = '/api';

//登陆URL
export const AUTH = CONTEXT + '/auth';
//注销
export const LOGOUT = CONTEXT + '/main/logout';
//入口页面
export const MAIN_MENUS = CONTEXT + '/main/menus';

//通用不需要权限
export const COMMON_DICT_TYPE = CONTEXT + '/mgr-common/dict/';
export const COMMON_PROJECT_PAGE = CONTEXT + '/mgr-common/project/page';

//供应商管理
export const SUPPLIER_LIST = CONTEXT + '/supplier/list';
export const SUPPLIER_ID = CONTEXT + '/supplier/info';
export const SUPPLIER_APPROVE = CONTEXT + '/supplier/approve';
export const SUPPLIER_APPROVE_NO = CONTEXT + '/supplier/noapprove/';
export const SUPPLIER_OFF = CONTEXT + '/supplier/off/';
export const SUPPLIER_ON = CONTEXT + '/supplier/on/';
export const SUPPLIER_EDIT = CONTEXT + '/supplier/edit';
export const SUPPLIER_DOWNLOAD = CONTEXT + '/supplier/download';
export const SUPPLIER_ACHIEVEMENT = CONTEXT + '/supplier/achievement';
export const PROCESS_SUPPLIER_ID= CONTEXT + '/supplier/processId';
export const PROCESS_SUPPLIER_TASK_PERSON= CONTEXT + '/supplier//task/person/';

//发标文件
export const TENDER_CODE = CONTEXT + '/tender/getCode';
export const TENDER_LIST = CONTEXT + '/tender/list';
export const TENDER_ID = CONTEXT + '/tender/info/';
export const TENDER_EDIT = CONTEXT + '/tender/edit';
export const DELETE_TENDER_BY_ID = CONTEXT + '/tender/delete';
export const PROJECT = CONTEXT + '/project/list';
export const QUALIFICATION = CONTEXT + '/qualification/list';
export const SUB_TYPE_CLASS = CONTEXT + '/subtype/list';
export const TENDER_DICT_TYPE = CONTEXT + '/tender/dict/type';
export const TENDER_UPLOAD = CONTEXT + '/tender/upload';
export const TENDER_PUBLISH = CONTEXT + '/tender/publish/';
export const TENDER_REVOK = CONTEXT + '/tender/revok/';
export const TENDER_SUBMIT= CONTEXT + '/tender/submit';
export const PROCESS_ID= CONTEXT + '/tender/processid';
export const PROCESS_OPEN_ID= CONTEXT + '/tender/processOpenId';
export const TENDER_TASK_PERSON= CONTEXT + '/tender/task/person/';
export const TENDER_DOWNLOAD= CONTEXT + '/tender/download';




//报名管理
export const ENROLL_LIST = CONTEXT + '/v_enroll/list';
export const ENROLL_TENDER_ID = CONTEXT + '/v_enroll/info';
export const ENROLL_TENDER_BY_ID = CONTEXT + '/v_enroll/tender';
export const GET_SUPPLIER_BY_ID = CONTEXT + '/v_enroll/supplier';
export const ENROLL_TENDER_EDIT = CONTEXT + '/v_enroll/edit';

//答疑管理
export const ANSWER_LIST = CONTEXT + '/v-answer/list';
export const ANSWER_ID = CONTEXT + '/v-answer/info';
export const ANSWER_ADD = CONTEXT + '/v-answer/add';
export const ANSWER_UPLOAD = CONTEXT + '/v-answer/upload';
export const DELETE_ANSWER_BY_ID = CONTEXT + '/v-answer/delete';

//投标管理
export const BID_LIST = CONTEXT + '/bid/list';
export const BID_TENDER_BY_ID = CONTEXT + '/bid/info';
export const BID_TENDER_SUPPLIER = CONTEXT + '/bid/tender/';
export const BID_TENDER_EDIT = CONTEXT + '/bid/edit';

//开标管理
export const OPEN_TENDER_LIST = CONTEXT + '/open/list';
export const OPEN_TENDER_ID = CONTEXT + '/open/info';
export const OPEN_TENDER_BY_ID = CONTEXT + '/open/supplier';
export const OPEN_TENDER_EDIT = CONTEXT + '/open/edit';
export const OPEN_TENDER_DISCARD = CONTEXT + '/open/discard';
export const OPEN_TENDER_APPROVE = CONTEXT + '/open/approve';
export const OPEN_TENDER_PUBLISH = CONTEXT + '/open/publishBid/';
export const OPEN_TTENDER_TASK_PERSON= CONTEXT + '/open/task/person/';
export const TB_DOWNLOAD_FILE= CONTEXT + '/open/download';

//菜单管理
export const SYS_MENU_TREE = CONTEXT + '/sysmenu/tree';
export const SYS_MENU_ID = CONTEXT + '/sysmenu/info';
export const SYS_MENU_SELECT = CONTEXT + '/sysmenu/select';
export const SYS_MENU_EDIT = CONTEXT + '/sysmenu/edit';
export const SYS_MENU_DELETE = CONTEXT + '/sysmenu/delete';
export const SYS_MENU_ADD = CONTEXT + '/sysmenu/add';

// 角色管理
export const SYS_ROLE_TREE = CONTEXT + '/sysrole/tree';
export const SYS_ROLE_ID = CONTEXT + '/sysrole/info';
export const SYS_ROLE_SELECT = CONTEXT + '/sysrole/select';
export const SYS_ROLE_MENU = CONTEXT + '/sysrole/confmenu';
export const SYS_ROLE_GETMENUS = CONTEXT + '/sysrole/getmenus';

//用户管理
export const SYS_USER_LIST = CONTEXT + '/sysuser/list';
export const SYS_USER_ID = CONTEXT + '/sysuser/info';
export const SYS_USER_GETROLES = CONTEXT + '/sysuser/getroles';
export const SYS_USER_ROLE = CONTEXT + '/sysuser/confrole';

//资源管理
export const SYS_RESOURCE_TREE = CONTEXT + '/sysresource/tree';
export const SYS_RESOURCE_ID = CONTEXT + '/sysresource/info';
export const SYS_RESOURCE_SELECT = CONTEXT + '/sysresource/select';
export const SYS_RESOURCE_EDIT = CONTEXT + '/sysresource/edit';
export const SYS_RESOURCE_DELETE = CONTEXT + '/sysresource/delete';
export const SYS_RESOURCE_ADD = CONTEXT + '/sysresource/add';

//字典管理
export const SYS_DICT_LIST = CONTEXT + '/sysdict/list';
export const SYS_DICT_SAVE = CONTEXT + '/sysdict/save';
export const SYS_DICT_EDIT = CONTEXT + '/sysdict/edit';
export const SYS_DICT_DELETE = CONTEXT + '/sysdict/delete';

//字典详情
export const SYS_DICT_DETAILS_LIST = CONTEXT + '/sysdict/details/list';
export const SYS_DICT_DETAILS_SAVE = CONTEXT + '/sysdict/details/save';
export const SYS_DICT_DETAILS_EDIT = CONTEXT + '/sysdict/details/edit';
export const SYS_DICT_DETAILS_DELETE = CONTEXT + '/sysdict/details/delete';

//审批管理
//审批角色管理
export const APPROVE_ROLE_LIST = CONTEXT + '/approve-role/list';
export const APPROVE_ROLE_SAVE = CONTEXT + '/approve-role/save';
export const APPROVE_ROLE_EDIT = CONTEXT + '/approve-role/edit';
export const APPROVE_ROLE_DELETE = CONTEXT + '/approve-role/delete';
//审批角色用户关系
export const APPROVE_MEMBERSHIP_LIST = CONTEXT + '/approve-membership/list';
export const APPROVE_MEMBERSHIP_SAVE = CONTEXT + '/approve-membership/save';
export const APPROVE_MEMBERSHIP_EDIT = CONTEXT + '/approve-membership/edit';
export const APPROVE_MEMBERSHIP_DELETE = CONTEXT + '/approve-membership/delete/';
export const APPROVE_SYS_USER_LIST = CONTEXT + '/approve-membership/sys-user/list';
//供应商审批角色配置
export const APPROVE_SUPPLIER_ROLE_LIST = CONTEXT + '/approve-supplier/role/list';
export const APPROVE_SUPPLIER_LIST = CONTEXT + '/approve-supplier/list';
export const APPROVE_SUPPLIER_DELETE = CONTEXT + '/approve-supplier/delete';
//项目审批配置
export const APPROVE_PROJECT_LIST = CONTEXT + '/approve-project/list';
export const APPROVE_PROJECT_SAVE = CONTEXT + '/approve-project/save';
export const APPROVE_PROJECT_DELETE = CONTEXT + '/approve-project/delete/';
export const APPROVE_PROJECT_EDIT = CONTEXT + '/approve-project/edit';
export const APPROVE_PROJECT_SYS_USER_LIST = CONTEXT + '/approve-project/sys-user/list';
export const APPROVE_PROJECT_ROLE_LIST = CONTEXT + '/approve-project/role/list';
export const APPROVE_PROJECT_GLOBAL_CONF = CONTEXT + '/approve-project/global/conf';
//代办任务
export const WAIT_TASK_LIST = CONTEXT + '/wait-task/list';
export const WAIT_TASK_DO = CONTEXT + '/wait-task/do';
export const WAIT_TASK_FLOW_IMG = CONTEXT + '/wait-task/flow-img/';
export const WAIT_TASK_HIS_TASK_COMMENT = CONTEXT + '/wait-task/comment/';
//历史任务
export const HIS_TASK_LIST = CONTEXT + '/his-task/list';
export const HIS_TASK_COMMENT = CONTEXT + '/his-task/comment/';

//系统日志
export const SYS_LOG_LIST = CONTEXT + '/sys-log/list';


