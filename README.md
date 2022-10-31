<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Leetcode][leetcode-shield]][leetcode-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Echo Story Boardr</h3>

  <p align="center">
    A website for posting and downloading stories.
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>

### Built With

* [![react][react]][react-url]
* [![spring-boot][spring-boot]][spring-boot-url]
* [![h2-database][h2-database]][h2-database-url]
* [![maven][maven]][maven-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* JDK 17 (https://www.oracle.com/java/technologies/downloads/#java17)
* Maven
  ```sh
  brew install maven
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/joenghy/echo-story-board.git
   ```
2. Change directory
   ```sh
   cd echo-story-board/server
   ```
4. Edit src/main/resources/application.properties. Change file.upload-dir to a valid folder on your computer.
   ```sh
   # Replace this line
   file.upload-dir=/Users/joe_ng/Uploads
   ```
5. Run Spring Boot App
   ```sh
   mvn spring-boot:run
   ```
6. Change directory
   ```sh
   cd ../client
   ```
7. Install dependencies
   ```sh
   npm install
   ```
8. Run the frontend
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

You may use tools like Postman or curl to test the REST APIs. Please note that the server is started on port 8080.
The following APIs are supported:

- POST /api/story
  Example: 
  ```
    curl --location --request POST 'localhost:8080/api/story' --form 'file=@"/Users/joe_ng/Downloads/Lemon.png"'
  ```
- GET /api/story/{storyName}
  Example:
  ```
    curl --location --request GET 'localhost:8080/api/story/Lemon.png'
  ```
- GET /api/story/download/{storyName}
  Example:
  ```
    curl --location --request GET 'localhost:8080/api/story/download/Lemon.png'
  ```
  - GET /api/story/status
  Example:
  ```
    curl --location --request GET 'localhost:8080/api/story/status'
  ```
  - GET /api/story/stat/{storyName}
  Example:
  ```
    curl --location --request GET 'localhost:8080/api/story/stat/Lemon.png' --header 'type: 1'
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Implement frontend
- [x] Implement backend
- [ ] Implement basic test cases
- [ ] Add API documentation

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/joe-ng-6098071b0
[leetcode-shield]: https://img.shields.io/badge/-Leetcode-black.svg?style=for-the-badge&logo=leetcode&colorB=555
[leetcode-url]: https://leetcode.com/joe_ng_ca/
[spring-boot]: https://img.shields.io/badge/spring-boot?style=for-the-badge&logo=spring-boot&logoColor=white
[spring-boot-url]: https://spring.io/projects/spring-boot
[maven]: https://img.shields.io/badge/maven-green?style=for-the-badge&logo=apache-maven&colorB=555
[maven-url]: https://maven.apache.org
[h2-database]: https://img.shields.io/badge/h2-database?style=for-the-badge&colorB=555
[h2-database-url]: https://www.h2database.com/html/main.html
[react]: https://img.shields.io/badge/react-js?style=for-the-badge&colorB=555
[react-url]: https://reactjs.org
