import { Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import useAuth from "../hook/useAuth";
import { Link as RouterLink } from "react-router-dom";
import Topbar from "../scenes/global/Topbar";

RoleBasedGuard.propTypes = {
  hasContent: PropTypes.bool,
  roles: PropTypes.array,
  children: PropTypes.node,
};
function RoleBasedGuard({ hasContent, roles, children }) {
  const { user } = useAuth();
  const currentRole = user?.role;
  console.log(currentRole);
  if (typeof roles !== "undefined" && !roles.includes(currentRole)) {
    return hasContent ? (
      <main className="content">
        <Topbar />
        <Container sx={{ alignItems: "center" }}> 
          <Stack
            sx={{
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h3" paragraph>
              Permission Denied
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              You do not have permission to access this page
            </Typography>
            <Button
              LinkComponent={RouterLink}
              to={
                currentRole === "driver" ? `/driver/profile/${user?._id}` : "/"
              }
              sx={{ mt: 2 }}
              variant="contained"
            >
              Go to {currentRole === "admin" ? "Dashboard" : "Profile"}
            </Button>
          </Stack>
        </Container>
      </main>
    ) : null;
  }

  return <> {children} </>;
}

export default RoleBasedGuard;
