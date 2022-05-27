NODE-CRUD: dev deploy
1. terminal: run npm install inside app folder for modules installation

2. configure mysql credentials in .env to your localhost

3. create DB name -> node-crud for migration and seeding

4. to run the app: 
- npm run dev(repo folder)

NOTE: creation of auth table should be initiated first since it will be contraint to users table
5. migrations: 
- npm run migrate-auth-up
- npm run migrate-users-up

*for table dropping, run the ff:
- npm run migrate-auth-down
- npm run migrate-users-down

NOTE: the admin user will be seeded, it has default password generated
user: admin, pass: 12eqwe
- for the adding of users, default password will be created also, <"node!1"+username>
6. seeding:
- npm run seed

7. test: to run endpoint test 
- npm run mocha
test cases: appfolder/test/test.js
