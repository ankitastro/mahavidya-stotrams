# Mahavidya Music Video Creation Guide

This document describes the process and commands used to create 9:16 aspect ratio music videos for the Mahavidya Stotrams album.

## Overview

All videos are created in 9:16 vertical format (720x1280) suitable for mobile viewing and social media platforms. Each video combines an animated yantra GIF with the corresponding audio track.

## Prerequisites

- ffmpeg 8.0 or later
- Audio files in WAV format (48kHz, 16-bit, stereo)
- Animated yantra GIFs (720x720, looping)

## Directory Structure

```
Mahavidya_Stotrams/
├── 01_Kali_Intro.wav
├── 02_Kali_Main.wav
├── ... (other audio files)
└── code/
    ├── videos/
    │   └── (output videos go here)
    └── yantras/
        ├── kali_yantra_loop_hd.gif
        ├── tara_yantra_loop_hd.gif
        └── ... (other yantra GIFs)
```

## Audio to Yantra Mapping

| Audio File | Yantra GIF | Notes |
|------------|------------|-------|
| 01_Kali_Intro.wav | kali_yantra_loop_hd.gif | |
| 02_Kali_Main.wav | kali_yantra_loop_hd.gif | |
| 03_Tara.wav | tara_yantra_loop_hd.gif | |
| 04_Tripura_Sundari_v1.wav | tripura_sundari_sri_yantra_loop_hd.gif | |
| 05_Tripura_Sundari_v2.wav | tripura_sundari_sri_yantra_loop_hd.gif | |
| 06_Bhuvaneshwari.wav | bhuvaneshvari_yantra_loop_hd.gif | |
| 07_Chinnamasta_Cover.wav | chinnamasta_yantra_loop_hd.gif | |
| 08_Chinnamasta_Remastered.wav | chinnamasta_yantra_loop_hd.gif | |
| 09_Bhairavi.wav | bhairavi_yantra_loop_hd.gif | |
| 10_Dhumavati_Main.wav | kali_yantra_loop_hd.gif | Fallback |
| 11_Dhumavati_Alakshmi.wav | kali_yantra_loop_hd.gif | Fallback |
| 12_Bagalamukhi.wav | bagalamukhi_yantra_loop_hd.gif | |
| 13_Matangi.wav | kali_yantra_loop_hd.gif | Fallback |
| 14_Kamala.wav | kamalatmika_yantra_loop_hd.gif | |
| 15_Bonus_Chinnamasta_DarkPower.wav | chinnamasta_yantra_loop_hd.gif | |
| 16_Bonus_Chinnamasta_DarkTechno.wav | chinnamasta_yantra_loop_hd.gif | |

## Step-by-Step Process

### 1. Check Audio Duration

**IMPORTANT:** Always check the audio duration first before creating the video.

```bash
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ../01_Kali_Intro.wav
```

Output example: `78.959979`

### 2. Create Video with Exact Duration

Use the `-t` flag with the exact duration (rounded to 2 decimal places) to ensure the video matches the audio length precisely.

**General Command Template:**

```bash
ffmpeg -y \
  -stream_loop -1 \
  -i yantras/YANTRA_FILE.gif \
  -i ../AUDIO_FILE.wav \
  -filter_complex "[0:v]scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2:black,format=yuv420p,fps=30[v]" \
  -map "[v]" \
  -map 1:a \
  -c:v libx264 \
  -preset medium \
  -crf 23 \
  -c:a aac \
  -b:a 192k \
  -t DURATION \
  OUTPUT_FILE.mp4
```

### 3. Command Explanation

| Parameter | Description |
|-----------|-------------|
| `-y` | Overwrite output file if it exists |
| `-stream_loop -1` | Loop the GIF infinitely |
| `-i yantras/YANTRA_FILE.gif` | Input yantra GIF file |
| `-i ../AUDIO_FILE.wav` | Input audio file |
| `-filter_complex "[0:v]scale=720:1280..."` | Video processing filter chain |
| `scale=720:1280:force_original_aspect_ratio=decrease` | Scale to fit within 720x1280 |
| `pad=720:1280:(ow-iw)/2:(oh-ih)/2:black` | Add black letterboxing to center the yantra |
| `format=yuv420p` | Use YUV 4:2:0 color format (compatible with all players) |
| `fps=30` | Set output frame rate to 30 fps |
| `-map "[v]"` | Map the filtered video stream |
| `-map 1:a` | Map the audio from input 1 |
| `-c:v libx264` | Encode video with H.264 codec |
| `-preset medium` | Encoding speed/quality balance |
| `-crf 23` | Constant Rate Factor (quality: 18-28, lower = better) |
| `-c:a aac` | Encode audio with AAC codec |
| `-b:a 192k` | Audio bitrate 192 kbps |
| `-t DURATION` | Set exact output duration to match audio |

## Example Commands

### Example 1: Kali Intro (Standard)

```bash
# Step 1: Check duration
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ../01_Kali_Intro.wav
# Output: 78.959979

# Step 2: Create video
ffmpeg -y \
  -stream_loop -1 \
  -i yantras/kali_yantra_loop_hd.gif \
  -i ../01_Kali_Intro.wav \
  -filter_complex "[0:v]scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2:black,format=yuv420p,fps=30[v]" \
  -map "[v]" \
  -map 1:a \
  -c:v libx264 \
  -preset medium \
  -crf 23 \
  -c:a aac \
  -b:a 192k \
  -t 78.96 \
  kali_intro_9x16.mp4
```

### Example 2: Tara (Different Yantra)

```bash
# Step 1: Check duration
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ../03_Tara.wav
# Output: 141.879979

# Step 2: Create video
ffmpeg -y \
  -stream_loop -1 \
  -i yantras/tara_yantra_loop_hd.gif \
  -i ../03_Tara.wav \
  -filter_complex "[0:v]scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2:black,format=yuv420p,fps=30[v]" \
  -map "[v]" \
  -map 1:a \
  -c:v libx264 \
  -preset medium \
  -crf 23 \
  -c:a aac \
  -b:a 192k \
  -t 141.88 \
  03_tara_9x16.mp4
```

### Example 3: Dhumavati (Using Kali Yantra Fallback)

```bash
# Step 1: Check duration
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ../10_Dhumavati_Main.wav
# Output: 172.239979

# Step 2: Create video (using Kali yantra as fallback)
ffmpeg -y \
  -stream_loop -1 \
  -i yantras/kali_yantra_loop_hd.gif \
  -i ../10_Dhumavati_Main.wav \
  -filter_complex "[0:v]scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2:black,format=yuv420p,fps=30[v]" \
  -map "[v]" \
  -map 1:a \
  -c:v libx264 \
  -preset medium \
  -crf 23 \
  -c:a aac \
  -b:a 192k \
  -t 172.24 \
  10_dhumavati_main_9x16.mp4
```

## Batch Processing

To create all videos at once, you can run multiple ffmpeg commands in parallel:

```bash
# Get all durations first
for file in ../05_Tripura_Sundari_v2.wav ../06_Bhuvaneshwari.wav; do
  echo "$(basename "$file"): $(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$file")"
done

# Run multiple ffmpeg commands in background
ffmpeg -y -stream_loop -1 -i yantras/tripura_sundari_sri_yantra_loop_hd.gif -i ../05_Tripura_Sundari_v2.wav -filter_complex "[0:v]scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2:black,format=yuv420p,fps=30[v]" -map "[v]" -map 1:a -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 192k -t 197.64 05_tripura_sundari_v2_9x16.mp4 &

ffmpeg -y -stream_loop -1 -i yantras/bhuvaneshvari_yantra_loop_hd.gif -i ../06_Bhuvaneshwari.wav -filter_complex "[0:v]scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2:black,format=yuv420p,fps=30[v]" -map "[v]" -map 1:a -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 192k -t 162.92 06_bhuvaneshwari_9x16.mp4 &

# Wait for all background jobs to complete
wait
```

## Verification

After creating videos, verify their properties:

```bash
# Check video dimensions and duration
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration -of csv=p=0 kali_intro_9x16.mp4

# Expected output: 720,1280,78.966667
```

## Output Specifications

All generated videos have the following properties:

- **Resolution:** 720x1280 (9:16 aspect ratio)
- **Video Codec:** H.264 (libx264)
- **Video Quality:** CRF 23
- **Frame Rate:** 30 fps
- **Color Format:** YUV 4:2:0
- **Audio Codec:** AAC
- **Audio Bitrate:** 192 kbps
- **Audio Sample Rate:** 48 kHz
- **Audio Channels:** Stereo

## Common Issues and Solutions

### Issue: Video duration doesn't match audio

**Solution:** Always use the `-t` flag with the exact duration obtained from ffprobe. Do not rely on the `-shortest` flag alone.

### Issue: Yantra appears stretched or distorted

**Solution:** The `scale` and `pad` filters ensure the yantra maintains its aspect ratio and is centered with black bars.

### Issue: Video file too large

**Solution:** Adjust the CRF value (increase to 24-26 for smaller files) or reduce audio bitrate.

### Issue: Playback compatibility issues

**Solution:** The `format=yuv420p` filter ensures compatibility with all players including QuickTime and mobile devices.

## Complete Video List

All 16 videos created:

```
videos/
├── kali_intro_9x16.mp4              (79s,   5.4MB)
├── 02_kali_main_9x16.mp4            (252s,  17MB)
├── 03_tara_9x16.mp4                 (142s,  14MB)
├── 04_tripura_sundari_v1_9x16.mp4   (198s,  34MB)
├── 05_tripura_sundari_v2_9x16.mp4   (198s,  34MB)
├── 06_bhuvaneshwari_9x16.mp4        (163s,  19MB)
├── 07_chinnamasta_cover_9x16.mp4    (292s,  33MB)
├── 08_chinnamasta_remastered_9x16.mp4 (292s, 33MB)
├── 09_bhairavi_9x16.mp4             (143s,  17MB)
├── 10_dhumavati_main_9x16.mp4       (172s,  12MB)
├── 11_dhumavati_alakshmi_9x16.mp4   (130s,  8.9MB)
├── 12_bagalamukhi_9x16.mp4          (155s,  17MB)
├── 13_matangi_9x16.mp4              (288s,  20MB)
├── 14_kamala_9x16.mp4               (175s,  19MB)
├── 15_bonus_chinnamasta_darkpower_9x16.mp4 (162s, 18MB)
└── 16_bonus_chinnamasta_darktechno_9x16.mp4 (195s, 22MB)

Total: 332 MB
```

## Notes

- Videos 10, 11, and 13 use the Kali yantra as a fallback because no specific yantras were available for Dhumavati and Matangi.
- All durations are matched precisely to the audio tracks to prevent sync issues.
- The workflow prioritizes checking audio duration first, then creating the video with exact timing.
