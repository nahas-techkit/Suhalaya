// component
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
// ----------------------------------------------------------------------


const navConfig = [
  {
    title: 'Dashboard',
    path: "/",
    icon: <HomeOutlinedIcon />,
  },
  {
    title: 'Companies',
    icon: < ApartmentIcon />,
    path: '/comapnies',
  },
  {
    title: 'Drivers',
    icon: <ContactsOutlinedIcon />,
    path: '/drivers',
  },

  {
    title: 'Trips',
    path: '/trips',
    icon: <ReceiptOutlinedIcon />,
  },

];

export default navConfig;
