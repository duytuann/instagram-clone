# Architecture

## Layer

- Domain: cốt lõi của hệ thống, chứa **Enterprise Logic**,
    
    Domain layer sẽ chứa tất cả các entities, enums, exceptions, interfaces, types và các logic cụ thể cho domain layer. 
    
- Application: chứa **Business Logic**.
    
    Application layer sẽ chứa tất cả các Application logic. Nó phụ thuộc vào Domain Layer, nhưng không phụ thuộc vào bất kỳ lớp or dự án nào khác. Ở đây sẽ xác định các Interface được thực hiện bởi các Layer bên ngoài.
    
    Ví dụ: nếu ứng dụng cần truy cập Notification Service, một Interface mới sẽ được thêm vào Application và việc triển khai Service này sẽ ở Infrastructure Layer.
    
- Infrastructure
    
    Infrastructure Layer chứa các Class để truy cập các tài nguyên bên ngoài (File systems, Web service, SMTP, …) và các Class này phải dựa trên các Interface được xác định ở Application Layer.
    
- WebUI
    
    Layer này là một Single Page Application ( có thể dựa trên Angular, React hoặc VueJs …). Layer này phụ thuộc vào cả (Application và Infrastructure Layer) tuy nhiên sự phụ thuộc vào Infrastructure Layer chỉ để hỗ trợ Dependency Injection ⇒ Chỉ Startup.cs tham chiếu tới Infrastructure.