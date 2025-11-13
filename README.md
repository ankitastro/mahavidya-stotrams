# Mahavidya Stotrams

Sacred hymns dedicated to the Dasa Mahavidya (Ten Great Wisdom Goddesses) with animated yantras and music videos.

<div align="center">

![Kali Yantra](code/yantras/kali_yantra_loop_hd.gif)

*Animated Kali Yantra - Sacred geometry in motion*

</div>

## 🕉️ About

This project combines traditional Sanskrit stotrams (hymns) with modern visualization techniques. Each track is paired with its corresponding yantra (sacred geometric diagram) animated as a looping meditation visual, perfect for 9:16 vertical video format suitable for mobile viewing and social media.

### The Dasa Mahavidya

The Ten Great Wisdom Goddesses represent different aspects of the Divine Feminine:

1. **Kali** - The Destroyer of Evil
2. **Tara** - The Guiding Star
3. **Tripura Sundari (Shodashi)** - The Supreme Beauty
4. **Bhuvaneshvari** - The Creator of the World
5. **Chinnamasta** - The Self-Decapitated One
6. **Bhairavi** - The Fierce Goddess
7. **Dhumavati** - The Widow Goddess
8. **Bagalamukhi** - The Paralyzer of Enemies
9. **Matangi** - The Prime Minister of Lalita
10. **Kamala (Lakshmi)** - The Lotus Goddess

## 📂 Project Structure

```
mahavidya-stotrams/
├── README.md
├── .gitignore
│
├── Artwork/                          # Album and track artwork
│   ├── Track_01_Kali_Intro.jpg
│   ├── Track_02_Kali_Main.jpg
│   └── ... (12 track images)
│
├── code/
│   ├── yantras/                      # Animated yantra GIFs
│   │   └── kali_yantra_loop_hd.gif  # Featured Kali yantra
│   │
│   ├── videos/
│   │   └── VIDEO_CREATION_GUIDE.md   # Complete ffmpeg workflow
│   │
│   ├── kali.html                     # Yantra HTML generators
│   ├── tara.html
│   ├── tripura-sundari.html
│   ├── bhuvaneshvari-yantri.html
│   ├── chhinamasta-yantra.html
│   ├── bhairavi-yantra.html
│   ├── bagalamukhi-yantra.html
│   ├── matangi-yanta.html
│   ├── Kamalatmika-yantra.html
│   ├── sri-yantra.html
│   │
│   ├── generate-gifs.js              # Puppeteer script for GIF export
│   └── package.json
│
├── DistroKid_Track_Metadata.csv      # Music distribution metadata
├── DistroKid_Upload_Checklist.txt
├── YouTube_Upload_Guide.txt
├── Artwork_Guide.txt
└── dasa_mahavidya_metadata.json

```

## 🎵 Track List

| # | Track Name | Duration | Yantra |
|---|------------|----------|--------|
| 01 | Kali Intro | 1:19 | Kali |
| 02 | Kali Main | 4:12 | Kali |
| 03 | Tara | 2:22 | Tara |
| 04 | Tripura Sundari v1 | 3:18 | Sri Yantra |
| 05 | Tripura Sundari v2 | 3:18 | Sri Yantra |
| 06 | Bhuvaneshwari | 2:43 | Bhuvaneshwari |
| 07 | Chinnamasta Cover | 4:52 | Chinnamasta |
| 08 | Chinnamasta Remastered | 4:52 | Chinnamasta |
| 09 | Bhairavi | 2:23 | Bhairavi |
| 10 | Dhumavati Main | 2:52 | Kali (fallback) |
| 11 | Dhumavati Alakshmi | 2:10 | Kali (fallback) |
| 12 | Bagalamukhi | 2:35 | Bagalamukhi |
| 13 | Matangi | 4:48 | Kali (fallback) |
| 14 | Kamala | 2:55 | Kamalatmika |
| 15 | Bonus: Chinnamasta Dark Power | 2:42 | Chinnamasta |
| 16 | Bonus: Chinnamasta Dark Techno | 3:15 | Chinnamasta |

**Total Duration:** ~50 minutes

## 🎨 Features

### Animated Yantras
- **Sacred Geometry:** Each yantra is rendered using HTML5 Canvas with precise geometric calculations
- **Smooth Animation:** 30 FPS looping animations for meditation and visual appeal
- **High Quality:** 720x720 source resolution optimized for 9:16 vertical video

### Video Creation
- **9:16 Aspect Ratio:** Perfect for Instagram Reels, YouTube Shorts, TikTok
- **Professional Quality:** H.264 encoding with AAC audio (192 kbps)
- **Precise Timing:** Videos match audio duration exactly using ffmpeg
- **Documentation:** Complete workflow documented in [VIDEO_CREATION_GUIDE.md](code/videos/VIDEO_CREATION_GUIDE.md)

## 🛠️ Technical Details

### Yantra Generation
The yantras are generated using HTML/JavaScript with Canvas API:
- Geometric precision with trigonometric calculations
- Gradient fills and glow effects
- Rotation animations for mesmerizing visual meditation

### Video Pipeline
```bash
# 1. Check audio duration
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 audio.wav

# 2. Create 9:16 video
ffmpeg -y \
  -stream_loop -1 -i yantra.gif \
  -i audio.wav \
  -filter_complex "[0:v]scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2:black,format=yuv420p,fps=30[v]" \
  -map "[v]" -map 1:a \
  -c:v libx264 -preset medium -crf 23 \
  -c:a aac -b:a 192k \
  -t DURATION \
  output.mp4
```

### GIF Export
Using Puppeteer to capture Canvas animations:
```bash
npm install
node generate-gifs.js
```

## 📋 Usage

### Generate Yantra GIFs

1. Install dependencies:
```bash
cd code
npm install
```

2. Run the GIF generator:
```bash
node generate-gifs.js
```

This will create animated GIF files for all yantras in the `yantras/` directory.

### Create Music Videos

See the complete guide: [VIDEO_CREATION_GUIDE.md](code/videos/VIDEO_CREATION_GUIDE.md)

**Prerequisites:**
- ffmpeg 8.0 or later
- Audio files in WAV format
- Generated yantra GIF files

**Quick Start:**
```bash
# Get audio duration
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 audio.wav

# Create video (replace DURATION with the value from ffprobe)
ffmpeg -y -stream_loop -1 -i code/yantras/kali_yantra_loop_hd.gif -i audio.wav \
  -filter_complex "[0:v]scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2:black,format=yuv420p,fps=30[v]" \
  -map "[v]" -map 1:a -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 192k \
  -t DURATION output.mp4
```

## 📁 What's Not Included

To keep the repository size manageable, the following files are excluded (see `.gitignore`):

- **Audio Files** (*.wav, *.mp3, *.flac) - Source music files
- **Video Files** (*.mp4) - Rendered music videos (332 MB total)
- **Large Yantra GIFs** - Only Kali yantra (82 MB) is included; others can be regenerated using the HTML generators
- **node_modules/** - Install via `npm install`

## 🎯 Output Specifications

All generated videos have the following properties:

- **Resolution:** 720x1280 (9:16 aspect ratio)
- **Frame Rate:** 30 fps
- **Video Codec:** H.264 (libx264, CRF 23)
- **Audio Codec:** AAC (192 kbps, 48 kHz, stereo)
- **Color Format:** YUV 4:2:0 (universal compatibility)
- **Average File Size:** 5-35 MB depending on duration

## 📖 Documentation

- **[VIDEO_CREATION_GUIDE.md](code/videos/VIDEO_CREATION_GUIDE.md)** - Complete ffmpeg workflow with examples
- **[DistroKid_Upload_Checklist.txt](DistroKid_Upload_Checklist.txt)** - Music distribution checklist
- **[YouTube_Upload_Guide.txt](YouTube_Upload_Guide.txt)** - YouTube upload guidelines
- **[Artwork_Guide.txt](Artwork_Guide.txt)** - Album artwork specifications
- **[dasa_mahavidya_metadata.json](dasa_mahavidya_metadata.json)** - Structured metadata for all tracks

## 🔮 Sacred Geometry

The yantras in this project represent ancient sacred geometry used for meditation and spiritual practice:

- **Triangles** - Represent Shiva (downward) and Shakti (upward)
- **Circles** - Represent the cosmos and cycles of creation
- **Lotus Petals** - Represent spiritual unfolding
- **Bindu** - The center point representing the source of creation
- **Square** - The boundary representing the material world

## 🙏 Credits

Created with devotion and modern technology.

**Generated with:**
- HTML5 Canvas for geometric rendering
- Puppeteer for GIF capture
- FFmpeg for video encoding
- [Claude Code](https://claude.com/claude-code) for automation

## 📜 License

This project contains sacred traditional content. The code and visualizations are provided for devotional, educational, and artistic purposes.

## 🔗 Links

- **Repository:** https://github.com/ankitastro/mahavidya-stotrams
- **Issues:** https://github.com/ankitastro/mahavidya-stotrams/issues
