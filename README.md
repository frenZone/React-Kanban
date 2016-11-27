# React Kanban
> A digital Kanban board made with React

##Public View

![](https://github.com/reneechar/React-Kanban/blob/master/github_images/src1.png)

##Signed in View

![](https://github.com/reneechar/React-Kanban/blob/master/github_images/src2.png)
---



###Run Kanban

In your command line within the repository you cloned:
- `npm install` to install all dependencies for the project
- `psql` to enter Postgres
- your username is on the left side of `=#` *keep note of this username for creating your config.json file
- `CREATE DATABASE react_kanban;` to initialize your database
- `\c react_kanban` to enter into your database
- in another terminal pane, run the command `touch config/config.json`
- in the config directory, open the config_example.json file and copy all into the newly created config.json file.
- In config.json, enter your username for your database under the development section. *this is the username that we mentioned earlier
- in another terminal pane, run the command `sequelize db:migrate`
- run the commmand `sequelize db:seed:all` to populate the database.
- `node server.js` to begin the server and click on the localhost link in your terminal.