import React from "react";
import { List, ListItem, ListItemText, Drawer, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <List sx={{ bgcolor: 'grey.800' }}>
        <ListItem button onClick={() => router.push("/student")} sx={{ cursor: 'pointer' }}>
          <ListItemText 
            primary={<Typography variant="subtitle1"
              color="common.white">Students Page</Typography>} 
          />
        </ListItem>
        <ListItem button onClick={handleLogout} sx={{ cursor: 'pointer' }}>
          <ListItemText 
            primary={<Typography variant="subtitle1" color="error">Logout</Typography>}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
