import React, { useState } from 'react';
import { 
  Box, Typography, Stack, Select, MenuItem, Checkbox, 
  FormControlLabel, IconButton, Button, Drawer, Divider 
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import FilterSidebar from './FilterSidebar'; 

const ProductListHeader = ({ activeFilters, onFilterToggle }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ 
      p: { xs: 1, md: 2 }, 
      bgcolor: 'background.paper', 
      border: '1px solid',
      borderColor: 'divider', 
      borderRadius: '6px',
      mb: 2,
    }}>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1">
          12,011 items in <b>Mobile accessory</b>
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Verified only" />
          <Select defaultValue="Featured" size="small" sx={{ height: '32px', minWidth: '120px' }}>
            <MenuItem value="Featured">Featured</MenuItem>
            <MenuItem value="Newest">Newest items</MenuItem>
          </Select>
          <Stack direction="row" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '4px', overflow: 'hidden' }}>
            <IconButton size="small" sx={{ borderRadius: 0, borderRight: '1px solid', borderColor: 'divider' }}>
              <GridViewIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ borderRadius: 0, bgcolor: 'action.selected' }}>
              <ViewListIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ display: { xs: 'flex', md: 'none' } }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Button 
            variant="outlined" 
            onClick={handleDrawerToggle(true)}
            endIcon={<FilterListIcon />}
            sx={{ textTransform: 'none', color: 'text.primary', borderColor: 'divider', fontWeight: 400, height: '32px' }}
          >
            Filter
          </Button>
          <Select defaultValue="Featured" size="small" sx={{ height: '32px', minWidth: '110px', fontWeight: 400 }}>
            <MenuItem value="Featured">Featured</MenuItem>
            <MenuItem value="Newest">Newest items</MenuItem>
          </Select>
        </Stack>
        
        <Stack direction="row" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '4px' }}>
          <IconButton size="small" sx={{ borderRadius: 0, borderRight: '1px solid', borderColor: 'divider' }}>
            <GridViewIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ borderRadius: 0, bgcolor: 'action.selected' }}>
            <ViewListIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle(false)}
        PaperProps={{
          sx: { width: '280px', p: 2 }
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Filters</Typography>
          <IconButton onClick={handleDrawerToggle(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ mb: 1 }} />
        
        <FilterSidebar 
          activeFilters={activeFilters} 
          onFilterToggle={onFilterToggle} 
          isMobileDrawer={true} 
        />
        
        <Box sx={{ mt: 3 }}>
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleDrawerToggle(false)}
            sx={{ textTransform: 'none' }}
          >
            Show Results
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ProductListHeader;