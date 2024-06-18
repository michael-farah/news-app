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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

function ArticleDetails({ article, votes, handleVote }) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      sx={{ minHeight: "100vh", mr: 2, mt: 2 }}
    >
      <Grid item xs={3}>
        <Card sx={{ maxWidth: 1000 }}>
          <CardContent>
            <Typography sx={{ mb: 4 }} variant="h4" textAlign={"center"}>
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
          <Stack alignItems={"center"}>
            <Typography variant="body2" color="text.secondary">
              Votes: {votes[article.article_id]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comments: {article.comment_count}
            </Typography>
            <CardActions>
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
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ArticleDetails;