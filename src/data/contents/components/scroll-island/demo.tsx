
import { ScrollIsland, type Topic } from "./index";

const TOPICS: Topic[] = [
  {
    id: "interaction-design",
    title: "What is Interaction Design",
    content:
      "Interaction design focuses on crafting meaningful relationships between users and digital products. It emphasizes creating interfaces that are not only visually appealing but also highly functional and easy to use. The discipline revolves around designing intuitive touchpoints where users interact with a product, such as buttons, gestures, and other inputs. Core principles include usability, feedback mechanisms, and accessibility, all of which contribute to a seamless user journey.",
  },
  {
    id: "user-experience",
    title: "Enhance User Experiences",
    content:
      "Enhancing user experience (UX) is about designing every aspect of a product to meet users' needs effectively and delightfully. It goes beyond aesthetics to include usability, functionality, and emotional resonance. A great UX ensures that the interface is intuitive, the navigation is seamless, and the user’s journey is smooth. This involves optimizing load times, ensuring mobile responsiveness, and creating clear information hierarchies.",
  },
  {
    id: "feedback-responsiveness",
    title: "Feedback and responsiveness",
    content:
      "Feedback and responsiveness are vital to creating an engaging and interactive user experience. Feedback ensures that users receive clear, immediate confirmation of their actions, whether through visual cues like button animations, auditory notifications, or haptic feedback. Responsiveness complements feedback by ensuring that the system reacts quickly and accurately to user input.",
  },
  {
    id: "cognitive-load",
    title: "Reducing Cognitive Load",
    content:
      "Cognitive load refers to the amount of mental effort required to process information and make decisions. Effective design reduces cognitive load by presenting information clearly and minimizing unnecessary complexity. Techniques include using consistent patterns, grouping related elements, and employing familiar icons and terminology.",
  },
  {
    id: "consistency",
    title: "Consistency in Design",
    content:
      "Consistency is a cornerstone of effective design, ensuring that users experience a cohesive and predictable interface. It involves using uniform colors, typography, layouts, and interaction patterns across an application or website. For example, a 'Save' button should look and behave the same way on every page, creating familiarity and reducing the learning curve.",
  },
  {
    id: "motion-design",
    title: "The role of Motion Design",
    content:
      "Motion design brings static interfaces to life, using animation and transitions to enhance usability and engagement. It serves as a guide, drawing attention to important elements like buttons or form fields. Subtle animations can indicate a successful action, such as a checkmark appearing after form submission, or provide visual feedback, like a button press effect.",
  },
];

export default function ScrollIslandDemo() {
  return (
      <ScrollIsland topics={TOPICS} />
  );
}