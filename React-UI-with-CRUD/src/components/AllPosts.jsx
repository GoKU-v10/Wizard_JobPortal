
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
  Javascript as JsIcon,
  Html as HtmlIcon,
  Css as CssIcon,
  Storage as DbIcon,
  Api as ApiIcon,
  Code as CodeIcon
} from '@mui/icons-material';

import {
  Box,
  Card,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AllPosts = () => {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (postId) => {
    navigate("/edit", { state: { postId } });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/jobPosts/keyword/${query.toLowerCase()}`);
        if (isMounted) setPosts(response.data);
      } catch (error) {
        console.error("Search failed:", error);
        try {
          const response = await axios.get(`${API_BASE_URL}/jobPosts`);
          if (isMounted) setPosts(response.data);
        } catch (err) {
          console.error("Failed to fetch all posts:", err);
        }
      }
    };

    const fetchInitialPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/jobPosts`);
        if (isMounted) setPosts(response.data);
      } catch (err) {
        console.error("Failed to fetch initial posts:", err);
      }
    };

    if (query.length === 0) {
      fetchInitialPosts();
    } else {
      fetchPosts();
    }

    return () => {
      isMounted = false;
    };
  }, [query]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${API_BASE_URL}/jobPosts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((p) => p.postId !== postId));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <>
      <Grid container spacing={2} sx={{ margin: "2%" }}>
        <Grid item xs={12} md={12} lg={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              margin: '2rem 0',
              padding: '0 1rem'
            }}
          >
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              placeholder="Search job posts..."
              variant="outlined"
              sx={{
                width: '100%',
                maxWidth: '800px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.300',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                }
              }}
              fullWidth
              onChange={(e) => setQuery(e.target.value)}
            />
          </Box>
        </Grid>
        {posts && posts.length === 0 ? (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '300px',
            width: '100%',
            textAlign: 'center'
          }}>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
              No job posts found
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Try adjusting your search or create a new job post
            </Typography>
          </Box>
        ) : posts && posts.map((p) => {
          return (
            <Grid key={p.postId} item xs={12} md={6} lg={4}>
              <Card sx={{
                padding: { xs: "1rem", sm: "2rem" },
                margin: { xs: "0.5rem", sm: "1rem" },
                height: "auto",
                overflow: "hidden",
                width: { xs: "90%", sm: "84%" },
                backgroundColor: "black",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  backgroundColor: '#333',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                  '& .MuiTypography-root': {
                    color: '#fff'
                  }
                }
              }}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "2rem", fontWeight: "600", fontFamily: "sans-serif", color: "whitesmoke" }}
                >
                  {p.postProfile}
                </Typography>
                <Typography sx={{ color: "whitesmoke", marginTop: "2%", fontFamily: "cursive" }} variant="body1" >
                  Description: {p.postDesc}
                </Typography>
                <br />
                <br />
                <Typography variant="h6" sx={{ fontFamily: "unset", fontWeight: "400", color: "whitesmoke" }}>
                  Experience: {p.reqExperience} years
                </Typography>
                <Typography sx={{ fontFamily: "unset", fontWeight: "bold", color: "whitesmoke", marginTop: "2rem" }} gutterBottom variant="body1">Skills:</Typography>
                <Box sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  mt: 1
                }}>
                  {p.postTechStack.map((s, i) => (
                    <Box
                      key={i}
                      sx={{
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        px: '0.75rem',
                        py: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        '& .MuiTypography-root': {
                          color: 'black',
                          fontWeight: '500'
                        }
                      }}
                    >
                      {s.toLowerCase().includes('java') ? <JsIcon fontSize="small" sx={{ color: '#f0db4f' }} /> :
                        s.toLowerCase().includes('html') ? <HtmlIcon fontSize="small" sx={{ color: '#e34c26' }} /> :
                          s.toLowerCase().includes('css') ? <CssIcon fontSize="small" sx={{ color: '#2965f1' }} /> :
                            s.toLowerCase().includes('sql') ? <DbIcon fontSize="small" sx={{ color: '#00758f' }} /> :
                              s.toLowerCase().includes('api') ? <ApiIcon fontSize="small" sx={{ color: '#6bd134' }} /> :
                                <CodeIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
                      <Typography variant="body2" sx={{ color: "whitesmoke" }}>
                        {s}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "auto", gap: "1rem" }}>
                  <DeleteIcon
                    onClick={() => handleDelete(p.postId)}
                    sx={{
                      color: "whitesmoke",
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: 'error.main',
                        transform: 'scale(1.1)'
                      }
                    }}
                  />
                  <EditIcon
                    onClick={() => handleEdit(p.postId)}
                    sx={{
                      color: "whitesmoke",
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'scale(1.1)'
                      }
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  )
}

export default AllPosts
