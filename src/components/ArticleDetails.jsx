import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CircularProgress,
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
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentsSection from "./CommentsSection";
import CommentForm from "./CommentForm";
import { fetchArticleById, fetchCommentsByArticleId, patchVotes } from "../../api";

function ArticleDetails() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [voteChange, setVoteChange] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetchArticleById(articleId),
      fetchCommentsByArticleId(articleId),
    ])
      .then(([articleData, commentsData]) => {
        // API returns { article: {...} } and { comments: [...] }
        setArticle(articleData.article);
        setComments(commentsData.comments);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching article details:", err);
        setError("Failed to load article details. The backend API might be down.");
        setLoading(false);
      });
  }, [articleId]);

  const handleVote = async (increment) => {
    setVoteChange((current) => current + increment);
    try {
      await patchVotes(article.article_id, increment);
    } catch (err) {
      console.error("Error updating votes:", err);
      setVoteChange((current) => current - increment);
      // Optionally show an error to the user
    }
  };

  const handleCommentPosted = (newComment) => {
    if (newComment) {
      setComments((prevComments) => [newComment.comment, ...prevComments]);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography>Loading article...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <Typography>Article not found.</Typography>
      </Container>
    );
  }

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
            <Button
              sx={{ mb: 1 }}
              variant="contained"
              size="small"
              component={Link}
              to={`/topic/${article.topic}`}
            >
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
            <Typography variant="body1" sx={{mt: 2}}>
              {article.body}
            </Typography>
          </CardContent>
          <Stack alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Votes: {article.votes + voteChange}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comments: {comments.length}
            </Typography>
            <CardActions>
              <IconButton aria-label="like" onClick={() => handleVote(1)} disabled={voteChange === 1}>
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="dislike" onClick={() => handleVote(-1)} disabled={voteChange === -1}>
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
              <ExpandMoreIcon sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}/>
              <Typography sx={{ml: 1}}>{expanded ? "Hide" : "Show"} Comments</Typography>
            </Button>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <CommentForm
                articleId={article.article_id}
                onCommentPosted={handleCommentPosted}
              />
              <CommentsSection comments={comments} setComments={setComments} />
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ArticleDetails;
