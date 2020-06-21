# Send image to the server using drag-and-drop

It is an excercise project in my portfolio-site admin tool research.  
Using React for the frontend and Express for the backend, uploading images to the server and serving them is implemented.

## install

Run `npm install` or `yarn` depending on your prefererence.

You'll need several environment variables to run the server.

Either set them in the `server/.env` files, or set in the environment itself.

```bash
# AWS accounts
AWS_ACCESS_KEY=YOUR_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY

# Database: postgresql
RDS_DB_NAME=POSTGRES_DB_NAME
RDS_USERNAME=POSTGRES_MASTER_USER_NAME
RDS_PASSWORD=YOUR_PASSWORD
RDS_HOSTNAME=RDS_HOSTNAME # in development it might be 'localhost'

# S3
BUCKET_NAME=YOUR_S3_BUCKET_NAME
```

Finally, you must have a S3 bucket corresponding to the `process.env.BUCKET_NAME`

## Run

Run `npm start` or `yarn start` to run the fullstack development server.

Run `npm run client` or `yarn client` to run only the client.

And run `npm run server` or `yarn server` to run only the server

## build

TODO
