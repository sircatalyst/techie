# nest-base-api


![Node.js CI]([])

## Built With

- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Nest.js](https://docs.nestjs.com/)
- [MongoDB](https://www.mongodb.com/)


## For Development

To clone and run this application in development mode, you'll need [Node.js](https://nodejs.org/en/download/), [Git](https://git-scm.com) and  [MongoDB](https://www.mongodb.com/) on your computer.
In your command line, type:

```bash
# Clone this repository
$ git clone [https://github.com/sircatalyst/techie.git]

# Enter the project directory
$ cd [techie]

# Install dependencies
$ npm install

# Start the development server
$ npm run start:dev
```
Also, you will need some environment variables to run the application successfully. Check [.envEXAMPLE](.envEXAMPLE) for the environment variables.

With the server running, visit the endpoint below with [Postman](https://www.postman.com/) or any other api testing tool

`GET localhost:3001/api/v1`

```bash
# success request to this GET localhost:3001/api/v1 endpoint will return
{
  "status": 200,
  "data": "Hello World, Welcome to Techie!"
}
```

# To run test
$ npm run test:e2e

## Author
- **Temitope Bamidele**
