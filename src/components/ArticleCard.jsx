import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  CardActions,
  ButtonBase,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import api from "../../api";

function ArticleCard({ article }) {
  const [votes, setVotes] = useState(article.votes);

  const handleVote = async (increment) => {
    setVotes((prevVotes) => prevVotes + increment);
    try {
      await api.patchVotes(article.article_id, increment);
    } catch (err) {
      console.error("Error updating votes:", err);
      setVotes((prevVotes) => prevVotes - increment);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        m: 2,
      }}
    >
      <ButtonBase
        component={Link}
        to={`/articles/${article.article_id}`}
        state={{ votes }}
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: "100%",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={article.article_img_url}
          alt={article.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            By {article.author} on{" "}
            {new Date(article.created_at).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Topic: {article.topic}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Comments: {article.comment_count}
          </Typography>
        </CardContent>
      </ButtonBase>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ pl: 1 }}>
          Votes: {votes}
        </Typography>
        <CardActions disableSpacing>
          <IconButton aria-label="like" onClick={() => handleVote(1)}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="dislike" onClick={() => handleVote(-1)}>
            <ThumbDownAltIcon />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
}

export default ArticleCard;