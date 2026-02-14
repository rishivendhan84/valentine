/**
 * VALENTINE CONFIGURATION FILE
 * ============================
 * Edit this file to customize all the text, images, and content
 * for your personalized Valentine's experience.
 *
 * Instructions:
 * 1. Replace the placeholder text with your own messages
 * 2. Add or remove love notes, timeline events, etc. as needed
 */

const config = {
  // ============================================
  // SITE SETTINGS
  // ============================================
  site: {
    title: "For You", // Browser tab title
  },

  // ============================================
  // ENTRY SCREEN (First page they see)
  // ============================================
  entry: {
    heading: "I made something for you.",
    subtitle: "Something small, but from the heart.",
    buttonText: "Open it",
  },

  // ============================================
  // HEART AFFIRMATIONS (Tap the heart screen)
  // ============================================
  heartAffirmation: {
    instruction: "Tap the heart",
    unlockMessage: "Something unlocked...",
    // Add or remove affirmations as needed (shown one per tap)
    affirmations: [
      "You are my peace.",
      "You are my favorite place.",
      "You make ordinary days magical.",
      "With you, I feel home.",
      "You are my always.",
    ],
  },

  // ============================================
  // LOVE NOTES (Interactive envelope notes)
  // ============================================
  loveNotes: {
    heading: "Little notes for you",
    subtitle: "Tap each envelope to open",
    completionMessage: "Every word, straight from my heart...",
    // Add or remove notes as you like (each opens like an envelope)
    notes: [
      { id: 1, message: "You make my ordinary days feel extraordinary." },
      { id: 2, message: "My favorite place in the world is next to you." },
      { id: 3, message: "I fall for you a little more every single day." },
      { id: 4, message: "You're the reason I believe in forever." },
      { id: 5, message: "No one else could ever make me feel this way." },
      { id: 6, message: "You are my today and all of my tomorrows." },
    ],
  },

  // ============================================
  // LOVE TIMELINE (Story timeline section)
  // ============================================
  loveTimeline: {
    heading: "Our story",
    subtitle: "Swipe through our journey",
    swipeHint: "Tap and swipe",
    completionMessage: "And the best chapters are yet to come...",
    // Customize your relationship timeline events
    events: [
      {
        id: 1,
        title: "The Beginning",
        text: "When our story started to unfold...",
        date: "Day One",
      },
      {
        id: 2,
        title: "First Butterflies",
        text: "That moment I knew you were special.",
        date: "Soon After",
      },
      {
        id: 3,
        title: "Growing Closer",
        text: "Every conversation made me fall harder.",
        date: "With Time",
      },
      {
        id: 4,
        title: "The Realization",
        text: "I couldn't imagine life without you.",
        date: "One Day",
      },
      {
        id: 5,
        title: "Now",
        text: "And here we are, still choosing each other.",
        date: "Today",
      },
    ],
  },

  // ============================================
  // FINAL REVEAL (The big question)
  // ============================================
  finalReveal: {
    // Lines shown before the main question (one at a time)
    revealLines: [
      "I don't just love you.",
      "I choose you.",
      "Every day.",
      "Again.",
    ],
    // The main question
    question: "Will you be my Valentine?",
    // Shown after they say yes
    yesMessage: "You are my favorite chapter.",
    // Playful message when they try to hover over "No"
    noHoverMessage: "Try again...",
    // Button labels
    yesButtonText: "Yes",
    noButtonText: "No",
  },

  // ============================================
  // CELEBRATION (Final screen after they say yes)
  // ============================================
  celebration: {
    thankYouMessage: "Thank you for being mine.",
    description: "Here's to us, to every moment past and every moment yet to come.",
    closing: "Forever yours",
  },
};

export default config;
