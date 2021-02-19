# Rent-A-Car-Online-System
FMI course project - Advanced JS course project - with Express js and React

Description

Over the years not only cars technology has expanded but also the ways you can book the desired car for your perfect travel. Our Online Rent A Car System can provide users the desired comfort, speed, charge and reliability of driving to your destination. It allows users to register, book the wanted car by browsing through a wide variety of models available at different destinations and choose the perfect one which is tested to be safe for driving.The application uses nodemon.


The system is developed using ExpressJS and React. It uses Mongoose MongoDB object modeling for Node.js
The system uses also socketIO communication for renting a car and for emmiting statistics updates for rented cars. 

Main functionalities in the system are:
- Renting a car ( Noramal user, Admin ) 
- Releasing a car ( Normal user, Admin ) 
- Viewing information for cars and details for specific car ( Normal user, extended view for Admin )
- Statistics view for current count of rented cars which is delivered real-time with sockets ( Admin )
- Login with try for JWT authentication ( Normal user and Admin )
- Logout ( both )
- Registration ( Normal user )
- Viewing list of system users and their count of rented cars in the moment ( Admin )
- View details for user ( both )
- Add car ( Admin )
- Edit car ( Admin )
- Delete car ( Admin )
- Edit user ( both )
- Delete user ( Admin )
- Filter cars by brand, model and location ( both )

Some of the functionalities are only for admin of the system and the other ones are for normal user.
Role of user is determined by reading it from the localStorage ( client side /maye not so secure/) and retrieving the role with REST call for retrieving user information form MongoDB.

Unregistered user may only see the cars available but nothing more.

Main pages in the application are:

Login

Registration

Index page

View-cars page

View-car/:id

Statistics

View-users

View-user/:id

My-cars

Database tables:

Cars

Users


