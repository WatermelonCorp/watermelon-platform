import Hero32 from './index';

export default function Demo() {
  return (
    <div className="h-screen w-full">
      <Hero32
        logoText="Haven"
        navItems={['Home', 'Usecases', 'Pricing', 'Contact']}
        loginText="Login"
        title={
          <>
            Your Haven for <br />
            <span className="italic">Seamless</span> AI Solutions
          </>
        }
        subtitle={
          <>
            Confidential, professional help tailored to your unique needs, <br className="hidden md:block" />
            available on your schedule.
          </>
        }
        primaryActionText="Book a demo"
        backgroundImage="https://assets.watermelon.sh/hero-32-bg.avif"
      />
    </div>
  );
}
