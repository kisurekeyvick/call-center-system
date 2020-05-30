/**
 * @desc 本地存储字段
 */
export enum LocalStorageItemName {
    /** 客户详情标识 */
    CUSTOMERDETAIL = 'CUSTOMERDETAIL',
    /** 角色信息 */
    ROLEINFO = 'ROLEINFO',
    /** 根据用户Id获取的用户信息缓存 */
    USERPROFILE = 'USERPROFILE',
    /** token */
    TOKRN = 'TOKRN',
    /** 保单审核查看详情 */
    POLICYREVIEW = 'POLICYREVIEW',
    /** 保单查询查看详情 */
    SUCCESSSUBMITREVIEW = 'SUCCESSSUBMITREVIEW',
    /** 保单审核条件缓存 */
    POLICYREVIEWSEARCHPARAMS = 'POLICYREVIEWSEARCHPARAMS',
    /** 保单提交条件缓存 */
    SUCCESSSUBMISEARCHPARAMS = 'SUCCESSSUBMISEARCHPARAMS',
    /** 名单查询条件缓存 */
    LISTMANAGESEARCHPARAMS = 'LISTMANAGESEARCHPARAMS',
    /** 客户管理查询条件缓存 */
    CUSTOMERSEARCHPARAMS = 'CUSTOMERSEARCHPARAMS'
}
