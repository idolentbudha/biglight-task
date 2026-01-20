import { ComponentChildren } from "preact";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import { Stack } from "@mui/material";
import Button from "../button";

export interface CardProps {
  children?: ComponentChildren;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  const cardClasses = `rounded-2xl overflow-hidden bg-primary ${className}`;

  return (
    <MuiCard className={cardClasses}>
      <CardContent className="p-6">
        {children && <div className="text-text-body">{children}</div>}
      </CardContent>
    </MuiCard>
  );
}
