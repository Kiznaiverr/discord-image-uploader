# Discord Image Upload

A simple web interface for uploading images directly to a Discord channel using Discord's API.

## How It Works

This application uploads images to a configured Discord channel through a Discord bot. Files are stored securely in the specified Discord channel and can be accessed via direct links.

## Quick Start

### Option 1: Self-Hosted

1. Clone or download this project
2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your Discord bot in `.env`:

   ```
   DISCORD_BOT_TOKEN=your_bot_token_here
   DISCORD_CHANNEL_ID=your_channel_id_here
   PORT=3000
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open `http://localhost:3000` in your browser

### Option 2: Use Existing Uploader

Alternatively, you can use our hosted version at: [https://discord-upload.example.com](https://discord-upload.example.com)

> [!IMPORTANT]
> When using the hosted uploader, uploaded files will be visible to the service maintainer. The Discord server used is private, so only the maintainer can access the files. Use at your own discretion.

## Features

- Drag and drop image upload
- File validation (images only, max 10MB)
- Progress indicator
- Direct download links
- Copy to clipboard functionality
- Clean, minimal interface

## Requirements

- Node.js 18+
- Discord bot with message sending permissions in target channel

## Discord Bot Setup

1. Create a Discord application at https://discord.com/developers/applications
2. Create a bot user and copy the token
3. Invite the bot to your server with appropriate permissions
4. Get the channel ID where images will be uploaded
5. Configure the bot token and channel ID in `.env`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
