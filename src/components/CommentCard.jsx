import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Snackbar,
  Slide,
} from "@mui/material";
import timeSince from "../utils/timeSince";
import api from "../../api";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import CommentMenu from "./CommentMenu";

const CommentCard = ({ comment, setComments }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [showError, setShowError] = useState(false);
  const { user } = useUser();

  const handleDelete = async () => {
    try {
      setComments((prevComments) =>
        prevComments.filter((currentComment) => currentComment !== comment),
      );
      await api.deleteComment(comment.comment_id);
    } catch (err) {
      setComments((prevComments) => [...prevComments, comment]);
      setCommentError("Error deleting comment, please try again.");
      setShowError(true);
      console.error("Error deleting comment:", err);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const users = await api.fetchUsers();
      const userDetails = users.find(
        (user) => user.username === comment.author,
      );
      setUserDetails(userDetails);
    };

    fetchUserDetails();
  }, [comment.author]);

  return (
    <Card>
      <CardHeader
        avatar={
          userDetails ? (
            <Avatar
              alt={comment.author}
              src={userDetails.avatar_url}
              style={{ border: "0.1px lightgrey solid" }}
            />
          ) : (
            <Avatar />
          )
        }
        title={comment.author}
        subheader={timeSince(comment.created_at)}
        action={
          user &&
          user.username === comment.author && (
            <CommentMenu comment={comment} handleDelete={handleDelete} />
          )
        }
      />
      <CardContent>
        <Typography sx={{ p: "20px 0" }}>{comment.body}</Typography>
        <Snackbar
          open={showError}
          onClose={() => setShowError(false)}
          TransitionComponent={Slide}
          message={commentError}
          key={Date.now()}
          autoHideDuration={1200}
        />
      </CardContent>
    </Card>
  );
};

export default CommentCard;