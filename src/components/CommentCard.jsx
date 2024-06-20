import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
} from "@mui/material";
import timeSince from "../utils/timeSince";
import api from "../../api";
import { useEffect, useState } from "react";

const CommentCard = ({ comment }) => {
  const [userDetails, setUserDetails] = useState(null);

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
      />
      <CardContent>
        <Typography sx={{ p: "20px 0" }}>{comment.body}</Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;