# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple static HTML website with Georgian language content. The project consists of:

- `index.html` - Main page containing a comparison table of football players (Messi, Ronaldo, Pele) with statistics including goals, assists, and World Cup wins
- `secon.html` - Secondary page with Georgian text ("ეს არის მეორე გვერდი" - "This is the second page")
- `images/` - Directory containing image assets including screenshots and an India image

## Architecture

This is a basic static website with no build process, frameworks, or dependencies. The HTML files are standalone and can be opened directly in a web browser.

## Development

Since this is a static HTML project:

- No build commands are needed
- No package manager or dependencies
- Files can be edited directly and viewed in a browser
- The project uses Georgian language content and appears to be focused on football/soccer player statistics

## File Structure

```
nikoupdate/
├── index.html          # Main page with player statistics table
├── secon.html          # Secondary page
└── images/             # Image assets
    ├── 2024-01-07_12.56.10.png
    ├── 2024-01-09_20.37.18.png
    └── india.jpg
```

## Notes

- The HTML in `secon.html` has a syntax error (missing `>` in the body tag: `<body">`)
- The table in `index.html` appears incomplete (missing data for Pele's goals and some rows are incomplete)
- All text content is in Georgian language