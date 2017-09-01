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

    it('should respond with status 400 if password is not provided', function (done) {
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

    it('should respond with status 401 in case of wrong password', function (done) {
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

    it('should respond with status 400 in case of logging not existing user', function (done) {
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

  let token, userId;

  beforeEach((done) => {
    Recipe.remove({}).then(() => Recipe.insertMany(mockRecipes)).then(() => done());
  });

  beforeEach(function (done) {
    User.remove({})
      .then(() => User.create(mockUsers))
      .then(() => User.findOne({}))
      .then((user) => {
        token = user.generateAuthToken();
        userId = user._id.toString();
      })
      .then(() => Recipe.findByIdAndUpdate(mockRecipes[0]._id, {owner: userId}))
      .then(() => done());
  });

  describe('GET /api/recipes', function () {
    it('should get all recipes', function (done) {
      chai.request(app)
        .get('/api/recipes')
        .set('Authorization', `Bearer ${token}`)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res).to.have.property('body').with.lengthOf(2);
          done();
        });
    });

    it('should respond with status 401 if no token provided', function (done) {
      chai.request(app)
        .get('/api/recipes')
        .end(function (err, res) {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe('POST /api/recipes', function () {
    it('should create a recipe', function (done) {
      chai.request(app)
        .post('/api/recipes')
        .set('Authorization', `Bearer ${token}`)
        .send(mockRecipes[0])
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.name).to.be.equal(mockRecipes[0].name);
          expect(res.body.owner).to.be.equal(userId);
          done();
        });
    });

    it('should respond with status 400 if name not provided', function (done) {
      chai.request(app)
        .post('/api/recipes')
        .set('Authorization', `Bearer ${token}`)
        .send({})
        .end(function (err, res) {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should respond with status 401 if no token provided', function (done) {
      chai.request(app)
        .post('/api/recipes')
        .send(mockRecipes[0])
        .end(function (err, res) {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe('GET /api/recipes/:id', function () {
    it('should send recipe', function (done) {
      chai.request(app)
        .get(`/api/recipes/${mockRecipes[0]._id.toString()}`)
        .set('Authorization', `Bearer ${token}`)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.name).to.be.equal(mockRecipes[0].name);
          expect(res.body.desc).to.be.equal(mockRecipes[0].desc);
          expect(res.body.restricted).to.be.equal(mockRecipes[0].restricted);
          expect(res.body.photoURL).to.be.equal(mockRecipes[0].photoURL);
          expect(res.body.owner).to.be.equal(userId);
          done();
        });
    });

    it('should respond with status 404 if invalid id provided', function (done) {
      chai.request(app)
        .get('/api/recipes/123')
        .set('Authorization', `Bearer ${token}`)
        .end(function (err, res) {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should respond with status 404 if valid id of not existing item provided', function (done) {
      chai.request(app)
        .get(`/api/recipes/${new ObjectID}`)
        .set('Authorization', `Bearer ${token}`)
        .end(function (err, res) {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should respond with status 401 if no token provided', function (done) {
      chai.request(app)
        .get(`/api/recipes/${mockRecipes[0]._id.toString()}`)
        .end(function (err, res) {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe('PUT /api/recipes/:id', function () {

    const newName = 'Updated recipe name';

    it('should update a recipe', function (done) {
      chai.request(app)
        .put(`/api/recipes/${mockRecipes[0]._id.toString()}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: newName
        })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          Recipe.findById(mockRecipes[0]._id.toString())
            .then(function (recipe) {
              expect(recipe.name).to.be.equal(newName);
              done();
            });
        });
    });

    it('should respond with status 404 if invalid id provided', function (done) {
      chai.request(app)
        .put('/api/recipes/123')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: newName
        })
        .end(function (err, res) {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should respond with status 404 if valid id of not existing item provided', function (done) {
      chai.request(app)
        .put(`/api/recipes/${new ObjectID}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: newName
        })
        .end(function (err, res) {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should respond with status 401 if no token provided', function (done) {
      chai.request(app)
        .put(`/api/recipes/${mockRecipes[0]._id.toString()}`)
        .send({
          name: newName
        })
        .end(function (err, res) {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should respond with status 400 if invalid name provided', function (done) {
      chai.request(app)
        .put(`/api/recipes/${mockRecipes[0]._id.toString()}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: ''
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should respond with status 403 if request not from owner', function (done) {
      chai.request(app)
        .put(`/api/recipes/${mockRecipes[1]._id.toString()}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: newName
        })
        .end(function (err, res) {
          expect(res).to.have.status(403);
          done();
        });
    });

    it('should respond with status 401 if no token provided', function (done) {
      chai.request(app)
        .post('/api/recipes')
        .send(mockRecipes[0])
        .end(function (err, res) {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe('DELETE /api/recipes/:id', function () {

  });
});
