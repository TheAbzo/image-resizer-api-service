# Image Resizer

It is an image resizer simple API.

## Installation

```bash
npm install
```
- Clone the project
- Enter project folder
- npm install


## Usage

### Running the dev server on port 3000 (localhost:3000/api/images)

- npm run start 
- make sure that image file name is one of these: fjord, encenadaport, icelandwaterfall, palmtunnel, santamonica
- add with and height with valid input (numbers > 0)
- example:
   - http://localhost:3000/api/images?filename=santamonica&width=300&height=400 

### Running the build server (localhost:3000/api/images)
- cd build
- node index.js
- server starts in:  localhost:3000/api/images
- using same parameters as described above to use the endpoint
- example:
   - http://localhost:3000/api/images?filename=santamonica&width=300&height=400

### other scripts
- npm run build (to compile ts code)
- npm run test (to run jasmine test suits)
- npm run lint
- npm run prettier(to run prettier on js files)
    
