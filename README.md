




# CARADISIAC

## Installation

Clone or download the project.

Then install dependencies with :

```
$ npm install
```


## Usage

First download and install Elasticsearch.
And run the elasticsearch.bat in the elasticsearch folder.

You're now ready to use the API.


The API has 2 endpoints :
  - `/populate` (POST)
  - `/suv ` (GET)

Populate endpoint allow to create index and import record into elasticsearch.

Suv endpoint retrieve the car model with the highest volume. The 10 first models here.

To begin with the API :

Run :
```
> node ./Server.js
```

Download postman and send the following post request :

` http://localhost:9292/populate`

Once requested you should see a response such like :

`Succefully create index and populate`

Congratulations ! You've succefully indexed and imported data into elasticsearch :thumbsup:

Now let's use the react app to retrieve suv with high volume :

Type :
```
> cd caradisiac-react-app
> npm start
```

It should start the react server.
Go to http://localhost:3000/

And click on the `Get suv` button.

You should now see the 10 SUV with the highest volume !
