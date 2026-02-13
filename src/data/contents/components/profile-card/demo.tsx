import { ProfileCard } from './index';

export default function ProfileCardDemo() {
  return (
    <div className="w-full">
      <ProfileCard
        name="Claude"
        website="claude.ai"
        visits="216M"
        heatScore={98}
        location="California, USA"
        categories={["AI", "SaaS", "B2B"]}
        employees="1001-5000"
        arr="$3-4B"
        founders={[
          { name: "Dario Amodei", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dario" }
        ]}
        extraFounders={5}
      />
    </div>
  );
}