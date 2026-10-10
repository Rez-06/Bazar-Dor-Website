"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [edited, setEdited] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isPending && !session) router.replace("/sign-in");
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <div className="bg-[#F0F5F0] flex-1 px-4 py-10">
        <div className="mx-auto w-full max-w-3xl flex flex-col gap-4">
          <div className="skeleton h-8 w-48"></div>
          <div className="skeleton h-44 w-full rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const value = edited ?? session.user.name;

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return toast.error("নাম খালি রাখা যাবে না");
    setSaving(true);
    const { error } = await authClient.updateUser({ name: value.trim() });
    setSaving(false);
    if (error) return toast.error(error.message || "আপডেট করা যায়নি");
    toast.success("প্রোফাইল আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <div className="bg-[#F0F5F0] flex-1 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold">তথ্য আপডেট করুন</h1>
        <form onSubmit={handleUpdate} className="mt-5 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-semibold">
            নাম
            <input value={value} onChange={(e) => setEdited(e.target.value)} className="input w-full font-normal" />
          </label>
          <button type="submit" disabled={saving} className="btn w-full bg-[#05893E] text-white border-none">
            {saving && <span className="loading loading-spinner loading-sm"></span>}
            আপডেট
          </button>
        </form>
      </div>
    </div>
  );
}