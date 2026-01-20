import Card from "../Card";
import Typography from "../Typography";
import Button from "../ui/Button";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoBanner from "../../assets/images/login-banner.svg";
export default function LoginCard() {
  return (
    <Card>
      <div className="flex flex-row items-center justify-between gap-8 py-8 px-8">
        <div className="flex flex-col gap-28">
          <Typography
            variant="h1"
            className="mb-4 text-text-action-on-secondary"
          >
            Join the <br /> family.
          </Typography>
          <Button
            label="Become a member"
            startIcon={<PersonOutlineOutlinedIcon />}
          />
        </div>
        <img src={LogoBanner} alt="login banner" />
      </div>
    </Card>
  );
}
