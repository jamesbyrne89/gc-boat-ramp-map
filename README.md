# Javascript Challenge

## Running the app

The data is served via a serverless function. You can use the Netlify CLI to ensure this is running, as well as the React app:

`npm install netlify-cli -g`
and then
`netlify dev`

## Notes

I didn't get to spend as long on this challenge as I might have liked, so there are several things I would address with more time:

- Add functionality to filter the charts to reflect only the ramps that are visible in the viewport.
- Improve the look of the map so that ramps are more visible at wide zoom levels. Perhaps they would show as large pins until the user zooms closer.
- Move the majority of the component styles within App.css to CSS-in-JS components.
- Improve the look of the UI and perhaps make it responsive.
- Write tests for the filter functionality.
- Refactor the root reducer into multiple, smaller reducers.
- Improve types across the app.
