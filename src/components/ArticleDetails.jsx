import { useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import api from "../../api";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  CardActions,
  Grid,
  Stack,
  Button,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentsSection from "./CommentsSection";
import CommentForm from "./CommentForm";

function ArticleDetails() {
  const [expanded, setExpanded] = useState(false);
  const { article, comments: initialComments } = useLoaderData();
  const { state } = useLocation();
  const [votes, setVotes] = useState(state?.votes || article.votes);
  const [comments, setComments] = useState(initialComments);

  const handleVote = async (increment) => {
    setVotes((prevVotes) => prevVotes + increment);
    try {
      await api.patchVotes(article.article_id, increment);
    } catch (err) {
      console.error("Error updating votes:", err);
      setVotes((prevVotes) => prevVotes - increment);
    }
  };

  const handleCommentPosted = (newComment) => {
    if (newComment) {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  };

  if (!article) {
    return <CircularProgress aria-busy aria-label="Loading" />;
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      sx={{ minHeight: "100vh", mr: 2, mt: 2 }}
    >
      <Grid item xs={3}>
        <Card sx={{ maxWidth: 1000 }}>
          <CardContent>
            <Typography sx={{ mb: 4 }} variant="h4" textAlign="center">
              {article.title}
            </Typography>
            <Button sx={{ mb: 1 }} variant="contained" size="small">
              <Typography variant="body2" color="white">
                {article.topic}
              </Typography>
            </Button>
            <CardMedia
              component="img"
              height="100%"
              sx={{ maxWidth: 600, mb: 2 }}
              image={article.article_img_url}
              alt={article.title}
            />
            <Typography variant="body2" color="text.secondary">
              By {article.author} on{" "}
              {new Date(article.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {article.body}
            </Typography>
          </CardContent>
          <Stack alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Votes: {votes}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comments: {comments.length}
            </Typography>
            <CardActions>
              <IconButton aria-label="like" onClick={() => handleVote(1)}>
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="dislike" onClick={() => handleVote(-1)}>
                <ThumbDownAltIcon />
              </IconButton>
            </CardActions>
          </Stack>
          <CardActions>
            <Button
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show comments"
            >
              <ExpandMoreIcon /> {expanded ? "Hide" : "Show"} Comments
            </Button>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <CommentForm
                articleId={article.article_id}
                onCommentPosted={handleCommentPosted}
              />
              <CommentsSection comments={comments} />
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ArticleDetails;
