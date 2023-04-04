// @mui
import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledNavItem = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  margin: theme.spacing(.5)
}));
export const StyledNavItemChild = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  margin:theme.spacing(.1)
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
