# Smart Coffeemaker made in Angular

System created by Christopher Dührkop for his Bachelor Thesis.

System adapted by Niklas Mollerus for his Bachelor Thesis.

This project can be also be found on GitHub under https://github.com/Orovo/angular-coffeemaker-kdt-playwright or https://github.com/ChrisDue/angular-coffeemaker, for the original version.

All important info to get this app started is listed below.

<br/>

## 1. Smart Coffeemaker Web App 

### 1.1 Installation

It is required to have a current version of Node.js installed.
You can find Node.js installer here: https://nodejs.org/en/download

To install the required version of the Angular framework use the following commands:
> npm install

> npm link @angular/cli

### 1.2 Launch and view

To start the web app and open it in browser: 
> ng serve --open

Opens your Default Browser on http://localhost:4200/, where the Coffeemaker is running.  
Here, you won't see any recipes or ingredients listed yet. For these to be loaded, start the DB as explained below. 

<br/>

## 2. API and DB

Created following the instructions in the "json-server" package's readme: https://www.npmjs.com/package/json-server / https://github.com/typicode/json-server.

### 2.1 Installation

It's recommended to start another terminal, so you have one for the App, and a separate one for the DB.  

If json-server was not already installed, use the following CLI call: 
> npm install -g json-server

### 2.2 Launch and view

To start the DB and open it in browser with the following command: 
> json-server --watch db.json

To hold a valid data set, it has to be the db.json file that is included in this project.   

Visit http://localhost:3000/ in your browser to see an overview of the available endpoints. These are http://localhost:3000/ingredients for the ingredients and http://localhost:3000/recipes for the recipes.

Now the project is running and it's connected to a db filled with valid data. To run the automated tests, follow the instructions below. 

<br/>


## 4. Interesting Files and Folders

- /cypress
  - /downloads: Used when testing file download links etc.
  - /fixtures: Unsuccessful attempts at using fixtures for resetting the db between tests
  - /integration: All the automated tests, structured by pages
  - /plugins: Importing and configuring plugins
  - /support: Global variables and methods usable by all tests
  - /videos: Recordings of tests, only made when activated
- /src: The application code, structured by components, including http, ts, css and (auto-generated and unused) unit-tests
  - /assets: Usable assets like downloadable files, e.g. the user manual
- cypress.json: Mainly used to set the most important URLs as global variables and to configure the threshold-value for cypress-plugin-snapshots 
- db.json: Holds the actual database



<br/>



# Default boilerplate text block by Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
