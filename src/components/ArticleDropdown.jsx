import { useMemo } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import {
  Sort as SortIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";

const getOrderText = (dropdown, order) => {
  const orderTextMap = {
    created_at: order === "asc" ? "Oldest" : "Newest",
    comment_count: order === "asc" ? "Fewest comments" : "Most comments",
    votes: order === "asc" ? "Least popular" : "Most popular",
  };
  return orderTextMap[dropdown] || "";
};

function ArticleDropdown({ sortBy, setSortBy, order, setOrder }) {
  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleToggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const orderText = useMemo(
    () => getOrderText(sortBy, order),
    [sortBy, order],
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center', mb: 2 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by-select"
          value={sortBy}
          label="Sort By"
          onChange={handleChange}
        >
          <MenuItem value="created_at">Date</MenuItem>
          <MenuItem value="comment_count">Comments</MenuItem>
          <MenuItem value="votes">Votes</MenuItem>
        </Select>
      </FormControl>
      <IconButton onClick={handleToggleOrder} sx={{ ml: 1 }}>
        <SortIcon />
        {order === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </IconButton>
      <Typography variant="body2" sx={{ ml: 1 }}>
        {orderText}
      </Typography>
    </Box>
  );
}

export default ArticleDropdown;