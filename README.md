# Take-home Exercise

## Introduction

As part of the hiring process, you are provided with a coding exercise to complete and submit. This exercise is designed to assess your ability to work with React and external APIs, as well as your problem-solving and UI/UX implementation skills.

This repository includes a basic React web app template as your starting point. You are free to install any libraries or tools you find useful (e.g., state management solutions, UI frameworks, CSS libraries).

## Goals

Build a **single-page application** called **Getflix**, which allows users to search for movies and view detailed information about each title. The application should:

1. Provide a search input where users can enter movie titles.
2. Display matching results, including the movie title, poster, and release year.
3. Allow users to click on a movie to view more details, such as the plot, cast, and other relevant information.
4. Ensure the UI is responsive across different screen sizes.

## Stretch Goals (Bonus Features)

- Implement **infinite scrolling** to load additional results dynamically. The API currently returns titles in lots of 10 - if you can, use the page parameter to request more as you scroll.
- Add **debounced search** to optimize API requests.
- Include **animations/transitions** for improved UI/UX.
- Enable the user to create and manage a watchlist of movies saved in local storage or a database of your choice. It should persist across browser refreshes.
- Utilize additional values from the API response, such as ratings, awards, and runtime, to create more engaging and informative movie details.
- Implement a filter using the **type** query parameter to allow users to return only movies, series, or episodes.
- Implement a theme switcher to allow users to toggle between light and dark mode.
- Ensure the app meets accessibility standards, including keyboard navigation and screen reader support.
- Write **unit tests** using Jest, React Testing Library, Vitest or any library of your choice.
- Deploy the application to **Vercel, Netlify, or GitHub Pages**.

## API Details

Use the [OMDb API](https://www.omdbapi.com/) to fetch movie data. You can register for your own API key or use this provided key: **320f6ab2**

Example API requests:

- Search movies: `https://www.omdbapi.com/?s=Inception&apikey=320f6ab2`
- Get movie details: `https://www.omdbapi.com/?i=tt1375666&apikey=320f6ab2`

## Requirements

- Use **React 19** with **TypeScript**.
- Implement **client-side routing** (e.g., React Router) for navigating between search results and movie details.
- Write clean, maintainable code with appropriate documentation.
- Ensure that commit messages in the Git repository are clear and descriptive, providing context for each change made.
- Provide a clear **README** with setup and usage instructions.

## Submission Guidelines

When you’re done, please submit your project via one of the following methods:

- **GitHub Repository:** Share a public repository link, with clear commit messages.
- **Zip File:** Should be a Git repository, with clear commit messages.

Make sure to include instructions on how to run the application and any relevant dependencies.

## License

**Copyright 2025 Tyro Payments Limited**

Licensed under the Apache License, Version 2.0. See the [LICENSE](http://www.apache.org/licenses/LICENSE-2.0) for details.

---

We look forward to seeing your submission! 🚀
