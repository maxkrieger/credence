# Credence Calibration

## Building

Add a `.env` file with your firebase JSON assigned to the key `REACT_APP_FIREBASE`. E.g. (replacing the `...`):

```
REACT_APP_FIREBASE='{"apiKey": "...", "authDomain": "...","projectId": "...","storageBucket": "...","messagingSenderId": "...","appId": "...","measurementId": "..."}'
```

run `yarn` to install deps

## Running

`yarn start`

## Deploying

- Change the `homepage` field of package.json accordingly
- On firebase, you might want to add your domain [here](https://console.firebase.google.com/project/credence-calibration/authentication/providers) but I didn't need to
- `yarn deploy` to the appropriate github pages
