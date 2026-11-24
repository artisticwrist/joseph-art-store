# Joseph George Art Store

A simple art gallery and storefront for Joseph George's charcoal drawings, paintings, and digital artwork. Visitors can browse the collection, filter by medium, sort by price or title, and open an artwork to see its description and details.

Built with HTML, CSS, and vanilla JavaScript. There is no frontend framework, package installation, or build step.

## Features

- Responsive gallery with locally stored artwork images.
- Category filters: All works, Charcoal, Painting, and Digital art.
- Sorting by featured order, price, and title.
- Artwork details with medium, dimensions, year, price, and availability.
- Sold labels and disabled purchase buttons for sold artwork.
- About-the-artist dialog.
- Artwork data from a local JSON file or an optional Laravel API.
- Loading feedback and a retry button when the collection cannot be loaded.

**Checkout status:** Payment processing is not connected in this version. The purchase button displays a checkout-unavailable message. This frontend does not create orders or accept payments, and a Laravel backend is not included.

## Requirements

- Git, to clone the repository.
- A modern browser with JavaScript enabled and support for native HTML dialogs.
- A local HTTP server. The examples below use PHP, which is included with XAMPP.

You do not need Node.js, npm, Composer, or a database to run the bundled collection.

## Clone and run locally

### 1. Clone the repository

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY` with the repository details from GitHub:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git joseph-art-store
cd joseph-art-store
```

### 2. Start a local server

From the folder containing `index.html`, run:

```bash
php -S localhost:8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser. Keep the terminal open while using the site; press `Ctrl+C` to stop the server.

If PHP is not available on your Windows PATH, run this in PowerShell using the default XAMPP installation path:

```powershell
& "C:\xampp\php\php.exe" -S localhost:8000
```

Alternatively, clone the repository into `C:\xampp\htdocs\joseph-art-store`, start Apache from the XAMPP Control Panel, and visit [http://localhost/joseph-art-store/](http://localhost/joseph-art-store/).

Use an HTTP server instead of opening `index.html` directly: the gallery loads artwork data with `fetch()`, which browsers can block for `file://` pages.

## Project files

| Path | Purpose |
| --- | --- |
| `index.html` | Gallery page, artwork dialog, and artist biography. |
| `style.css` | Layout, typography, responsive styles, and Google Fonts imports. |
| `app.js` | Data loading, gallery rendering, filtering, sorting, and dialogs. |
| `config.js` | API URL, currency, and artwork-to-image mapping. |
| `artworks.json` | Bundled artwork metadata used when no API URL is configured. |
| `assets/` | Local artwork images. |
| `README.md` | Setup and customization instructions. |

These files are served from the project root. There is no `dist/` directory or build output.

## Configuration

The default configuration in `config.js` is:

```javascript
window.ART_STORE_CONFIG = {
  apiUrl: '',
  currency: 'NGN'
};
```

| Setting | Behavior |
| --- | --- |
| `apiUrl: ''` | Loads `artworks.json` and displays the preview-collection label. |
| `apiUrl: 'https://your-api.example/api/artworks'` | Loads artwork metadata from the configured endpoint and hides the preview label. |
| `currency: 'NGN'` | Formats prices in Nigerian naira. Changing this setting changes formatting; it does not convert the stored amounts. |

Keep the existing `window.ARTWORK_IMAGES` mapping in this file when editing the configuration.

## Add or update artwork

With `apiUrl` empty, artwork records are maintained in `artworks.json`.

For example, to add artwork with ID `8`:

1. Save its image as `assets/art-8.jpg`.
2. Add a record to the existing JSON array:

   ```json
   {
     "id": 8,
     "title": "New artwork",
     "category": "Painting",
     "medium": "Acrylic on canvas",
     "dimensions": "12 × 16 inch",
     "year": 2026,
     "price": 35000,
     "status": "available",
     "description": "A description of the artwork for visitors to the store."
   }
   ```

3. Add this line to `config.js`, after the existing image map:

   ```javascript
   window.ARTWORK_IMAGES[8] = 'assets/art-8.jpg';
   ```

4. Save the files and refresh the page.

The example values above are illustrative. Use the actual artwork's details. Keep commas between records in `artworks.json`, with no trailing comma after the final record.

**Adding an image file alone does not add a gallery item.** The artwork needs a metadata record and a matching image-map entry. IDs must be unique, and each image-map key must match its artwork ID.

To mark a work as sold, change its record to:

```json
"status": "sold"
```

The gallery will show a sold label and disable its purchase button.

## Connect a Laravel API

Set `apiUrl` in `config.js` to your artwork endpoint:

```javascript
window.ART_STORE_CONFIG = {
  apiUrl: 'https://your-api.example/api/artworks',
  currency: 'NGN'
};
```

The frontend makes a `GET` request with `Accept: application/json`. The endpoint can return a JSON array of artwork records directly, or a Laravel-style envelope:

```json
{
  "data": [
    {
      "id": 8,
      "title": "New artwork",
      "category": "Painting",
      "medium": "Acrylic on canvas",
      "dimensions": "12 × 16 inch",
      "year": 2026,
      "price": 35000,
      "status": "available",
      "description": "A description of the artwork for visitors to the store."
    }
  ]
}
```

Artwork records use these fields:

| Field | Expected value |
| --- | --- |
| `id` | Unique string or number matching a key in `window.ARTWORK_IMAGES`. |
| `title` | Artwork title as a string. |
| `category` | Exactly `Charcoal`, `Painting`, or `Digital`. |
| `medium` | Medium as a string. |
| `dimensions` | Dimensions as a string. |
| `year` | Year shown in the details dialog; omitted values display a dash. |
| `price` | Non-negative JSON number in naira, for example `35000`. |
| `status` | `available` or `sold`. |
| `description` | Description shown in the artwork dialog. |

Return prices as numbers, not numeric strings, formatted currency, or kobo amounts. Make sure your Laravel response serializes `price` as a JSON number.

Images remain in the frontend's `assets/` folder and are selected through `window.ARTWORK_IMAGES`. An image URL returned by the API is not used by the current frontend.

If the API runs on a different origin, configure its CORS policy to allow the frontend's origin. Return the complete collection: the frontend does not follow pagination links.

When an API URL is configured, it takes precedence over `artworks.json`. Failed API requests show an error and retry button; they do not fall back to the bundled collection.

## Customize the store

- Update the artist name, biography, social handle, and page metadata in `index.html`.
- Adjust colors, fonts, spacing, and layout in `style.css`.
- Update artwork records in `artworks.json`, or in your backend when API mode is enabled.
- Update the image mapping and currency in `config.js`.
- Connect the purchase-button handler in `app.js` when your backend checkout is ready.

For live checkout, the backend should validate artwork availability, calculate the authoritative price, and create the payment session.

## Deployment

Upload the project files to a static web host or a web server's public directory, keeping `index.html` at the site root and preserving the `assets/` folder.

No build command is required. Publish the folder containing `index.html`; there is no `dist/` directory to generate.

If you use a separate API, configure its production URL and allow the deployed frontend origin through CORS. An HTTPS frontend needs an HTTPS API endpoint.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| The gallery does not load after opening the HTML file. | Start a local HTTP server and use its `http://` URL. |
| "The collection could not be loaded" appears. | Check the data request in the browser's Network tab. Confirm valid JSON, numeric prices, supported category names, and API CORS settings. |
| A new image does not create a new gallery item. | Add its metadata record and image-map entry. |
| An artwork shows the wrong image. | Match the record's ID to the correct `window.ARTWORK_IMAGES` key. Unmapped IDs fall back to `assets/art-1.jpg`. |
| Local JSON edits do not appear. | Check whether `apiUrl` is set. API mode loads records from the backend. |
| A purchase does not open checkout. | Checkout is a placeholder in this version; payment integration must be implemented separately. |

## Author

Joseph George — visual artist and software engineer based in Uyo, Nigeria.

