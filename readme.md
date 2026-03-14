# YouTube URL Video Downloader (Full Stack Project)

## Overview

This project allows users to paste a YouTube video URL and download the
video in different formats or qualities.

The goal of this project is to demonstrate full‑stack engineering
concepts including: - API design - Backend processing pipelines - File
streaming - Queue processing - Frontend state management

This document explains the **complete architecture, flow, and folder
structure** so that any developer can understand the system.

------------------------------------------------------------------------

# 1. High Level Architecture

User → Frontend → Backend API → Downloader Engine → File Stream → User
Download

Main components:

Frontend (UI) Backend API Server Video Extraction Layer
Download/Processing Engine Temporary Storage (optional)

------------------------------------------------------------------------

# 2. Application Flow

## Step 1 --- User Input

User opens the web application and pastes a YouTube video URL.

Example: https://youtube.com/watch?v=VIDEO_ID

Frontend validates the URL format before sending it to the server.

------------------------------------------------------------------------

## Step 2 --- Fetch Video Information

Frontend sends request to backend.

POST /api/video/info

Body: { "url": "youtube_video_url" }

Backend responsibilities:

1.  Validate YouTube URL
2.  Extract videoId
3.  Fetch metadata

Returned metadata:

-   video title
-   thumbnail
-   duration
-   available formats
-   resolution list
-   file sizes

Frontend displays the video preview and available download options.

------------------------------------------------------------------------

## Step 3 --- User Selects Download Format

User chooses:

-   360p
-   720p
-   1080p
-   audio only (mp3)

Frontend sends request.

POST /api/video/download

Body:

{ "url": "...", "format": "720p" }

------------------------------------------------------------------------

# 3. Backend Processing Flow

Server receives request.

Pipeline:

Receive Request ↓ Validate URL ↓ Fetch Video Metadata ↓ Select Requested
Format ↓ Start Video Download ↓ Optional Conversion (mp3/mp4) ↓ Stream
File to User

------------------------------------------------------------------------

# 4. Streaming vs File Storage

Two implementation strategies.

## Option A --- Direct Streaming (Recommended)

Flow:

YouTube → Backend Stream → Browser Download

Advantages:

-   No disk storage required
-   Faster delivery
-   Scalable architecture

------------------------------------------------------------------------

## Option B --- Temporary File Storage

Flow:

YouTube → Download to Server ↓ Store in temp directory ↓ Send to user ↓
Delete file

Advantages:

-   Easier error handling
-   Supports retry
-   Supports queue systems

------------------------------------------------------------------------

# 5. Backend API Design

## Fetch Video Info

POST /api/video/info

Purpose: Return metadata and available formats.

------------------------------------------------------------------------

## Start Download

POST /api/video/download

Purpose: Start processing and return download stream.

------------------------------------------------------------------------

## Stream Endpoint

GET /api/video/stream/:id

Purpose: Stream processed file to the browser.

------------------------------------------------------------------------

# 6. Frontend Components

Main UI components:

HomePage │ ├── UrlInput ├── VideoPreview ├── FormatSelector └──
DownloadButton

------------------------------------------------------------------------

# 7. Detailed User Journey

1.  User opens app
2.  Pastes YouTube URL
3.  Clicks fetch video
4.  Backend returns metadata
5.  User selects format
6.  Backend starts processing
7.  Video streamed to browser
8.  Browser downloads file

------------------------------------------------------------------------

# 8. Suggested Folder Structure

Project root structure.

youtube-video-downloader/

```
frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UrlInput.jsx
│   │   │   ├── VideoPreview.jsx
│   │   │   ├── FormatSelector.jsx
│   │   │   └── DownloadButton.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json

backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── video.controller.js
│   │   ├── routes/
│   │   │   └── video.route.js
│   │   ├── services/
│   │   │   ├── youtube.service.js
│   │   │   └── download.service.js
│   │   ├── utils/
│   │   │   └── validateUrl.js
│   │   ├── workers/
│   │   │   └── downloadWorker.js
│   │   └── server.js
│   └── package.json
```

------------------------------------------------------------------------

# 9. Download Processing Architecture

Production systems usually separate download logic.

API Server ↓ Job Queue ↓ Worker Process ↓ Downloader Engine ↓ Stream
File

This prevents the API server from blocking while downloading large
videos.

------------------------------------------------------------------------

# 10. Production Improvements

To make the project more professional:

Add rate limiting Add download progress tracking Add Redis queue Add
worker processes Add Docker support Add logging Add request validation
Add error monitoring

------------------------------------------------------------------------

# 11. Technologies Typically Used

Frontend

React / Next.js Tailwind CSS

Backend

Node.js Express

Download Engine

yt-dlp

Media Processing

FFmpeg

Optional

Redis BullMQ Docker

------------------------------------------------------------------------

# 12. Example End‑to‑End Flow

User ↓ Paste URL ↓ Frontend Request ↓ Backend Validate ↓ Fetch Video
Info ↓ User Select Format ↓ Backend Download ↓ Stream to Browser ↓ File
Download Complete

------------------------------------------------------------------------

# Conclusion

This project demonstrates several important backend and system design
concepts:

-   API architecture
-   streaming large files
-   media processing
-   asynchronous job handling
-   full‑stack data flow

It is an excellent portfolio project for full‑stack developers.
