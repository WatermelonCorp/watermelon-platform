import MorphingSidebarControls from '.';

export default function MorphingSidebarControlsDemo() {
  return (
    <div className="bg-background relative flex max-h-screen items-center justify-center p-10 transition-colors duration-300 dark:bg-neutral-950">
      <MorphingSidebarControls
        title="Configuration"
        configOptions={[
          { label: 'Width', value: '300' },
          { label: 'Height', value: '300' },
        ]}
        primaryFeatureName="Transition"
        secondaryFeatureName="Visual Changes"
        asymmetricOptionsName="Asymmetric"
        sliderConfigs={[
          {
            name: 'Scale',
            insertion: ['0.8', '1'],
            removal: ['1', '0.8'],
          },
          {
            name: 'Opacity',
            insertion: ['0', '1'],
            removal: ['1', '0'],
          },
        ]}
        tabs={['Insertion', 'Removal']}
        onAddProperty={() => console.log('Add Property Clicked')}
        onFeatureToggle={(active) => console.log('Feature active:', active)}
        onAsymmetricToggle={(active) =>
          console.log('Asymmetric active:', active)
        }
        onTabChange={(tab) => console.log('Tab changed:', tab)}
        onEaseChange={(ease) => console.log('Ease changed:', ease)}
      />
    </div>
  );
}
