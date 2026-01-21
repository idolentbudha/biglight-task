import { useEffect, useState } from "preact/hooks";

import LoginCard from "@/components/login/card";
import Typography from "@/components/ui/typography";
import Dropdown from "@/components/ui/dropdown";
import InputField from "@/components/ui/inputfield";
import Button from "@/components/ui/button";
import { DEFAULT_BRAND } from "@/brand-config";
import CloseIcon from "@mui/icons-material/Close";

export function Login() {
  const [currentTheme, setCurrentTheme] = useState(DEFAULT_BRAND);
  useEffect(() => {
    //set default brand from config
    document.body.setAttribute("data-theme", DEFAULT_BRAND);
  }, []);

  const switchBrand = () => {
    const newTheme = currentTheme === "brand-a" ? "brand-b" : "brand-a";
    document.body.setAttribute("data-theme", newTheme);
    setCurrentTheme(newTheme);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    alert("Code Sent!");
  };

  const handlePasswordLogin = () => {
    alert("Redirecting to password login...");
  };

  return (
    <div class="min-h-screen bg-page">
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      <main
        id="main-content"
        role="main"
        class="px-20 sm:px-48 py-20 sm:max-w-120 sm:mx-auto"
      >
        <div className="w-full flex justify-end my-24 px-2">
          <button
            onClick={() => alert("Close button clicked")}
            className="bg-transparent border-0 cursor-pointer p-0"
            aria-label="Close login form"
          >
            <CloseIcon className="fill-icon-action-active" fontSize="medium" />
          </button>
        </div>
        <div className="flex flex-col gap-5 mb-7">
          <Typography variant="h1" className="text-primary" weight="regular">
            Log into your <br className="hidden md:inline" />
            account
          </Typography>
          <Typography className="text-inverse">
            Please enter your email for a one-time-only code
          </Typography>
        </div>

        <form
          onSubmit={handleSubmit}
          aria-label="Login form"
          className="flex flex-col gap-7 mb-7"
        >
          <Dropdown
            label="Customer type"
            name="dropdown-option"
            options={[
              { label: "Individual", value: "individual" },
              { label: "Business", value: "business" },
            ]}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            type="email"
            name="email"
            showStateIcon={false}
          />

          <div className="flex flex-col gap-5 mb-10">
            <Button label="Continue" variant="secondary" type="submit" />
            <Button
              label="Login with your password"
              variant="tertiary"
              type="button"
              onClick={handlePasswordLogin}
            />
          </div>
        </form>

        <LoginCard />
      </main>
    </div>
  );
}
