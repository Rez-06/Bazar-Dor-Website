import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | বাজার দর",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#F0F5F0] flex-1 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl bg-white rounded-2xl border border-gray-200 p-5 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mt-1">BazarDor (বাজার দর)</p>

        <h2 className="font-semibold text-lg mt-6">What we collect</h2>
        <p className="mt-2 text-sm sm:text-base">
          When you create an account or sign in with email, Google or GitHub, we store your name,
          email address and profile picture (if your provider shares one). If you sign up with
          email, your password is stored in hashed form and is never readable by us.
        </p>

        <h2 className="font-semibold text-lg mt-6">How we use it</h2>
        <p className="mt-2 text-sm sm:text-base">
          This information is used only to create your account, keep you signed in, and show your
          name and picture inside the app. We do not sell, rent or share your data with third
          parties, and we do not use it for advertising.
        </p>

        <h2 className="font-semibold text-lg mt-6">Where it is stored</h2>
        <p className="mt-2 text-sm sm:text-base">
          Account data is stored in a MongoDB Atlas database. Sign-in is handled by BetterAuth with
          optional Google and GitHub login.
        </p>

        <h2 className="font-semibold text-lg mt-6">Your choices</h2>
        <p className="mt-2 text-sm sm:text-base">
          You can update your name from your profile page. To have your account and data deleted,
          contact us at rezwan.ahmed.ovi.2005@gmail.com.
        </p>

        <h2 className="font-semibold text-lg mt-6">About the price data</h2>
        <p className="mt-2 text-sm sm:text-base">
          Market prices shown on this site are estimates and may change depending on market
          conditions.
        </p>

        <Link href="/" className="btn mt-8 bg-[#05893E] text-white border-none">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}