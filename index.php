<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Explore charcoal drawings, paintings and digital art at Joseph George's independent art studio."><title>Joseph George — Art Studio</title><link rel="stylesheet" href="style.css"><script src="config.js" defer></script><script src="app.js" defer></script></head>
<body><header><a class="brand" href="./" aria-label="Joseph George home">Joseph George<span>ARTIST & ILLUSTRATOR</span></a><nav><a href="#collection">The collection <span></span></a><button id="about-open">About the artist <span></span></button></nav><span class="studio"><i></i> @theblackwriste</span></header>
<main>
    <section class="intro" style="display: none;">
        <div class="eyebrow">ORIGINAL WORKS. PERSONAL CONNECTIONS.</div>
        <h1>Art that feels<br>like <em>something.</em><span class="asterisk" aria-hidden="true">✳</span></h1>
        <div class="intro-bottom">
            <p>A collection of charcoal drawings, paintings<br class="desktop"> and digital pieces. Find the one that speaks to you.</p>
            <a href="#collection" class="explore">Find your piece <span>↓</span></a></div>
        </section>
<section id="collection" aria-label="Art collection">
    <div class="toolbar" style="border-top: none;">
        <div class="filters" aria-label="Filter by medium">
            <button class="active" data-filter="All" aria-pressed="true">All works <sup id="count">6</sup></button>
            <button data-filter="Charcoal" aria-pressed="false">Charcoal</button>
            <button data-filter="Painting" aria-pressed="false">Painting</button>
            <button data-filter="Digital" aria-pressed="false">Digital art</button>
        </div><label class="sort">Sort by <select id="sort" aria-label="Sort artworks">
            <option value="featured">Featured</option><option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option><option value="name">Title: A–Z</option></select></label></div><div class="collection-caption"><span id="result-count" role="status">Loading collection…</span><span id="demo-label">PREVIEW COLLECTION · SAMPLE ART & PRICES</span></div><div id="gallery" class="gallery" aria-live="polite"></div><div id="error" hidden><p>The collection could not be loaded.</p><button id="retry">Try again</button></div></section>
<section class="closing">
    <!-- <span class="eyebrow">MADE TO BE LIVED WITH</span>
    <p>A little more feeling.<br>A little more <em>you.</em></p> -->
    <a href="#collection">Explore the collection ↑</a>
</section>
</main>
<footer><a class="brand" href="./">Joseph George<span>ARTIST & ILLUSTRATOR</span></a><p>Charcoal. Paint. Pixels. A personal point of view.</p><span>© <span id="year"></span> Joseph George</span></footer>
<dialog id="art-dialog"><button class="close" aria-label="Close artwork details">×</button><div class="detail-layout"><div class="detail-image"><img id="detail-img" alt=""></div><div class="detail-copy"><div id="detail-medium" class="eyebrow"></div><h2 id="detail-title"></h2><p id="detail-description"></p><dl id="detail-facts"></dl><div class="price" id="detail-price"></div><button id="purchase" class="purchase">Purchase artwork <span></span></button><p class="fine" id="purchase-note" role="status">Payment integration is coming soon. No payment will be taken.</p></div></div></dialog>
<dialog id="about-dialog"><button class="close" aria-label="Close about the artist">×</button><div class="about-copy"><span class="eyebrow">THE ARTIST</span><h2>Joseph George</h2><p>I’m Joseph George, a visual artist and software engineer based in Uyo, Nigeria, and a Computer Engineering graduate of Madonna University. Through charcoal, painting and digital art, I turn ideas and everyday moments into pieces with character. <br><br> Welcome to my collection, find something that feels like you.</p>

    <button class="purchase" id="back-collection">Explore the collection </button>
</div></dialog>
</body></html>
