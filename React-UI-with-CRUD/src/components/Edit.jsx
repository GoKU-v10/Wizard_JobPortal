import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Paper, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const initial = {
  postId: "",
  postProfile: "",
  reqExperience: 0,
  postTechStack: [],
  postDesc: "",
};

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [currId] = useState(location.state.id);

  useEffect(() => {
    const fetchInitialPosts = async (id) => {
      const response = await axios.get(`${API_BASE_URL}/jobPost/${id}`);
      console.log(response.data);
      setForm(response.data);
    };
    fetchInitialPosts(currId);
  }, [currId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedForm = {
      ...form,
      postId: Number(form.postId),
      reqExperience: Number(form.reqExperience),
      postTechStack: Array.isArray(form.postTechStack) ? form.postTechStack.filter(Boolean) : [],
      postProfile: form.postProfile || '',
      postDesc: form.postDesc || ''
    };
    console.log('Submitting update:', updatedForm);
    if (!updatedForm.postId || !updatedForm.postProfile || !updatedForm.postDesc) {
      alert('Please fill all required fields.');
      return;
    }
    if (!updatedForm.postTechStack || updatedForm.postTechStack.length === 0) {
      alert('Please select at least one skill.');
      return;
    }
    axios
      .put(`${API_BASE_URL}/jobPost`, updatedForm)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log('Backend error:', error.response?.data || error);
        alert('Update failed: ' + (error.response?.data?.message || error.message));
      });
    navigate("/");
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setForm({
        ...form,
        postTechStack: [...form.postTechStack, value],
      });
    } else {
      setForm({
        ...form,
        postTechStack: form.postTechStack.filter((skill) => skill !== value),
      });
    }
  };

  const skillSet = [
    {
      name: "Javascript",
    },
    {
      name: "Java",
    },
    {
      name: "Spring Framework",
    },
    {
      name: "Python",
    },
    {
      name: "Django",
    },
    {
      name: "Rust",
    },
    {
      name: "SpringBoot",
    },
    {
      name: "Hibernate",
    },
    {
      name: "PostgreSQL",
    },
    {
      name: "HTML5",
    },
    {
      name: "CSS3",
    },
    {
      name: "React",
    },
    {
      name: "NodeJs",
    },
    {
      name: "ExpressJs",
    },
    {
      name: "NextJs",
    },
    {
      name: "Three.JS",
    },
    {
      name: "Artificial Intelligence",
    },
    {
      name: "Machine Learning",
    },
  ];

  return (
    <Paper sx={{ padding: "1%" }} elevation={0}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Edit New Post
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            onChange={(e) => setForm({ ...form, postId: e.target.value })}
            label="Enter your Post ID"
            variant="outlined"
            value={form.postId}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
            label="Job-Profile"
            variant="outlined"
            value={form.postProfile}
          />
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) =>
              setForm({ ...form, reqExperience: e.target.value })
            }
            label="Years of Experience"
            variant="outlined"
            value={form.reqExperience}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, postDesc: e.target.value })}
            label="Job-desc"
            variant="outlined"
            value={form.postDesc}
          />
          <Box sx={{ margin: "1% auto" }}>
            <h3>Please mention required skills</h3>
            <ul>
              {skillSet.map(({ name }, index) => {
                return (
                  <li key={index}>
                    <div>
                      <div>
                        <input
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={name}
                          value={name}
                          checked={form.postTechStack.includes(name)}
                          onChange={handleChange}
                        />
                        <label htmlFor={`custom-checkbox-${index}`}>
                          {name}
                        </label>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Box>
          <Button
            sx={{ width: "50%", margin: "2% auto" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Edit;
