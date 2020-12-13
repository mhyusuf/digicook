# digicook
digicook is a robust and elegant application for uploading and sharing recipes with friends, family and the world. The app allows you to post and edit recipes using an intuitive interface and organise your recipes into collections. You can choose to keep your recipe collections private or share them with the digicook community on the discover page. digicook stores your recipes in the cloud, so you can easily access them on any device through our responsive web app.

Digicook is built with React, Redux, Express(Node.js) and MongoDB.

# Screenshots
![Screenshots](https://github.com/mhyusuf/digicook/raw/master/images/readme-1.png)

# Getting started
This project requires [node-js/npm](https://www.google.com) and [docker](https://www.docker.com/get-started).

1. Clone the repo
```shell
git clone https://github.com/mhyusuf/digicook
cd digicook
```

2. Install dependencies
```shell
npm install
```

2. Install dependencies
```shell
npm install
```

3. Start the MongoDB server
```shell
docker-compose up
```

4. Start the development server
```shell
npm run dev
```

Your API server should be running at http://localhost:5000, your client server will be running at http://localhost:3000 and your Mongo database will be running at: 127.0.0.1:27017.

Run `docker-compose stop` to stop the services, or `CTRL + C` and then `docker-compose down` to kill the services.

# Contributors
Mohamed Yusuf - [GitHub](https://github.com/mhyusuf)

Brett Glauser - [GitHub](https://github.com/bmcglauser)
