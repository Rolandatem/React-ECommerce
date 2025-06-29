# React e-Commerce Website
This demo site showcases a complete e-commerce experience built with React on the frontend, connected to a custom PortfolioWebAPI (powered by .NET Core and PostgreSQL) on the backend.

Browse products, add items to your cart, and go through the entire checkout process. The site also features dedicated pages for contact, about, and FAQs for a well-rounded user experience.

## Demo Features
This project highlights my work with a modern React stack, including:
- React (using functional components) for building a responsive Single Page Application (SPA).
- TypeScript for type safety and clean code.
- React-Bootstrap and Bootstrap 5 for polished UI components.
- React Router for seamless client-side navigation.
- JS Cookie for cookie management.
- PrimeIcons for sharp iconography.
- Integration with a RESTful WebAPI for live data.
- Vite for fast development and builds.

## Requirements
This demo depends on my PortfolioWebAPI project and its dependencies, which you can find at [PortfolioWebAPI](https://github.com/Rolandatem/PortfolioWebAPI). Refer to that repo for details if you'd like to set up a local (non-Docker) test environment.

## Docker Container
For easiest setup, I recommend using Docker containers. Demo images are available on my [Docker Hub](https://hub.docker.com/r/estebanfmartinez/portfolio-react-ecommerce/tags). All images are built for linux.
- React e-Commerce Image [estebanfmartinez/portfolio-react-ecommerce](https://hub.docker.com/r/estebanfmartinez/portfolio-react-ecommerce)
- Portfolio Web API [estebanfmartinez/portfolio-webapi](https://hub.docker.com/r/estebanfmartinez/portfolio-webapi)
- Portfolio PostgreSQL Data Repository [estebanfmartinez/portfolio-postgre](https://hub.docker.com/r/estebanfmartinez/portfolio-postgre)

### How to Test
You don't need to clone the full repo to get started. If Docker is installed, simply download the `docker-compose.yaml` file to your prefered directory.

Open a terminal, navigate to the folder with the `docker-compose.yaml` file, and run: `docker compose up -d`.

This command pulls the images, spins up the contains, and gets everything running in the background.

Once the containers are up, visit `http://localhost:3000` in your browser to check the demo.

When you're done, you can clean up by running: `docker compose down -v`. This will stop and remove the contains and delete the database data volume.