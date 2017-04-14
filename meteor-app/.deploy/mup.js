module.exports = {
  servers: {
    one: {
      host: '54.191.99.167',
      username: 'ubuntu',
      pem: '~/.ssh/coen-315.pem',
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'slycam-app',
    path: '../',
    servers: {
      one: {},
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      PORT: '3001',
      ROOT_URL: 'https://slycam.incognitech.in',
      MONGO_URL: 'mongodb://localhost/meteor',
    },


    docker: {
      // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
      image: 'abernix/meteord:base',
    },
    deployCheckWaitTime: 60,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: false
  },

  mongo: {
    oplog: true,
    port: 27017,
    version: '3.4.1',
    servers: {
      one: {},
    },
  },
};
