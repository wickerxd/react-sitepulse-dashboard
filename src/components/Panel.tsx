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
          p: { xs: 2, md: 2.5 },
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 0,
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
            flexWrap: "wrap",
            gap: 1,
            rowGap: 1,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            {title && (
              <Typography
                component="h2"
                sx={{
                  color: "text.primary",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
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
