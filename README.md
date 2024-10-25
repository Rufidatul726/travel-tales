# travel-tales
Travel Tales travel planning platform designed to simplify your journey. Enter your destination, and let TripWise handle the logistics, from generating a customized itinerary to providing real-time weather updates and budget estimates.

## Installation

Installation and running of this project to the local machine may vary the dependencies. You may follow the Installation process :

1. Copy the URL for the repository. To clone the repository using HTTPS, under "HTTPS", click. To clone the repository using an SSH key, including a certificate issued by your organization's SSH certificate authority, click SSH, then click.To clone a repository using GitHub CLI, click GitHub CLI, then click .


2. Open Git Bash. 
3. Change the current working directory to the location where you want the cloned directory.
4. Clone the repository to your local machine using the following command:

```bash
  git clone https://github.com/your-username/your-project.git

```
5. Press Enter to create your local clone.

6. Go to the project directory

```bash
  cd project-Name

```
7. Install dependencies

```bash
  npm install

```



## Run Locally

 Start the Server
```bash
  npm run start:dev

```
This will start the development server and it will be accessible at http://localhost:port.
Port may vary from machine to machine.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PRIVATE_KEY`



## API Reference 

### Task 1


#### Create A New Trip

```http
  POST /trip/
```

#### Generate Trip Plan

```http
  POST /generate-plan/
```


### Task 2


#### Integrating A Map

```http
  GET /nominatim.openstreetmap.org/search/
```

#### Display Key Itinerary Information

```http
  POST /nearby-hotels/
```

### Task 3


#### Integrating Weather Information

```http
  GET /nominatim.openstreetmap.org/search/
```


### Task 4


#### Generate blog

```http
  POST /generate-blog/
```


### Task 5


#### Upload Images into Albums

```http
  POST /{trip_id}/{album_id}/image/
```

#### Analyze Image for Caption Generation

```http
  POST /analyze-image/
```

#### Search for Similar Images

```http
  POST /search-similar-images/
```