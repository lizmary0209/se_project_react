WTWR React Project
Project Overview

WTWR (What To Wear React) is a frontend web application built with React that reads weather data from the OpenWeatherMap API and recommends suitable clothing based on current weather conditions. This iteration focuses on implementing the core frontend functionality and styling of the application.

Important UI Update:
All modals now include a semi-transparent overlay (backdrop) when opened, according to the design. This ensures that the background is dimmed, helping users focus on the modal content and improving accessibility.

Features Implemented

-Display a set of clothing cards generated from a hard-coded array of clothing data.

-Fetch weather data from the OpenWeatherMap API when the user visits the site.

-Parse the API response and save the current temperature and location as React state.

-Display the current location in the header.

-Show the current temperature (Fahrenheit) in the weather card.

-Filter clothing cards based on temperature and weather conditions.

-Open and close the Add Garment modal.

-Open an image preview modal when a clothing card is clicked.

-Include the like icon on cards (UI only).

-Fully responsive design across different screen resolutions.

Technologies Used

-Frontend: React, HTML, CSS

-APIs: OpenWeatherMap API

-Tools: Vite, npm

-Version Control: Git, GitHub

Screenshots / Demo

Project Link: https://lizmary0209.github.io/se_project_react/

![Project React Screenshot](image.png)

Main Screen

-Weather Card & Clothing Suggestions

-Add Garment Modal

Future Improvements

-Add full CRUD functionality for garments (add, edit, delete).

-Implement user authentication and profile management.

-Enhance filtering options based on additional weather parameters.

Challenges Faced

-Mapping API weather conditions to local image assets.

-Handling dynamic filtering of clothing cards based on real-time weather.

Credits / Resources

-OpenWeatherMap API for weather data

-Figma design kit for UI/UX reference
