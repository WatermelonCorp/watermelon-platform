import { Footer30 } from './index';

export default function Footer30Demo() {
  return (
    <div className="w-full">
      <Footer30
        heading={
          <>
            DESIGNING SPACES.
            <br />
            ELEVATING LIVES.
          </>
        }
        columns={[
          {
            title: 'WATERMELON',
            links: [
              { label: 'TRANSFORM BUSINESS', href: '#' },
              { label: '442014, CASTELLARANO', href: '#' },
              { label: 'REGGIO EMILIA-ITALY', href: '#' },
            ],
          },
          {
            title: 'NAVIGATION',
            links: [
              { label: 'HOME', href: '#' },
              { label: 'COLLECTIONS', href: '#' },
              { label: 'PROJECTS', href: '#' },
            ],
          },
          {
            title: 'INNOVATIONS',
            links: [
              { label: 'APPLICATIONS', href: '#' },
              { label: 'SHOWROOM', href: '#' },
            ],
          },
          {
            title: 'FOLLOW',
            links: [
              { label: 'FACEBOOK', href: '#' },
              { label: 'INSTAGRAM', href: '#' },
            ],
          },
          {
            title: 'LINKDEIN',
            links: [
              { label: 'BEHANCE', href: '#' },
            ],
          },
        ]}
        bigText="watermelon"
        copyright="Copyright© watermelon Studio"
        location="Brooklyn, NY"
        time="07:23:14 AM"
        bottomLinks={[
          { label: 'LEGAL', href: '#' },
          { label: 'COOKIE', href: '#' },
          { label: 'PRIVACY', href: '#' },
        ]}
      />
    </div>
  );
}
