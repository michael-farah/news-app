import { useState } from "react";
import {
  Typography,
  Drawer,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Avatar,
  Stack,
} from "@mui/material";
import { useUser } from "../contexts/UserContext";
import api from "../../api";

function LoginForm({ open, onClose, submitCookie, logout }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser, user } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const users = await api.fetchUsers();
      const user = users.find((user) => user.username === username);

      if (user) {
        setUser(user);
        submitCookie(user);
        onClose();
      } else {
        setError("User not found");
      }
    } catch (err) {
      setError("Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, p: 3 }}>
        {user ? (
          <Stack direction="column" alignItems="center" sx={{ mt: 3 }}>
            <Avatar
              alt={user.username}
              src={user.avatar_url}
              style={{ border: "0.1px lightgrey solid" }}
            />
            <Typography variant="h5">{user.username}</Typography>
            <Button onClick={logout}>
              <Typography variant="h6" sx={{ mt: 5 }}>
                Log out
              </Typography>
            </Button>
          </Stack>
        ) : (
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </form>
        )}
      </Box>
    </Drawer>
  );
}

export default LoginForm;