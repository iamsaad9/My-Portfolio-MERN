const PrivacyPolicy = () => {
  // --- Update these values ---
  const appName = "My Portfolio";
  const appUrl = "https://saad-masood.vercel.app";
  const lastUpdated = "January 18, 2026";

  return (
    <main className="min-h-screen bg-(--bg-primary) py-8 px-4 sm:px-6 lg:px-8 pt-20">
      {/* Container - centered and width-restricted */}
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <header className="border-b border-gray-200 pb-8 mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-(--theme_1)">
            Last Updated: {lastUpdated}
          </p>
        </header>

        {/* Content Section */}
        <div className="space-y-10 text-white leading-7">
          <section>
            <p className="text-lg">
              At <span className="font-semibold ">{appName}</span>, we value
              your privacy. This policy explains how we handle your data when
              you use our services at
              <a
                href={appUrl}
                className="text-blue-600 hover:text-blue-800 underline ml-1"
              >
                {appUrl}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              1. Information We Collect
            </h2>
            <p className="mb-4">
              Our application uses Google OAuth for authentication. When you
              sign in, Google shares the following data with us:
            </p>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✔</span>
                <span>
                  <strong className="text-white">Email Address:</strong> Used as
                  your unique account identifier.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✔</span>
                <span>
                  <strong className="text-white">Basic Profile:</strong> Your
                  name and profile picture to personalize your dashboard.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              2. Data Usage & Storage
            </h2>
            <p>
              Your data is used solely to provide the core functionality of{" "}
              <span className="font-medium text-white">{appName}</span>. We do
              not sell your data to advertisers or third parties. Our backend
              operations are hosted via{" "}
              <strong className="text-white font-medium">Render</strong>,
              ensuring your data is processed in a secure environment.
            </p>
          </section>

          <section className="bg-(--bg-secondary) p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-2">
              3. Third-Party Services
            </h2>
            <p className="text-white/60 text-sm sm:text-base">
              Because we use Google Login, your use of our app is also governed
              by the
              <a
                href="https://policies.google.com/privacy"
                className="font-bold underline ml-1 hover:text-(--theme_1) transition-colors duration-200"
              >
                Google Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              4. Your Control
            </h2>
            <p>
              You can disconnect your Google Account from our app at any time by
              visiting your
              <a
                href="https://myaccount.google.com/permissions"
                className="text-blue-600 hover:underline font-medium mx-1"
              >
                Google Security Settings
              </a>
              . To request full account deletion from our database, please
              contact us via the email below.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
