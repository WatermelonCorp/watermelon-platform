import { DrawSignatureComponent } from '.';

const DrawSignatureDemo = () => {
  return (
    <div className="flex items-center justify-center">
      <DrawSignatureComponent
        startLabel="Start Signing"
        finishLabel="Finish Signing"
        doneLabel="Signing Done"
        defaultStep="idle"
        onFinish={(canvas) => {
          if (!canvas) return;
          console.log('Signature canvas:', canvas);
          console.log('Base64:', canvas.toDataURL());
        }}
        onClear={() => {
          console.log('Signature cleared');
        }}
        onStepChange={(step) => {
          console.log('Current step:', step);
        }}
      />
    </div>
  );
};

export default DrawSignatureDemo;
