'use client';

import Career3 from '.';

export default function Career3Demo() {
  return (
    <Career3
      eyebrow="Join our global team"
      heading="Exciting roles in modern work"
      subheading="Shape the future of digital tools and collaboration."
      exploreLabel="Explore all positions"
      exploreHref="#"
      departments={['Product', 'Engineering', 'Design']}
      jobs={[
        {
          id: '1',
          title: 'Product Manager',
          description:
            'Build innovative products that solve real customer challenges at scale.',
          location: 'United States',
          type: 'Full-time',
          salaryRange: '$100k – $120k',
          department: 'Product',
          tags: ['Senior level', 'Global', 'Project work'],
        },
        {
          id: '2',
          title: 'Marketing Specialist',
          description:
            'Drive growth campaigns and strengthen our global brand presence.',
          location: 'United States',
          type: 'Full-time',
          salaryRange: '$100k – $120k',
          department: 'Product',
          tags: ['Senior level', 'Global', 'Project work'],
        },
        {
          id: '3',
          title: 'base-ui/UX Designer',
          description:
            'Design user-friendly experiences for our suite of digital platforms.',
          location: 'United States',
          type: 'Full-time',
          salaryRange: '$100k – $120k',
          department: 'Product',
          tags: ['Senior level', 'Global', 'Project work'],
        },
        {
          id: '4',
          title: 'Data Analyst',
          description:
            'Deliver insights from complex data to guide business strategy.',
          location: 'United States',
          type: 'Full-time',
          salaryRange: '$100k – $120k',
          department: 'Product',
          tags: ['Senior level', 'Global', 'Project work'],
        },
        {
          id: '5',
          title: 'Software Engineer',
          description:
            'Develop scalable software systems for global product teams.',
          location: 'United States',
          type: 'Full-time',
          salaryRange: '$100k – $120k',
          department: 'Product',
          tags: ['Senior level', 'Global', 'Project work'],
        },
        {
          id: '6',
          title: 'Customer Success Manager',
          description:
            'Build long-term relationships and continuously improve client outcomes.',
          location: 'United States',
          type: 'Full-time',
          salaryRange: '$100k – $120k',
          department: 'Product',
          tags: ['Senior level', 'Global', 'Project work'],
        },
        {
          id: '7',
          title: 'Backend Engineer',
          description:
            'Architect and scale reliable APIs that power millions of users.',
          location: 'Remote',
          type: 'Full-time',
          salaryRange: '$130k – $160k',
          department: 'Engineering',
          tags: ['Senior level'],
        },
        {
          id: '8',
          title: 'DevOps Engineer',
          description:
            'Streamline CI/CD pipelines and keep our infrastructure resilient.',
          location: 'Remote',
          type: 'Full-time',
          salaryRange: '$120k – $145k',
          department: 'Engineering',
        },
        {
          id: '9',
          title: 'Brand Designer',
          description:
            'Craft a visual identity that resonates across every touchpoint.',
          location: 'United States',
          type: 'Full-time',
          salaryRange: '$95k – $115k',
          department: 'Design',
          tags: ['Senior level', 'Global'],
        },
        {
          id: '10',
          title: 'Motion Designer',
          description:
            'Bring interfaces to life through purposeful animation and micro-interactions.',
          location: 'United States',
          type: 'Contract',
          salaryRange: '$80k – $100k',
          department: 'Design',
          tags: ['Senior level'],
        },
      ]}
    />
  );
}
