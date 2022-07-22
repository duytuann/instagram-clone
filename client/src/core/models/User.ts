export interface User {
    CreateDate?: string;
    CreateDateTick?: string;
    CreateUser?: string;
    Email?: string;
    FullName?: string;
    FullNameNoMark?: string;
    IsDelete?: boolean;
    LastUpdate?: string;
    LastUpdateTick?: string;
    Password?: string;
    PhoneNumber?: string;
    PositionId?: number;
    Gender?: number;
    UpdateUser?: string;
    UserID?: string;
    UserName?: string;
}
export interface UserToken {
    CountriesCode?: string;
    CreateDate?: string;
    ExpiredDate?: string;
    ID?: string;
    IpAddress?: string;
    IsRememberPassword?: boolean;
    Language?: string;
    TimeUpdateExpiredDateToDB?: string;
    Token?: string;
    UserID?: string;
    Username?: string;
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
