import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemChild, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;
  const location = useLocation()
  const [open, setOpen] = useState(location.pathname.includes(path));
  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    setOpen(location.pathname.includes(path))
  }, [location.pathname, path])

  return (
    <>
      <StyledNavItem
        component={RouterLink}
        to={!item.children && path}
        sx={{
          ...(location.pathname.includes(path) ? {
            '&.active': {
              color: 'text.primary',
              bgcolor: 'action.selected',
              fontWeight: 'fontWeightBold',
            },
          } : {})
        }}
        disableGutters
        onClick={item.children && handleClick}
      >
        <StyledNavItemIcon >{icon && icon}</StyledNavItemIcon>

        <ListItemText disableTypography primary={title} />
        {info && info}
        {item.children ? (open ? <ExpandLess /> : <ExpandMore />) : <></>}
      </StyledNavItem>
      {item.children ?
        <Collapse in={open} timeout="auto" unmountOnExit>
          {item.children?.map((child, i) =>
            <StyledNavItemChild
              component={RouterLink}
              to={child.path}
              key={i}
              sx={{
                '&.active': {
                  color: 'text.primary',
                  '& .MuiBox-root': {
                    backgroundColor: 'primary.main',
                    transform: "scale(2)"
                  }
                }
              }}
              >
              <Box component='span' sx={{
                width: 4,
                height: 4,
                marginRight: 2,
                borderRadius: "50%",
                backgroundColor: "rgb(145, 158, 171)",
                transition: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              }} />
              <ListItemText disableTypography primary={child.title} />
            </StyledNavItemChild>)}
        </Collapse>
        : <></>}
    </>
  );
}
