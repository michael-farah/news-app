import {
  Card,
  CardContent,
  Skeleton,
  Box,
  CardActions,
} from "@mui/material";

function ArticleCardSkeleton() {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        m: 2,
      }}
    >
      <Skeleton variant="rectangular" height={140} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
        }}
      >
        <Skeleton variant="text" width="40%" />
        <CardActions disableSpacing>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} sx={{ ml: 1 }} />
        </CardActions>
      </Box>
    </Card>
  );
}

export default ArticleCardSkeleton;
