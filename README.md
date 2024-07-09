# Personal Blogging Platform Web Application

---

## <u> Table of Contents </u>

1. [What is this web app](#what-is-this-web-app)
2. [How to install the project?](#how-to-clone-the-project)
3. [Environment Variables](#environment-variables)
    - [Frontend](#frontend)
    - [Backend](#backend)

---

## What is this web app?

This web application is a website that functions to post articles or blogs that can be used personally, but articles or blogs that have been posted can be seen and read by other people. An admin/person can read, post, edit and delete articles, but other people can only see and read them. This website also has a "Filter" feature, which can filter articles by date of creation using a certain date range that can be adjusted by everyone who uses it.

## How to clone the project?

1. Open your terminal / cmd (make sure you have already installed git)
2. In your terminal, type the command: `git clone https://github.com/RizkySugiharto/Personal-Blogging-Platform-Web-App.git`
3. Then enter the command

---

## Environment Variables

You can edit this below environment variables that you want:

### Frontend

- **NODE_ENV**

This variable functions to determine whether this application is used for `development` or `production`. The value of this variable can only be filled with: `development`, `production`. Default value: `development`.

- **VUE_APP_BACKEND_URI**

This variable is used to connect the front-end application with the back-end application using the URL from the back-end website. Example values: `localhost:3000`, `http://localhost:3000`, `http://api.pbp.com`, `https://api.pbp.com/v3`. Default value: `http://localhost:3000/v1`

- **VUE_APP_BACKEND_API_KEY**

This variable is used to secure the connection between the front-end (UI) and the back-end (API) using a key where the UI application must include the value of this variable to communicate with the API application. The value must be the same as the value of the `API_KEY` variable in the API server section. For example: ```3[=rpVzf`G$IaHBs9o{*'>}%=|r'[qeF`kU!Y|a6Mc!fC*P-W!ba6Ju[s|/=!+8Ms]BQVk&}?!!C6N }4[~8%abF$qT(/v[5<{y}[]6}*pD}Q.|<#SD-T+dX%A48QwIeN.3er'2ux$lBTI$[:aK)cY# K"*$n;|4XHE$%@k"```. Default value: `secret`.

- **VUE_APP_DATETIME_PARSE**

This variable is used as a format to convert `String` into a `Date` object. For example: `DD/MM/YYYY`, `dddd, MM YYYY`, `DD MM YYYY`. This variable is used as a format to convert `String` into a `Date` object. For example: `DD/MM/YYYY`, `dddd, MM YYYY`, `DD MM YYYY`. For more information about using the format, you can visit this website: <https://www.npmjs.com/package/date-and-time#parsedatestring-arg-utc>. Default value: `YYYY-MM-DD HH:mm:ss`.

- **VUE_APP_DATETIME_FORMAT**

This variable is used as a format to convert a `Date` object into a `String`. For example: `DD/MM/YYYY`, `dddd, MM YYYY`, `DD MM YYYY`. For more information about using the format, you can visit this website: <https://www.npmjs.com/package/date-and-time#formatdateobj-arg-utc>. Default value: `dddd, D MMMM YYYY - HH:mm:ss`.

- **VUE_APP_ADMIN_KEY**

This variable is used as a key to gain administrator access who can post, edit and delete articles or blogs freely in the web application. The value must be strong, long, complex, and unique. For example: `rk0UJMXx163K665JsUGSDtRaX0QmI+ILdgrigVraOiT+FRUKa/ASONU+3BhecEWz`. Default value: `admin-key`.

### Backend

- **NODE_ENV**

This variable functions to determine whether this application is used for `development` or `production`. The value of this variable can only be filled with: `development`, `production`. Default value: `development`.

- **MONGODB_URI**

This variable is used to determine the address or link that will be connected to the Mongo DB database server. For example: `mongodb+srv://guest:guest123@cluster0.8xrka3m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`. Default value: `mongodb+srv://<username>:<password>@cluster0.8xrka3m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

- **PORT**

This variable is used to determine what port will be opened to connect to the API server. For example: `4000`. Default Value: `3000`.

- **API_KEY**

This variable is used to secure the connection between the frontend server and the backend server. The frontend server must include a key (the value of this variable) to be able to communicate with the backend server. Because if any client or user can easily access the backend server, then that user can also get admin access rights, such as posting, editing, or even deleting articles. The key must be strong and complex so that it is not easily guessed by suspicious users. For example: ```3[=rpVzf`G$IaHBs9o{*'>}%=|r'[qeF`kU!Y|a6Mc!fC*P-W!ba6Ju[s|/=!+8Ms]BQVk&}?!!C6N }4[~8%abF$qT(/v[5<{y}[]6}*pD}Q.|<#SD-T+dX%A48QwIeN.3er'2ux$lBTI$[:aK)cY# K"*$n;|4XHE$%@k"```. Default value: `secret`.

- **ALLOWED_ORIGINS**

This variable is used to identify clients or servers with any URLs that can access the backend server. The number of URLs can be more than 1, by separating them with whitespace characters (` `). For example: `http://localhost:80`, `https://localhost https://localhost http://localhost:4500`.. Default value: `http://localhost:8080`.

- **MAX_RATELIMIT_PER_MINUTE**

This variable is used to limit how often a user can access the backend server via the frontend server every 1 minute. For example: `500`, `20`, `200`. Default value: `100`.

| Warning: |
| -------- |
| If the key of the variable `API_KEY` or `VUE_APP_ADMIN_KEY` is too long, the performance of the web application can decrease because the UI application or API application must check the letters of the key one by one. Therefore, it is recommended that the key length be only around 12 to 16 letters. |
