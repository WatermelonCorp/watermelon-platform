'use client';
import LayeredProgressiveDisclosure from '.';

export default function LayeredProgressiveDisclosureDemo() {
  return (
    <div className="bg-background flex items-center justify-center p-10 transition-colors duration-300 dark:bg-neutral-950">
      <LayeredProgressiveDisclosure
        title="Configuration"
        configOptions={[
          { label: 'Width', value: '300' },
          { label: 'Height', value: '300' },
        ]}
        primaryFeatureName="Transition"
        secondaryFeatureName="Visual Changes"
        asymmetricOptionsName="Asymmetric"
        tabs={['Insertion', 'Removal']}
        onAddProperty={() => console.log('Add Property Clicked')}
        onFeatureToggle={(active) => console.log('Feature active:', active)}
        onAsymmetricToggle={(active) =>
          console.log('Asymmetric active:', active)
        }
        onTabChange={(tab) => console.log('Tab changed:', tab)}
      />
    </div>
  );
}
