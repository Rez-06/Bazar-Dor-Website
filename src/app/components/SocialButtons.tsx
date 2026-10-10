"use client";
import { useState } from "react";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { authClient } from "@/app/lib/auth-client";

type Provider = "google" | "github";

const SocialButtons = () => {
  const [loading, setLoading] = useState<Provider | null>(null);

  const handle = async (provider: Provider) => {
    setLoading(provider);
    const { error } = await authClient.signIn.social({ provider, callbackURL: "/" });
    if (error) {
      toast.error(error.message || "সোশ্যাল লগইন করা যায়নি");
      setLoading(null);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 my-4">
        <hr className="flex-1 border-gray-200" />
        <span className="text-xs text-gray-500">অথবা</span>
        <hr className="flex-1 border-gray-200" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          disabled={loading !== null}
          onClick={() => handle("google")}
          className="btn btn-outline border-gray-200 text-sm"
        >
          {loading === "google" ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <FontAwesomeIcon icon={faGoogle} />
          )}
          Google দিয়ে চালিয়ে যান
        </button>
        <button
          type="button"
          disabled={loading !== null}
          onClick={() => handle("github")}
          className="btn btn-outline border-gray-200 text-sm"
        >
          {loading === "github" ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <FontAwesomeIcon icon={faGithub} />
          )}
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>
    </>
  );
};

export default SocialButtons;