module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your APIMFA API docs',
      version: '1.0.0',
      description: 'MFA simple application in Node.js',
    },
    servers: [
      {
        url: 'http://localhost:1000',
      },
    ],
  },
  paths: {
    '/auth/register': {
      post: {
        summary: 'Register new user',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string', default: 'john_doe' },
                  firstname: { type: 'string', default: 'john' },
                  lastname: { type: 'string', default: 'doe' },
                  email: { type: 'string', default: 'john_doe@yahoo.com' },
                  password: { type: 'string', default: 'password' },
                },
                required: ['username', 'firstname', 'lastname', 'email', 'password'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User registered successfully',
          },
          '401': {
            description: 'Username or email already exists',
          },
          '500': {
            description: 'Error registering user',
          },
        },
      },
    },

    '/auth/login': {
      post: {
        summary: 'Login user',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  password: { type: 'string' },
                },
                required: ['username', 'password'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Verification code sent successfully',
          },
          '401': {
            description: 'Invalid credentials',
          },
          '500': {
            description: 'Error during login',
          },
        },
      },
    },

    '/auth/verify': {
      post: {
        summary: 'Verify Code for MFA',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  verificationCode: { type: 'string' },
                },
                required: ['verificationCode'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Verification code sent successfully',
          },
          '401': {
            description: 'Invalid verification code',
          },
          '500': {
            description: 'Error during verification',
          },
        },
      },
    },

  },
};