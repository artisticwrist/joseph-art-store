# Joseph George art store
Buildless HTML, CSS and vanilla JavaScript. Serve `dist/` with any static host. No Node dependencies or frontend framework.

## Replace the samples
All six pieces, images, prices and descriptions are illustrative placeholders, not Joseph's actual inventory. Sample images from Unsplash. Replace `dist/assets/art-*.jpg` with your own artwork and edit `dist/ARTWORK_IMAGES` in `config.js` (the actual map is `window.ARTWORK_IMAGES`). Categories shown in demo metadata are only UI examples and do not establish the source artwork's real medium.

## Connect Laravel
Set `apiUrl` in `dist/config.js` to your HTTPS Laravel `/api/artworks` endpoint. Configure Laravel CORS to permit your frontend origin. Images remain frontend assets mapped by artwork ID in `window.ARTWORK_IMAGES`; they are not supplied by the API.

The endpoint returns an array, or Laravel's `{ "data": [...] }` resource envelope. Each item follows the example in `dist/artworks.json`:

- `id`: stable string or number matching the frontend image map
- `title`, `description`, `category` (`Charcoal`, `Painting`, `Digital`)
- `medium`, `dimensions`, `year`
- `price`: numeric amount in NGN, not kobo
- `status`: `available` or `sold`

The gallery fetches metadata, filters categories, sorts works and opens full artwork details in an accessible native dialog. API failures show a retry action instead of silently displaying sample inventory. The preview data is used only when apiUrl is empty.

## Payment later
The purchase button currently displays an explicit checkout-unavailable message. No orders, reservations or payment requests are made. Later, have Laravel create a checkout session using the artwork ID and server-side authoritative price; redirect to the returned payment URL. Never trust the frontend price for charging. Laravel itself is not included or hosted in this static frontend.

## Verification
JavaScript syntax, sample API structure and local image references checked. Browser QA was unavailable in this environment.
