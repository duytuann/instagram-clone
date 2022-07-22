# Architecture

## Layer

- Domain: cốt lõi của hệ thống, chứa **Enterprise Logic**,
    
    Domain layer sẽ chứa tất cả các entities, enums, exceptions, interfaces, types và các logic cụ thể cho domain layer. 
    
    KEY POINT:
    
    - Tránh sử dụng chú thích dữ liệu.
    - Sử dụng các Value Objects khi thích hợp.
    - Tạo các domain exceptions tuỳ chỉnh.
    - Khởi tạo tất cả các collections & sử dụng private setters.
    - Tự động theo dõi các thay đổi
- Application: chứa **Business Logic**.
    
    Application layer sẽ chứa tất cả các Application logic. Nó phụ thuộc vào Domain Layer, nhưng không phụ thuộc vào bất kỳ lớp or dự án nào khác. Ở đây sẽ xác định các Interface được thực hiện bởi các Layer bên ngoài.
    
    Ví dụ: nếu ứng dụng cần truy cập Notification Service, một Interface mới sẽ được thêm vào Application và việc triển khai Service này sẽ ở Infrastructure Layer.
    
    KEY POINT:
    
    - Sử dụng CQRS + MediatR đơn giản hóa thiết kế tổng thể.
    - MediatR simplifies cross cutting concerns
    - Fluent Validation rất hữu ích cho các tình huống xác thực.
    - AutoMapper đơn giản hoá việc mapping và projections
    - Không phụ thuộc vào các infrastructure concerns
- Infrastructure
    
    Infrastructure Layer chứa các Class để truy cập các tài nguyên bên ngoài (File systems, Web service, SMTP, …) và các Class này phải dựa trên các Interface được xác định ở Application Layer.
    
    KEY POINT:
    
    - Độc lập với database
    - Sử dụng cấu hình API Fluent trên các chú thích dữ liệu
    - Ưu tiên conventions hơn là configuration
    - Tự động áp dụng tất cả các cấu hình cho entity.
    - Không có Layer nào phụ thuộc vào Infrastructure layer, e.g. Presentation layer
- WebAPI
    
    Layer này là một Single Page Application ( có thể dựa trên Angular, React hoặc VueJs …). Layer này phụ thuộc vào cả (Application và Infrastructure Layer) tuy nhiên sự phụ thuộc vào Infrastructure Layer chỉ để hỗ trợ Dependency Injection ⇒ Chỉ Startup.cs tham chiếu tới Infrastructure.