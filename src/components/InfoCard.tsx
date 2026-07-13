import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  children: ReactNode;
}

export default function InfoCard({ title, children }: InfoCardProps) {
  return (
    <Card
      sx={{
        minWidth: 175,
      }}
    >
      <CardContent>
        <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}
