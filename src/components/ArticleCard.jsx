import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  CardActions,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import api from "../../api";

function ArticleCard({ article }) {
  const [votes, setVotes] = useState(article.votes);

  const handleVote = async (increment) => {
    try {
      await api.patchVotes(`${article.article_id}`, increment);
      setVotes(votes + increment);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={article.article_img_url}
        alt={article.title}
      />
      <CardContent>
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
        <Typography variant="body2" color="text.secondary">
          Votes: {votes}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => handleVote(1)}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="remove" onClick={() => handleVote(-1)}>
          <ThumbDownAltIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ArticleCard;
