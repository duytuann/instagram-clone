<h1>Instagram clone</h1>

Instagram clone is a fully responsive social media app that is a mimic for Instagram built using ReactJS and ASP.Net Core.

## Important Note
> I am still working on the project, this is not the final verison of it, I just make it public to get feedback and imporve it ... Happay-Eid 🎉🐏

## About
> Instanews is a fully responsive social media app that is a mimic for [Instagram](https://www.instagram.com/) built using [ReactJS](https://reactjs.org/) and [ASP.NET Core](https://dotnet.microsoft.com/en-us/apps/aspnet)

### Build with
- [ReactJS](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux Saga](https://redux-saga.js.org/)
- [Axios](https://github.com/axios/axios)
- [ViteJS](https://vitejs.dev/)

- [ASP.NET Core](https://dotnet.microsoft.com/en-us/apps/aspnet)
- [Entity Framework](https://docs.microsoft.com/en-us/ef/)
- [Azure Blob Storage](https://azure.microsoft.com/en-us/services/storage/blobs/)
- [Auto Mapper](https://automapper.org/)
- [JWT Token](https://jwt.io/)

## Getting Started
> This is an list of needed instructions to set up your project locally, to get a local copy up and running follow these instructuins.

### Installation

1. **_Clone the repository_**

```sh
$ git clone https://github.com/duytuann/instagram-clone.git
```
2. **_Navigate to repository directory_**
```sh
$ cd instagram-clone
```

3. **_Install dependencies_**

```sh
$ cd client -> npm install
$ npm install
```

3. **_Change your Connection String_**

```sh
In File instagram-clone/server/Instagram.API/appsettings.json, change your postgresSqlConnection to your ConnectionString.
```


### Running

**_Compiles and hot-reloads for development_**
```sh
$ cd client -> npm run dev
$ cd server/Instagram.API -> dotnet watch
```
### Database Schema

![image](https://user-images.githubusercontent.com/95377982/185882103-1c14f4eb-10ad-4156-8d08-33a59f511ab3.png)


### Features

### Sign In and Sign Up (Security With JWT Bearer Token)

![signin](https://user-images.githubusercontent.com/95377982/185363735-37feac8a-ffb5-433a-b2ed-40dcf1cd3086.gif)
![image](https://user-images.githubusercontent.com/95377982/185367659-e7a30a28-20bc-4afe-afae-7709871c4d5e.png)


### Post Media (Storage with Azure Blob Storage)

![postgif](https://user-images.githubusercontent.com/95377982/185365502-c4b7127b-9271-4ea3-9f53-e5aaf2e92fae.gif)

### Profile Detail

![image](https://user-images.githubusercontent.com/95377982/185367466-7c887f62-2441-417f-9b93-184032ca0bf8.png)

### Paging Comment and NewFeed

![image](https://user-images.githubusercontent.com/95377982/185366255-cdd4c1d7-1f89-4715-a813-44792d7b6359.png)

### And More (Follow, UnFollow, Inbox, ...) 

I have finished the API but I haven't finished the interface part. :joy: :joy:

