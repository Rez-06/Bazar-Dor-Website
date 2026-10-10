"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import SocialButtons from "@/app/components/SocialButtons";
import { authClient } from "@/app/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) router.replace("/");
  }, [session, router]);

  const fail = (message: string) => {
    setError(message);
    toast.error(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return fail("নাম দিন");
    if (!email.trim()) return fail("ইমেইল দিন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("পাসওয়ার্ড দুটি মিলছে না");

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (error) return fail(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
    router.push("/sign-in");
  };

  return (
    <div className="bg-[#F0F5F0] flex-1 px-4 py-10">
      <div className="mx-auto w-full max-w-md text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-sm text-gray-600 mt-1">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="mx-auto w-full max-w-md mt-6 bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-semibold">
            নাম
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="যেমন: রহিম উদ্দিন"
              className="input w-full font-normal"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-semibold">
            ইমেইল
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input w-full font-normal"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-semibold">
            পাসওয়ার্ড
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="input w-full font-normal pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 cursor-pointer"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-4" />
              </button>
            </div>
          </label>

          <label className="flex flex-col gap-1 text-sm font-semibold">
            পাসওয়ার্ড নিশ্চিত করুন
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="আবার লিখুন"
                className="input w-full font-normal pr-11"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 cursor-pointer"
              >
                <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} className="h-4" />
              </button>
            </div>
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-[#05893E] text-white border-none"
          >
            {loading && <span className="loading loading-spinner loading-sm"></span>}
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <SocialButtons />

        <p className="text-center text-sm mt-4">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/sign-in" className="text-[#05893E] font-semibold">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <div className="text-center mt-6">
        <Link href="/" className="text-sm text-gray-500 hover:text-green-700">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}