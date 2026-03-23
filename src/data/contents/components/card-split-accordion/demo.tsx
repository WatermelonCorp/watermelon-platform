
import { HiCursorArrowRipple } from 'react-icons/hi2';
import { Layers, Send } from 'lucide-react';
import { AccordionApp } from '.';
import { PiHandTap } from 'react-icons/pi';
import { IoIosTimer } from 'react-icons/io';

const items = [
  {
    id: 1,
    title: 'What is Interaction Design?',
    icon: (
      <HiCursorArrowRipple size={28} className="-rotate-10" color="#86858C" />
    ),
    content:
      'Interaction design focuses on creating engaging interfaces with well-thought-out behaviors and actions.',
  },
  {
    id: 2,
    title: 'Principles & Patterns',
    icon: <Layers size={24} />,
    content:
      'Fundamental guidelines and repeated solutions that ensure consistency and usability in design.',
  },
  {
    id: 3,
    title: 'Usability & Accessibility',
    icon: <PiHandTap size={26} className="-rotate-20" />,
    content:
      'Designing experiences that are easy to use and accessible to people of all abilities.',
  },
  {
    id: 4,
    title: 'Prototyping & Testing',
    icon: <Send size={24} />,
    content:
      'Rapid experimentation and validation of ideas through prototypes and real user testing.',
  },
  {
    id: 5,
    title: 'UX Optimisation',
    icon: <IoIosTimer size={26} />,
    content:
      'Improving user experience by analyzing behavior and refining interactions over time.',
  },
];

function CardSplittingAccordionDemo() {
  return <AccordionApp items={items} />;
}

export default CardSplittingAccordionDemo;
