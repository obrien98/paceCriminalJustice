# Pace Criminal Justice Society Static Site

This project no longer uses Django. It is now a plain static website built with HTML, CSS, and JavaScript.

## Main Files

- `index.html`: homepage
- `event.html`: simple event detail page
- `styles/`: site styling
- `images/`: logo, gallery images, and officer placeholder image
- `scripts/data.js`: officer and event content
- `scripts/site.js`: renders officers and events onto the page

## How To Update The Site

Most future updates should happen in `scripts/data.js`.

### Update officers

Each officer looks like this:

```js
{
    name: "Jane Doe",
    role: "President",
    email: "jd12345p@pace.edu",
    bio: "Short officer bio.",
    image: "images/officer-placeholder.jpeg"
}
```

### Update events

Each event looks like this:

```js
{
    id: "career-panel-2027",
    name: "Criminal Justice Career Panel",
    date: "2027-10-12",
    time: "6:00 PM",
    location: "Choate House",
    description: "Panel with alumni and guest speakers.",
    image: "images/img1.png"
}
```

## Viewing The Site

Open `index.html` in a browser.

If a browser blocks module-like local behavior or if you want cleaner testing, run a simple local server such as:

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`.
