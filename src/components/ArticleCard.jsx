import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  CardActions,
  ButtonBase,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

function ArticleCard({ article, votes, handleVote }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <ButtonBase
        component={Link}
        to={`/articles/${article.article_id}`}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <CardMedia
          component="img"
          height="140"
          image={article.article_img_url}
          alt={article.title}
          sx={{ width: "100%" }}
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
            Votes: {votes[article.article_id]}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions disableSpacing>
        <IconButton
          aria-label="like"
          onClick={() => handleVote(article.article_id, 1)}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          aria-label="dislike"
          onClick={() => handleVote(article.article_id, -1)}
        >
          <ThumbDownAltIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ArticleCard;