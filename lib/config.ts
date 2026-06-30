export const config = {
  // Stage 0 / Stage 1 strings
  cursorHintStage0Text: "scroll !!",
  cursorHintScrollingText: "keep scrolling !!",
  cursorHintTextColor: "#FFFFFF",
  cursorHintBackgroundColor: "rgba(0,0,0,0.7)",
  cursorHintBorderColor: "rgba(255,255,255,0.4)",

  // Stage 2 strings
  cursorHintStage2Text: "Hey!!",
  introTitle: "About Me",
  mainHeadingLines: ["I document my learning", "journey, and build steadily"],
  mainDescription: "Curious? Try Clicking The Menu Button...",
  menuItems: [
    "1. Where it all began",
    "2. Whats going on right now?",
    "3. My Projects",
  ],
  page3Link: "https://github.com/Sugunstar",
  menuButtonLabel: "Menu",
  closeButtonLabel: "Close",
  page1Text: "",
  page2Text: "",
  page3Text: "",

  // Colors
  colors: {
    mainBg: "#000000",
    menuBg: "#F5F0DD",
    mainText: "#F5F0DD",
    menuText: "#000000",
    closeBtn: "#000000",
  },

  // Typography
  fonts: {
    mainHeadingFont: {
      fontSize: '100px',
      fontWeight: 700,
      letterSpacing: '-0.08em',
      lineHeight: '1.0em',
      textTransform: 'uppercase' as const,
    },
    mainDescriptionFont: {
      fontSize: '30px',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: '2.0em',
    },
    introTitleFont: {
      fontSize: '50px',
      fontWeight: 600,
      letterSpacing: '-0.03em',
      lineHeight: '1.1em',
    },
    menuItemsFont: {
      fontSize: '28px',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: '1.3em',
    },
    menuButtonFont: {
      fontSize: '25px',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: '1em',
    },
    cursorHintFont: {
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '0.16em',
      lineHeight: '1em',
      textTransform: 'uppercase' as const,
    },
  }
}
