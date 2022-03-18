# LifeRaft Code Test

Code Test Submission for: Chris Moulins (chrismoulins@gmail.com)

## Getting started

After cloning the repo. You will be required to run the following commands:
```
composer install
```
```
npm install
```
```
cp .env.example .env
```
```
php artisan key:generate
```
```
docker-compose up
```
App is now available at `http://localhost:8000`

## Disclosure

I realize that this isn't taking full advantage of a containerized environment.
I attempted to use the repo provided at `https://gitlab.com/steve.day/liferaft-php-code-test` but ran into a lot of issues. It did not work out of the box for me.
I was able to get the front-end to listen on `http://localhost:3001` and the API server to listen on
`http://localhost:8000`, but ran into CORS issues beyond that.

I attempted to adjust the Allow-Access-Control-Origin, I attempted to set a proxy in package.json, and I even tried the following package: `https://www.npmjs.com/package/http-proxy-middleware` but nothing seemed to work for me.

I unfortunately haven't been exposed to using docker outside of some very introductory knowledge transfer a number of years ago. Given more time (time I plan to take on my own to complete this challenge) I know I can get it working.

## Accessing customers.txt
To access the `customers.txt` file in the container, here are a few options:

### Option 1
Fetch container ID
```
docker ps
```
Copy file to local directory
```
docker cp <containerId>:/app/storage/app/customers.txt ~/Downloads
```


### Option 2
Fetch container ID
```
docker ps
```
Execute shell environment to view file
```
docker exec -it <containerId> sh
```

## Improvements

Given that this was a code test and not something being deployed to a production environment, there are some additional improvements / refactoring that I would implement if this were a task required on a production site:

- Improve Containerization
    - given that this set up has been extremely simplified. I would have preferred to have configured docker to run all commands and install all dependencies so that `docker-compose up` was the only command required after pulling down the repo
- Detached Front End
    - along with the above improvements, setting up a properly functioning detached front end would be my preference. Including allowing origin access without setting the wildcard for All Access
- File Save Service
    - if the form was part of a larger product, and data was required to be stored, fetched, downloaded etc. from all over the application, I would set up a FileManagement service. And inject the service as a dependency in the ContactController
- Error Logging
    - Add more robust error logging, accessible behind some authentication
- API Authentication
    - configure authentication for requests made to the API to make it more secure (possibly depending on the sensitive nature or expectations of the data)
- Captcha
    - If this form were to exist on a corporate site, or any page that did not require authentication, I would add a captcha element to protect from digital submissions
