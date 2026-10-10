"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { authClient } from "@/app/lib/auth-client";
import Avatar from "./Avatar";

const AuthButtons = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [open, setOpen] = useState(false);

    const handleSignOut = async () => {
        setOpen(false);
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

    if (isPending) {
        return (
        <div className="flex items-center gap-3">
            <div className="skeleton h-10 w-10 rounded-full"></div>
            <div className="skeleton h-4 w-16 hidden sm:block"></div>
        </div>
        );
    }

    if (!session) {
        return (
        <div className="flex items-center gap-3 sm:gap-5">
            <Link href="/sign-in" className="text-sm font-semibold hover:text-green-700">
            সাইন ইন
            </Link>
            <Link
            href="/sign-up"
            className="btn btn-sm sm:btn-md bg-[#05893E] text-white border-none shadow"
            >
            সাইন আপ
            </Link>
        </div>
        );
    }

    const { name, email, image } = session.user;

    return (
        <div className="relative">
        <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 cursor-pointer"
        >
            <Avatar name={name} image={image} size={36} />
            <span className="hidden sm:inline text-sm font-semibold max-w-32 truncate">{name}</span>
            <FontAwesomeIcon className="h-3" icon={faAngleDown} />
        </button>

        {open && (
            <div className="absolute right-0 mt-2 w-60 max-w-[calc(100vw-2rem)] rounded-2xl bg-white border border-gray-200 shadow-lg p-4 z-50">
            <div className="font-semibold truncate">{name}</div>
            <div className="text-xs text-gray-500 truncate">{email}</div>
            <hr className="my-3 border-gray-200" />
            <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="block py-2 text-sm hover:text-green-700"
            >
                আমার প্রোফাইল
            </Link>
            <button
                onClick={handleSignOut}
                className="w-full text-left py-2 text-sm text-red-600 cursor-pointer"
            >
                সাইন আউট
            </button>
            </div>
        )}
        </div>
    );
};

export default AuthButtons;