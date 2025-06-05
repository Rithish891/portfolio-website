# AI-Enhanced Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and TailwindCSS, featuring an interactive AI chatbot powered by Google Gemini.

## Project Overview

This portfolio website showcases my professional experience, skills, and projects with a clean, modern UI. The standout feature is an AI chatbot that can answer questions about my professional background by leveraging the Google Gemini API with in-context learning from my resume data.

## Project Structure

The project follows modern frontend development best practices with a clean and maintainable architecture:

```
src/
  app/                           # Next.js App Router pages
    api/                         # API routes for Gemini integration
    layout.tsx                   # Root layout component
    page.tsx                     # Home page component
  components/
    ContentWrapper.tsx           # Main content wrapper
    Preloader.tsx                # Site preloader animation
    common/                      # Common UI components
      CustomCursor.tsx           # Custom cursor interaction
      ResumeDownloadButton.tsx   # Resume download button
    layout/                      # Layout components
      MainNavigation.tsx         # Main navigation header
      MobileUtilityBar.tsx       # Mobile navigation bar
    sections/                    # Page sections components
      AboutSection.tsx           # About me section
      ContactSection.tsx         # Contact information
      EducationSection.tsx       # Education background
      ExperienceSection.tsx      # Work experience
      HeroSection.tsx            # Hero landing section
      ProjectsSection.tsx        # Project showcases
      SkillsSection.tsx          # Technical skills
      Footer.tsx                 # Site footer
    ui/                          # Reusable UI components
      OptimizedImage.tsx         # Image optimization component
    features/                    # Feature-specific components
      ChatBot.tsx                # AI chat feature component
  contexts/                      # React contexts/providers
    LoadingContext.tsx           # Loading state management
    ThemeProvider.tsx            # Theme management
  data/
    resume-data.ts               # Resume data for AI context
  hooks/                         # Custom React hooks
    useClientSideEffect.ts       # Client-side effect hook
  lib/
    api/                         # API integration
      gemini.ts                  # Google Gemini API setup
    services/                    # Service classes
      chat-service.ts            # Chat functionality service
    utils/                       # Utility functions
      scroll-utils.ts            # Scroll animation utilities
  styles/                        # CSS styles
    animation-utils.css          # Animation utilities
    globals.css                  # Global styles
  types/                         # TypeScript type definitions
    chat.ts                      # Chat related types
    experience.ts                # Experience data types
    project.ts                   # Project data types
public/
  assets/                        # Static assets and images
```

## Key Features

- **Interactive AI Chatbot**: Powered by Google Gemini 2.0 Flash model, answering questions about my professional background
- **Modern UI**: Responsive design with smooth animations using Framer Motion
- **Dark/Light Mode**: Theme switching with next-themes
- **Section Navigation**: Smooth scrolling between different portfolio sections
- **Optimized Images**: Efficient image loading and display
- **Interactive Elements**: Custom cursor, animated components, and transitions

## Technology Stack

- **Framework**: Next.js 15 with App Router and TurboPack
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **UI Components**:
  - Radix UI (navigation-menu, slot)
  - Custom UI components
  - Framer Motion animations
- **AI Integration**: Google Generative AI (Gemini 2.0 Flash model)
- **State Management**: React Context API
- **Icons**: React Icons
- **Theming**: next-themes
- **Deployment**: Ready for Vercel deployment

## Key AI Features

The portfolio uses Google's Gemini 2.0 Flash model to power an interactive chatbot that:

1. Uses in-context learning with detailed resume data
2. Responds in first person as if it were the portfolio owner
3. Provides detailed answers about professional experience, skills, and projects
4. Maintains chat history for contextual conversations

## Getting Started

### Prerequisites

- Node.js (version 18 or newer recommended)
- Google Gemini API key

### Environment Setup

Create a `.env.local` file in the root directory with:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Installation

```bash
# Install dependencies
npm install

# Run the development server with TurboPack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio website.

### Building for Production

```bash
# Create production build
npm run build

# Start production server
npm run start
```

## Customization

The portfolio is designed to be easily customizable:

- Update `src/data/resume-data.ts` with your personal information
- Replace images in the `public/assets` directory
- Modify section content in the respective section components
- Adjust theme colors in TailwindCSS configuration

## Deployment

This portfolio is optimized for deployment on Vercel. Simply connect your GitHub repository to Vercel for continuous deployment.
