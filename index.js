// MAPD713
// Project - Milestone 2
// Group 6
// Vitalii Pielievin - 300885108
// Dmytro Andriichuk - 301132978
//
// Version - 1.00
// Local Storage - no MongoDB implementation
// 


var SERVER_NAME = 'patients-api'
var PORT = 3009;
var HOST = '127.0.0.1';
var restify = require('restify')

  // Get a persistence engine for the patients
  , patientsSave = require('save')('patients')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
    console.log(`Server ${server.name} listening at ${server.url}`)
    console.log('Endpoints:')
    console.log(`           ${server.url}/patients`)
})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())

// List All Patients Use Case
// http://127.0.0.1:3009/patients
server.get('/patients', function (req, res, next) {
  // Find every entity within the given collection
  patientsSave.find({}, function (error, patients) {
    // Return all of the patients in the system
    res.send(patients);
  })
})

// View Patient Use Case
server.get('/patients/:id', function (req, res, next) {

  // Find a single name by their id
  patientsSave.findPatient({ _id: req.params.id }, function (error, name) {
    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (name) {
      // Send the name if no issues
      res.send(201, name)
      console.log(name);
    } else {
      // Send 404 header if the name doesn't exist
      res.send(404)
    }
  })
})







