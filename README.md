[![DeepWiki](https://img.shields.io/badge/DeepWiki-CyberMonk%2Fdownforacross.com-blue.svg?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAyCAYAAAAnWDnqAAAAAXNSR0IArs4c6QAAA05JREFUaEPtmUtyEzEQhtWTQyQLHNak2AB7ZnyXZMEjXMGeK/AIi+QuHrMnbChYY7MIh8g01fJoopFb0uhhEqqcbWTp06/uv1saEDv4O3n3dV60RfP947Mm9/SQc0ICFQgzfc4CYZoTPAswgSJCCUJUnAAoRHOAUOcATwbmVLWdGoH//PB8mnKqScAhsD0kYP3j/Yt5LPQe2KvcXmGvRHcDnpxfL2zOYJ1mFwrryWTz0advv1Ut4CJgf5uhDuDj5eUcAUoahrdY/56ebRWeraTjMt/00Sh3UDtjgHtQNHwcRGOC98BJEAEymycmYcWwOprTgcB6VZ5JK5TAJ+fXGLBm3FDAmn6oPPjR4rKCAoJCal2eAiQp2x0vxTPB3ALO2CRkwmDy5WohzBDwSEFKRwPbknEggCPB/imwrycgxX2NzoMCHhPkDwqYMr9tRcP5qNrMZHkVnOjRMWwLCcr8ohBVb1OMjxLwGCvjTikrsBOiA6fNyCrm8V1rP93iVPpwaE+gO0SsWmPiXB+jikdf6SizrT5qKasx5j8ABbHpFTx+vFXp9EnYQmLx02h1QTTrl6eDqxLnGjporxl3NL3agEvXdT0WmEost648sQOYAeJS9Q7bfUVoMGnjo4AZdUMQku50McDcMWcBPvr0SzbTAFDfvJqwLzgxwATnCgnp4wDl6Aa+Ax283gghmj+vj7feE2KBBRMW3FzOpLOADl0Isb5587h/U4gGvkt5v60Z1VLG8BhYjbzRwyQZemwAd6cCR5/XFWLYZRIMpX39AR0tjaGGiGzLVyhse5C9RKC6ai42ppWPKiBagOvaYk8lO7DajerabOZP46Lby5wKjw1HCRx7p9sVMOWGzb/vA1hwiWc6jm3MvQDTogQkiqIhJV0nBQBTU+3okKCFDy9WwferkHjtxib7t3xIUQtHxnIwtx4mpg26/HfwVNVDb4oI9RHmx5WGelRVlrtiw43zboCLaxv46AZeB3IlTkwouebTr1y2NjSpHz68WNFjHvupy3q8TFn3Hos2IAk4Ju5dCo8B3wP7VPr/FGaKiG+T+v+TQqIrOqMTL1VdWV1DdmcbO8KXBz6esmYWYKPwDL5b5FA1a0hwapHiom0r/cKaoqr+27/XcrS5UwSMbQAAAABJRU5ErkJggg==)](https://deepwiki.com/CyberMonk/downforacross.com)


## Josh for Across 

**Josh for Across** is an online website for sharing crosswords and playing collaboratively with friends in real time.

### Getting Started

1. Install `nvm` and `yarn`

2. Clone repo and cd to repo root.
   ```
   git clone https://github.com/CyberMonk/downforacross.com.git &&
   cd downforacross.com
   ```

3. Use node v18  
   ```
   nvm install &&  
   nvm use
   ```
   
4. Install Dependencies  
   ```
   yarn
   ```

5. Copy `.env.production.example` configuration file and fill in values as appropriate.
   ```
   cp .env.production.example .env.production
   ```
   
### Environment Variables

A number of environment variables are required before the app will run. You will need the following:

* A PostgreSQL instance running at least version 16.x
* A Firebase account and configured RTDB (https://firebase.google.com/)
   
   
### Running the Application

Once the necessary environment variables have been set, you can run the app as follows:

* **Development Mode**
   * Run the frontend in development mode:
      ```
      yarn devfrontend
      ```
   * Run the backend in development mode:
      ```
      yarn devbackend
      ```
   * Note, these will both need to be run in separate sessions—recommend using, e.g., `screen`
   
* **Production Mode**
   * Build the frontend for production (Create React App). You'll need to point your webroot at the `build` directory in project root.
      ```
      yarn build
      ```
   * Run the backend in development mode:
      ```
      yarn servebackendprod
      ```
   * Note, the backend will need to be run in separate sessions—recommend using, e.g., `screen` or `pm2`
   * You all also need properly configured `REACT_APP_API_DOMAIN` to run things in production