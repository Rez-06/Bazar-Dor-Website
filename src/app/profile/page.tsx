"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Avatar from "@/app/components/Avatar";
import { authClient } from "@/app/lib/auth-client";

export default function ProfilePage() {
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
          <div className="skeleton h-24 w-full rounded-2xl"></div>
          <div className="skeleton h-44 w-full rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const { name, email, image } = session.user;
  const value = edited ?? name;

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return toast.error("নাম খালি রাখা যাবে না");
    setSaving(true);
    const { error } = await authClient.updateUser({ name: value.trim() });
    setSaving(false);
    if (error) return toast.error(error.message || "আপডেট করা যায়নি");
    toast.success("প্রোফাইল আপডেট হয়েছে");
    setEdited(null);
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: () => toast.error("সাইন আউট করা যায়নি"),
      },
    });
  };

  return (
    <div className="bg-[#F0F5F0] flex-1 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-600">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

        <div className="mt-5 bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <Avatar name={name} image={image} size={56} />
            <div className="min-w-0">
              <div className="font-semibold text-lg truncate">{name}</div>
              <div className="text-sm text-gray-500 truncate">{email}</div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="btn btn-outline btn-error btn-sm w-full sm:w-auto"
          >
            সাইন আউট
          </button>
        </div>

        <form
          onSubmit={handleUpdate}
          className="mt-5 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 flex flex-col gap-4"
        >
          <h2 className="font-semibold">তথ্য</h2>
          <label className="flex flex-col gap-1 text-sm font-semibold">
            নাম
            <input
              value={value}
              onChange={(e) => setEdited(e.target.value)}
              className="input w-full font-normal"
            />
          </label>
          <button
            type="submit"
            disabled={saving}
            className="btn w-full bg-[#05893E] text-white border-none"
          >
            {saving && <span className="loading loading-spinner loading-sm"></span>}
            আপডেট
          </button>
        </form>
      </div>
    </div>
  );
}