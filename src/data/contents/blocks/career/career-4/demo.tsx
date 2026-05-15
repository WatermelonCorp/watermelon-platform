'use client';

import Career4 from ".";


export default function Career4Demo() {
  return <Career4 
    eyebrow="Join our HR team"
    heading="Exciting roles in modern HR"
    description="Shape the future of talent acquisition and people culture."
    footerLabel="Looking for more opportunities?"
    footerCTA="See all open roles"
    onFooterCTA={() => alert('Footer CTA clicked')}
    className="max-w-6xl mx-auto p-8" 
    jobs={[
      {
        id: 1,
        title: 'Talent Acquisition Specialist',
        location: 'United States',
        type: 'Full-time',
        salaryRange: '$100 - $120',
        onApply: (j) => alert(`Applying: ${j.title}`),
      },
      {
        id: 2,
        title: 'Employer Branding Manager',
        location: 'United States',
        type: 'Full-time',
        salaryRange: '$100 - $120',
        onApply: (j) => alert(`Applying: ${j.title}`),
      },
      {
        id: 3,
        title: 'HR Marketing Strategist',
        location: 'United States',
        type: 'Part-time',
        salaryRange: '$100 - $120',
        onApply: (j) => alert(`Applying: ${j.title}`),
      },
      {
        id: 4,
        title: 'People & Culture Coordinator',
        location: 'United Kingdom',
        type: 'Full-time',
        salaryRange: '$100 - $120',
        onApply: (j) => alert(`Applying: ${j.title}`),
      },
      {
        id: 5,
        title: 'Recruitment Marketing Lead',
        location: 'United States',
        type: 'Remote',
        salaryRange: '$100 - $120',
        onApply: (j) => alert(`Applying: ${j.title}`),
      },
    ]}
  />;
}
