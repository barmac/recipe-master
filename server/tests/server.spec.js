const chai = require('chai'),
  expect = chai.expect,
  chaiHttp = require('chai-http'),
  {ObjectID} = require('mongodb'),
  app = require('../../server'),
  User = require('../models/user'),
  Recipe = require('../models/recipe');

chai.use(chaiHttp);

const mockUsers = [
  {
    username: 'TestUser#1',
    password: 'Password#1'
  },
  {
    username: 'TestUser#2',
    password: 'Password#2'
  }
];

const mockRecipes = [
  {
    _id: new ObjectID(),
    name: "Lorem ipsum #1",
    restricted: false,
    instructions: [
      {
        _id: new ObjectID(),
        time: 1,
        name: "Lorem ipsum"
      }
    ],
    ingredients: [
      {
        _id: new ObjectID(),
        name: "Lorem",
        unit: "ipsum",
        quantity: 1,
      }
    ],
    photoURL: "https://firebasestorage.googleapis.com/v0/b/recipemaster-5cfba.appspot.com/o/uploads%2F1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg?alt=media&token=7c235f31-4012-42e3-9e19-0da461234e54",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in imperdiet odio. Cras orci dolor, condimentum vitae pellentesque sed, tincidunt et ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris sollicitudin, velit et fermentum vehicula, tellus mauris laoreet nisi, vel interdum lectus dui ut arcu. Curabitur ornare viverra dapibus. Vivamus egestas eros libero, eget placerat dui tristique ac. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque eros neque, varius non cursus ac, imperdiet a magna. Phasellus cursus commodo erat quis molestie. Vestibulum vel lacinia mauris."
  },
  {
    _id: new ObjectID(),
    name: "Lorem ipsum #2",
    restricted: false,
    instructions: [
      {
        _id: new ObjectID(),
        time: 1,
        name: "Lorem ipsum"
      }
    ],
    ingredients: [
      {
        _id: new ObjectID(),
        name: "Lorem",
        unit: "ipsum",
        quantity: 1,
      }
    ],
    photoURL: "https://firebasestorage.googleapis.com/v0/b/recipemaster-5cfba.appspot.com/o/uploads%2F1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg?alt=media&token=7c235f31-4012-42e3-9e19-0da461234e54",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in imperdiet odio. Cras orci dolor, condimentum vitae pellentesque sed, tincidunt et ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris sollicitudin, velit et fermentum vehicula, tellus mauris laoreet nisi, vel interdum lectus dui ut arcu. Curabitur ornare viverra dapibus. Vivamus egestas eros libero, eget placerat dui tristique ac. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque eros neque, varius non cursus ac, imperdiet a magna. Phasellus cursus commodo erat quis molestie. Vestibulum vel lacinia mauris."
  }
];


describe('/api/users', function () {
  beforeEach((done) => {
    User.remove({}).then(() => User.create(mockUsers)).then(() => done());
  });

  describe('POST /api/users', function () {
    it('should create a new user', function (done) {
      chai.request(app)
        .post('/api/users')
        .send({
          username: 'TestUser#3',
          password: 'TestPassword#3'
        })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should return status 400 if password is not provided', function (done) {
      chai.request(app)
        .post('/api/users')
        .send({
          username: 'TestUser#4'
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('POST /api/users/login', function () {
    it('should return json with id and token in its body after successful login', function (done) {
      chai.request(app)
        .post('/api/users/login')
        .send(mockUsers[0])
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.id).to.be.a('string');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

    it('should return status 401 in case of wrong password', function (done) {
      chai.request(app)
        .post('/api/users/login')
        .send({
          username: mockUsers[0].username,
          password: 'wrong password'
        })
        .end(function (err, res) {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should return status 400 in case of logging not existing user', function (done) {
      chai.request(app)
        .post('/api/users/login')
        .send({
          username: 'not existing user',
          password: 'wrong password'
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});

describe('/api/recipes', function () {

  let token;

  beforeEach((done) => {
    Recipe.remove({}).then(() => Recipe.insertMany(mockRecipes)).then(() => done());
  });

  beforeEach(function (done) {
    User.remove({})
      .then(() => User.create(mockUsers))
      .then(() => User.findOne({}))
      .then(function (err, user) {
        if (err) {
          done(err);
        }
        token = user.generateAuthToken();
        done();
      });
  });

  describe('GET /api/recipes', function () {

  });
  describe('POST /api/recipes', function () {

  });
  describe('GET /api/recipes/:id', function () {

  });
  describe('PUT /api/recipes/:id', function () {

  });
  describe('DELETE /api/recipes/:id', function () {

  });
});
