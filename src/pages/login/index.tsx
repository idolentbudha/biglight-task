import { useEffect, useState } from "preact/hooks";

import LoginCard from "@components/login/LoginCard";
import Typography from "@/components/Typography";
import Dropdown from "@/components/Dropdown";
import InputField from "@/components/InputField";
import Button from "@/components/ui/Button";

export function Login() {
  const [currentTheme, setCurrentTheme] = useState("brand-a");
  useEffect(() => {
    //set brand-a as the default theme
    document.body.setAttribute("data-theme", "brand-a");
  }, []);

  const switchBrand = () => {
    const newTheme = currentTheme === "brand-a" ? "brand-b" : "brand-a";
    document.body.setAttribute("data-theme", newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    <div class="min-h-screen bg-page p-8">
      <Typography variant="h1" className="!text-primary mt-6 mb-7">
        Log into your <br /> account.
      </Typography>
      <Typography className="!text-inverse mb-5">
        Please enter your email for a one-time-only code
      </Typography>
      <div className={"flex flex-col gap-5 mb-5"}>
        <Dropdown options={[]} />
        <InputField label="Email" placeholder="Enter your email" />
        <Button
          label="Continue"
          variant="secondary"
          onClick={() => alert("Code Sent!")}
        />
        <Button
          label="Login with your password"
          variant="tertiary"
          onClick={() => alert("Code Sent!")}
        />
      </div>
      <LoginCard />
    </div>
  );
}
