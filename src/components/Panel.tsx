import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material/styles";

interface PanelProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export default function Panel({
  title,
  subtitle,
  action,
  children,
  sx,
}: PanelProps) {
  return (
    <Box
      component="section"
      sx={[
        {
          p: 2,
          background: "white",
          border: "2px solid grey",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {(title || action) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box>
            {title && (
              <Typography
                component="h2"
                sx={{ color: "text.primary", fontSize: 20, fontWeight: 700 }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {action}
        </Box>
      )}
      {children}
    </Box>
  );
}
