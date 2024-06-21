import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Sort as SortIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";
import { fetchArticles } from "../../api";

const getOrderText = (dropdown, order) => {
  const orderTextMap = {
    created_at: order === "asc" ? "Oldest first" : "Newest first",
    comment_count:
      order === "asc" ? "Fewest comments first" : "Most comments first",
    votes: order === "asc" ? "Fewest votes first" : "Most votes first",
  };
  return orderTextMap[dropdown] || "";
};

function ArticleDropdown({ setArticles }) {
  const [dropdown, setDropdown] = useState("created_at");
  const [order, setOrder] = useState("desc");

  const { slug: topic } = useParams();

  const fetchAndSetArticles = useCallback(
    async (sortField, sortOrder) => {
      try {
        const articles = await fetchArticles(topic, sortField, sortOrder);
        setArticles(articles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    },
    [setArticles, topic],
  );

  useEffect(() => {
    fetchAndSetArticles(dropdown, order);
  }, [dropdown, order, fetchAndSetArticles]);

  const handleChange = (event) => {
    setDropdown(event.target.value);
  };

  const handleToggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const orderText = useMemo(
    () => getOrderText(dropdown, order),
    [dropdown, order],
  );

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FormControl sx={{ m: 1, ml: 2, minWidth: 120 }}>
        <InputLabel id="sort-by-dropdown">Sort By</InputLabel>
        <Select
          labelId="sort-by-dropdown"
          id="sort-by-dropdown"
          value={dropdown}
          label="Sort By"
          onChange={handleChange}
        >
          <MenuItem value="created_at">Date</MenuItem>
          <MenuItem value="comment_count">Comments</MenuItem>
          <MenuItem value="votes">Votes</MenuItem>
        </Select>
      </FormControl>
      <IconButton onClick={handleToggleOrder} sx={{ ml: 2 }}>
        <SortIcon />
        {order === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        <Typography sx={{ ml: 1 }}>{orderText}</Typography>
      </IconButton>
    </div>
  );
}

export default ArticleDropdown;