const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const yantraFiles = [
    'kali.html',
    'tara.html',
    'tripura-sundari.html',
    'bhuvaneshvari-yantri.html',
    'sri-yantra.html',
    'bhairavi-yantra.html',
    'chhinamasta-yantra.html',
    'bagalamukhi-yantra.html',
    'Kamalatmika-yantra.html',
    'matangi-yanta.html'
];

async function generateGIF(htmlFile) {
    console.log(`\n🎨 Processing: ${htmlFile}`);

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: {
            width: 1200,
            height: 1200
        }
    });

    const page = await browser.newPage();

    // Set download behavior
    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: path.resolve(__dirname)
    });

    // Load the HTML file
    const filePath = 'file://' + path.resolve(__dirname, htmlFile);
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    console.log(`   ✓ Loaded ${htmlFile}`);

    // Wait a moment for animation to initialize
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Click the Record GIF button
    console.log('   🎬 Starting GIF recording...');
    await page.click('#recordButton');

    // Wait for button to be disabled (recording starts)
    await page.waitForFunction(
        () => document.getElementById('recordButton').disabled,
        { timeout: 10000 }
    );

    console.log('   ⏳ Recording and rendering (this takes ~60-90 seconds)...');

    // Wait for button to be re-enabled (GIF complete)
    await page.waitForFunction(
        () => !document.getElementById('recordButton').disabled,
        { timeout: 180000 }
    );

    console.log(`   ✅ GIF generated for ${htmlFile}`);

    // Wait a bit for download to complete
    await new Promise(resolve => setTimeout(resolve, 2000));

    await browser.close();
}

async function generateAllGIFs() {
    console.log('🚀 Starting GIF generation for all yantras...\n');
    console.log(`Total files to process: ${yantraFiles.length}\n`);

    for (let i = 0; i < yantraFiles.length; i++) {
        console.log(`\n[${i + 1}/${yantraFiles.length}]`);
        try {
            await generateGIF(yantraFiles[i]);
        } catch (error) {
            console.error(`   ❌ Error processing ${yantraFiles[i]}:`, error.message);
        }
    }

    console.log('\n\n✨ All GIFs generated successfully!');
    console.log(`Check the code folder for the GIF files.`);
}

generateAllGIFs().catch(console.error);
