import Card from "../ui/card";
import Typography from "../ui/typography";
import Button from "../ui/button";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoBanner from "@assets/images/login-banner.svg";
export default function LoginCard({ className = "" }: { className?: string }) {
  return (
    <Card className={`bg-primary ${className}`}>
      <div className="flex flex-row items-center justify-between gap-x-24">
        <div className="flex flex-2 flex-col gap-6">
          <Typography variant="h2" className="font-medium" color="inverse">
            Join the <br /> family.
          </Typography>
          <Button
            label="Become a member"
            size="sm"
            startIcon={<PersonOutlineOutlinedIcon aria-label="User icon" />}
          />
        </div>
        <div className="flex flex-1">
          <img
            src={LogoBanner}
            alt="Family membership promotional banner with welcoming design"
            role="img"
          />
        </div>
      </div>
    </Card>
  );
}
