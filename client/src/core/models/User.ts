import { ExecOptionsWithStringEncoding } from "child_process";

export interface User {
    Created?: string;
    CreatedBy?: string;
    LastModified?: string;
    LastModifiedBy?: string;
    Token?: string;
    UserId?: string;
    Username?: string;
    Email?: string;
    Gender?: string;
    Name ?: string;
    Bio?: string;
    PhoneNumber?: string;
}

export interface UserToken {
    Token?: string;
}
export interface UserGetList {
    DeptName?: string;
    DeptID?: string;
    UserInfoOutputList?: UserGetListItem[];
}
export interface UserGetListRoleGroupItem {
    RoleGroupID?: string;
    RoleGroupName?: string;
}
export interface UserGetListItem {
    UserID?: string;
    UserName?: string;
    FullName?: string;
    Email?: string;
    PhoneNumber?: string;
    Sex?: number;
    PositionName?: string;
    PositionID?: string;
    RoleGroupList?: UserGetListRoleGroupItem[];
    Button?: boolean;
    IsActive?: string;
    Avatar?: string;
    IsDelete?: boolean;
    CoefficientSalary?: number;
}
