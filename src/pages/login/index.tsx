import { useEffect, useState } from "preact/hooks";

import LoginCard from "@/components/login/card";
import Typography from "@/components/ui/typography";
import Dropdown from "@/components/ui/dropdown";
import InputField from "@/components/ui/inputfield";
import Button from "@/components/ui/button";
import { DEFAULT_BRAND, IS_MULTI_BRAND } from "@/brand-config";

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
    <div class="min-h-screen bg-page p-8">
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      <main id="main-content" role="main" className={"w-xl mx-auto my-auto"}>
        <Typography variant="h1" className="!text-primary mt-6 mb-7">
          Log into your <br /> account.
        </Typography>
        <Typography className="!text-inverse mb-5">
          Please enter your email for a one-time-only code
        </Typography>

        <form
          onSubmit={handleSubmit}
          aria-label="Login form"
          className={"flex flex-col gap-7 mb-7"}
        >
          <Dropdown options={[]} label="Select option" name="dropdown-option" />
          <InputField
            label="Email"
            placeholder="Enter your email"
            type="email"
            name="email"
            required
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
