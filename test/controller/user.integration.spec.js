var expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const user = mongoose.model('users');

describe('Integration test for user management', ()=>{
    describe('#PUT to /user with userName and password', ()=>{
        it('should indicate success for log in', (done)=>{
            supertest(app)
                .put('/user')
                // for the purpose of integration test, we leak the sample user's password
                .send({account:'user', password:'user'})
                .end((err, res)=>{
                    expect(res.statusCode).to.equal(200);
                    expect(res.error).to.be.false;
                    expect(res.body.userName).to.equal('user');
                    done();
                });
        });
        it('should indicate unsuccess for log in (username and password unmatched)', (done)=>{
            supertest(app)
                .put('/user')
                .send({account:'user', password:'randompasswordcc'})
                .end((err, res)=>{
                    expect(res.statusCode).to.equal(200);
                    expect(res.error).to.be.false;
                    expect(res.body.error).to.equal("unmatched user name or password");
                    done();
                });
        });
    });

    describe('#PUT to /user/signup with userName, password and email', ()=>{
        //only use it once
        // it('should indicate success for sign up', (done)=>{
        //     supertest(app)
        //         .put('/user/signup')
        //         .send({userName:'newuser00333', password:'123456', email:'sample@sample.com'})
        //         .end((err, res)=>{
        //             expect(res.statusCode).to.equal(200);
        //             expect(res.error).to.be.false;
        //             expect(res.body.userName).to.equal('newuser00333');
        //             done();
        //         });
        // });

        it('should indicate unsuccess for sign up', (done)=>{
            supertest(app)
                .put('/user/signup')
                .send({userName:'user', password:'123456', email:'sample@sample.com'})
                .end((err, res)=>{
                    expect(res.statusCode).to.equal(200);
                    expect(res.error).to.be.false;
                    expect(res.body.error).to.equal('used user name');
                    done();
                });
        });
    })
    describe('#GET to /user/checkcookie to check the log in status', ()=>{
        it('should give error for not log in', (done)=>{
            supertest(app)
                .get('/user/login')
                .end((err,res)=>{
                    expect(res.statusCode).to.equal(200);
                    expect(res.error).to.be.false;
                    expect(res.body.error).to.equal("invalid object id!");
                });
            done();
        });

        it('should give user information if user has logged in', (done)=>{
            const cValue = "_userID=5ed2972a83beb506e8103b11";
            supertest(app)
                .get('/user/checkcookie')
                .set('Cookie', cValue)
                .end((err, res) =>{
                    expect(res.statusCode).to.equal(200);
                    expect(res.error).to.be.false;
                    user.findById("5ed2972a83beb506e8103b11", (err, doc) => {
                        expect(res.body.description).to.equal(doc.description);
                        expect(res.body.email).to.equal(doc.email);
                        expect(res.body.userName).to.equal(doc.userName);
                    });
                    done();
                });
            });
    });

    describe('#GET to /user:id to get user information', ()=>{
        it('should give user information for given user id', (done)=>{
            supertest(app)
                .get('/user/5ed2972a83beb506e8103b11')
                .end((err, res)=>{
                    expect(res.statusCode).to.equal(200);
                    expect(res.error).to.be.false;
                    user.findById("5ed2972a83beb506e8103b11", (err, doc) => {
                        expect(res.body.userName).to.equal(doc.userName);
                        expect(res.body.description).to.equal(doc.description);
                    });
                    done();
                });
        });
    });


    describe("#PUT to /user:id to update user description and email", ()=>{
        it('should update user description and email', (done)=>{
            let new_des = "sample description";
            let new_email = "user@user.io";
            const cValue = "_userID=5ed2972a83beb506e8103b11";
            supertest(app)
                .put('/user/5ed2972a83beb506e8103b11')
                .set('Cookie', cValue)
                .send({description:new_des, email:new_email})
                .end((err, res) =>{
                    expect(res.statusCode).to.equal(200);
                    expect(res.error).to.be.false;
                    user.findById("5ed2972a83beb506e8103b11", (err, doc) => {
                        expect(new_des).to.equal(doc.description);
                        expect(new_email).to.equal(doc.email);
                    });
                    done();
                });
        });
    });
    describe("#GET to /user:id/posts to get all the posts by users", ()=>{
        it('should get all the posts of user', (done)=>{
            supertest(app)
            .get('/user/5ed2972a83beb506e8103b11/posts')
            .end((err, res)=>{
                expect(res.statusCode).to.equal(200);
                expect(res.error).to.be.false;
                for (var post of res.body){
                    expect(post.user).to.be.equal("5ed2972a83beb506e8103b11");
                }
                done();
            });
        });
    });


    describe("#GET to /user:id/comments to get all the comments by users", ()=>{
        it('should get all the comments of user', (done)=>{
            supertest(app)
            .get('/user/5ed2972a83beb506e8103b11/comments')
            .end((err, res)=>{
                expect(res.statusCode).to.equal(200);
                expect(res.error).to.be.false;
                for (var comment of res.body){
                    expect(comment.user).to.be.equal("5ed2972a83beb506e8103b11");
                }
                done();
            });
        });
    });

    describe('#GET to /user/logout to log out a user', ()=>{
        it('should indicate success for log out', (done) =>{
            supertest(app)
                .get('/user/logout')
                .end((err, res)=>{
                    expect(res.statusCode).to.equal(200);
                    expect(res.error).to.be.false;
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});