# 采坑记录

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## 关于ng-container不能使用的问题
```js
- 需要在每个独立的模块中导入：import { CommonModule } from '@angular/common';
- 当你明明已经在模块中导入了CommonModule，却发现ng-container还是不能使用，那就需要重新启动一下服务，ng的弊端太恶心了
```
## 文件目录结构
```
    ├── src
        ├── app
            ├── pages
                ├── organization      组织架构
```
### 权限说明
``` txt
管理员权限：组织架构 客户管理 礼品模块
```
### 待联调的
``` txt
1.组织架构，返回的菜单数据，权限  需要作处理
2.业务员操作界面 提醒 这一栏的数据没有联调 没有接口
3.话术管理列表返回的字段"details"为null
6.个人设置模块，目前暂不支持修改账号密码，用户名称等，需要后端接口配合
7.login页面 118行，写死了角色：userInfo['roleCode'] = 'role_salesman';
8.客户详情 -> 点击战败弹框(未经过验证保存成功)
9.名单分配模块 调用api/customer/queryDistributionInfo接口 应该返回业务员的userID
10.返利申请模块 调用api/order/operationOrder接口 operationCode值为7，调用成功以后，handleStatus的值还是和原来的一样
11.保单查询是123，返利查询是678
12.名单管理 名单分配模块 点击保存分配数额给业务员，再次调用接口获取业务员b数据，结果还是为0
13.内勤人员 点击 保单审核管理 -> 确认出单信息 ->后端需要新添加一个字段：orderDate(出单日期)
``` 
