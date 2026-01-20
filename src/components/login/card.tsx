import Card from "../ui/card";
import Typography from "../ui/typography";
import Button from "../ui/button";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoBanner from "@assets/images/login-banner.svg";
export default function LoginCard() {
  return (
    <Card>
      <div className="flex flex-row items-center justify-between gap-8 py-8 px-8">
        <div className="flex flex-col gap-28">
          <Typography
            variant="h2"
            className="mb-4 text-text-action-on-secondary"
          >
            Join the <br /> family.
          </Typography>
          <Button
            label="Become a member"
            startIcon={<PersonOutlineOutlinedIcon aria-label="User icon" />}
          />
        </div>
        <img
          src={LogoBanner}
          alt="Family membership promotional banner with welcoming design"
          role="img"
        />
      </div>
    </Card>
  );
}
