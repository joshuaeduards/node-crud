"use strict";

var supertest = require("supertest");
var should = require("should");
const request = require("superagent");

var server = supertest.agent("http://127.0.0.1:3000");
var login = "/login-user";
var add = "/add-user";
var edit = "/edit-user";
var del = "/del-user";
var view = "/view-user";
var multidel = "/multi-del-user";

/*********************************************************************/
//LOGIN
describe("Login Attempt: Success Credential",function(){
    it("response: Access Granted",function(done){
        server
        .post(login)
        .send({username: "admin", password: "12eqwe"})
        .expect("Content-type",/json/)
        .end(function(err, res){
            should(res.body).have.property('message', 'Access Granted');
            res.body.error = false;
            done();
        });
    });
});

describe("Login Attempt: Failed Request",function(){
    it("response: Invalid Request",function(done){
        server
        .post(login)
        .send({username: "testusers", password: "node!1tests"})
        .expect("Content-type",/json/)
        .end(function(err, res){
            should(res.body).have.property('message', 'Invalid Request');
            res.body.error = false;
            done();
        });
    });
});

describe("Login Attempt: Failed Request",function(){
    it("response: Invalid Request (Empty)",function(done){
        server
        .post(login)
        .send({username: "", password: ""})
        .expect("Content-type",/json/)
        .end(function(err, res){
            should(res.body).have.property('message', 'Invalid Request');
            res.body.error = false;
            done();
        });
    });
});

// /*********************************************************************/
// //ADD USER
describe("Add User: Success",function(){
    it("response: Insert Success",function(done){
        server
        .post(add)
        .send({user: 'test, test, test, test, test, test', auth: 'testuserdd'})
        .expect("Content-type",/json/)
        .end(function(err, res){
            should(res.body).have.property('message', 'Creation Success');
            res.body.error = false;
            done();
        });
    });
});

describe("Add User: Failed Request",function(){
    it("response: Invalid Request (Wrong Field Count)",function(done){
        server
        .post(add)
        .send({user: 'test, test, test, test, test', auth: 'testusers'})
        .expect("Content-type",/json/)
        .end(function(err, res){
            should(res.body).have.property('message', 'Invalid Request');
            res.body.error = false;
            done();
        });
    });
});


// /*********************************************************************/
// //DELETE USER
describe("Delete User: Success",function(){
    it("response: Deletion Success",function(done){
        server
        .delete(del)
        .send({id: 31})
        .expect("Content-type",/json/)
        .end(function(err, res){
            should(res.body).have.property('message', 'Deletion Success');
            res.body.error = false;
            done();
        });
    });
});

// /*********************************************************************/
//VIEW USER
describe("View User: Success",function(){
    it("response: View Success",function(done){
        server
        .post(view)
        .expect("Content-type",/json/)
        .end(function(err, res){
            should(res.body).have.instanceOf(Object);
            res.body.error = false;
            done();
        });
    });
});

// /*********************************************************************/
// //MULTI-DELETE USER
describe("Delete Multiple User: Success",function(){
    it("response: Deletion Success",function(done){
        server
        .delete(multidel)
        .send({ids: "32,45"})
        .expect("Content-type",/json/)
        .end(function(err, res){
            should(res.body).have.property('message', 'Deletion Success');
            res.body.error = false;
            done();
        });
    });
});


// /*********************************************************************/
// //EDIT USER
describe("Edit User: Success",function(){
    it("response: Update Success",function(done){
        server
        .put(edit)
        .send({"user": {"first_name": "Juan" }, 
            "auth": {"username": "Juan123"}, 
            "id": 30
        })
        .expect("Content-type",/json/)
        .end(function(err, res){
            should(res.body).have.property('message', 'Creation Success');
            res.body.error = false;
            done();
        });
    });
});
