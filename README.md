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
                ├── team-leader
                ├── salesman
```
### 权限说明
``` txt
管理员权限：组织架构 客户管理 礼品模块
```