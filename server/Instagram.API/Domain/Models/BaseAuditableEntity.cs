namespace Instagram.API.Domain.Models;

public abstract class BaseAuditableEntity
{
    // refer: https://stackoverflow.com/questions/54049471/configuring-abstract-base-class-without-creating-table-in-ef-core
    public DateTime Created { get; set; }

    public DateTime LastModified { get; set; }
}
