# base64

# Face Enrollment Project

This project is a Node.js application that tests the FaceEnrollment API by sending 50 images to the API in base64 format. It saves the base64 images to an Excel file, dividing each base64 image into multiple cells, each with a maximum length of 30,000 characters.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js version 12 or higher installed on your machine.
- A working internet connection to make API requests.

### Installation

1. Clone this repository or download the source code.
2. Navigate to the project directory using the terminal.

```bash
cd face_enrollment_project

    Install the required dependencies using npm.

bash

npm install
```

### Configuration

Before running the project, you need to configure the API URL and authentication headers. Open the script.mjs file and update the following variables with your API details:

javascript

const apiUrl = 'https://fe-uat-apimgmt-service.azure-api.net/v1/frictionless';
const tenantId = 'YOUR_TENANT_ID';
const authHeader = 'YOUR_AUTHORIZATION_HEADER';

Replace YOUR_TENANT_ID with your actual tenant ID and YOUR_AUTHORIZATION_HEADER with the appropriate authorization header required by the API.
Running the Project

To execute the script and start testing the API, run the following command:

bash

npm start

The script will loop through 50 images (replace 'path/to/image' with the actual image path) and perform the following steps:

    Convert each image to base64 format.
    Call the FaceEnrollment API with the base64 image.
    If the API returns a status code of 200, call the deletEnrollment API and proceed to the next image. Otherwise, stop the loop and start a new one.
    Save the base64 image to the Excel file. Each base64 image will be divided into multiple cells with a maximum length of 30,000 characters in each cell.

The results will be saved in an Excel file named output.xlsx in the project directory.
License

This project is licensed under the MIT License.
Acknowledgments

    The project uses Node.js for server-side scripting.
    axios library for making HTTP requests.
    ExcelJS library for working with Excel files.

Troubleshooting

In case of any issues or questions, please feel free to raise an issue or contact the project maintainers.

Congratulations! You've created a detailed documentation for your Face Enrollment Project using Markdown. You can now include this README.md file in your project repository to help others understand the project and get started with it.
