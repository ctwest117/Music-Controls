## This readme is ai generated. music is random free music that chatgpt gave me.

# Linked List Music Player

A browser-based music player with a playlist backed by a doubly linked list. The playlist supports playback controls, repeat, selecting a track, reordering tracks, and removing tracks.

## Run the player

Open `index.html` in a browser, or serve the `starter` folder with a local static web server (for example, VS Code Live Server). No package installation or build step is required.

Keep the `music` folder alongside `index.html`; the player loads tracks from that folder using relative URLs.

## Controls

- **Previous / Next** — move through the playlist. Previous restarts the current song if it has played for at least two seconds.
- **Play / Pause** — toggle playback. Press Space to toggle playback when a button does not have focus.
- **Repeat** — toggle repeat for the current track.
- **Playlist** — select a track to play it. Use the up/down arrows beside tracks to reorder them, or the X button to remove a track.

## Add or change tracks

Edit the `SONGS` array near the top of `app.js`. Add one object per track with a display title and a path to its audio file:

```js
{
  name: "Example Track",
  src: "./music/example-track.mp3",
}
```

The `src` path and filename must match the audio file in the `music` folder.

## Tests

The linked-list tests use Node.js's built-in test runner. From this folder, run:

```sh
node --test
```

## Project files

- `index.html` — player page and DOM elements
- `style.css` — layout and visual styles
- `app.js` — track list, player controls, and playlist rendering
- `linked-list.js` — doubly linked list implementation
- `linked-list.test.js` — linked-list unit tests
- `music/` — local audio files used by the player
