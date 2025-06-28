import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const initial = { postId:"",postProfile: "", reqExperience: 0, postTechStack: [], postDesc:"" };

const Create = () => {
  const skillSet = [
    { name: "Javascript" },
    { name: "Java" },
    { name: "Spring Framework" },
    { name: "Python" },
    { name: "Django" },
    { name: "Rust" },
    { name: "SpringBoot" },
    { name: "Hibernate" },
    { name: "PostgreSQL" },
    { name: "HTML5" },
    { name: "CSS3" },
    { name: "React" },
    { name: "NodeJs" },
    { name: "ExpressJs" },
    { name: "NextJs" },
    { name: "Three.JS" },
    { name: "Artificial Intelligence" },
    { name: "Machine Learning" },
  ];

  const navigate = useNavigate();
  const [form, setForm] = useState(initial);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/jobPost`, form);
      navigate('/');
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const { postId, postProfile, reqExperience, postDesc } = form;

  return (
    <Paper sx={{ padding:"1%"}} elevation={0}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Create New Post
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
            value={postId}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
            label="Job-Profile"
            variant="outlined"
            value={postProfile}
          />
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, reqExperience: e.target.value })}
            label="Years of Experience"
            variant="outlined"
            value={reqExperience}
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
            value={postDesc}
          />
          <Box className="skillset-container">
            <h3 className="skillset-title">Please mention required skills</h3>
            <table className="skillset-table">
              <thead>
                <tr>
                  <th> SkillSet</th>
                </tr>
              </thead>
              <tbody>
                {skillSet.map(({ name }, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={name}
                          value={name}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setForm(prevForm => {
                              let newTechStack = [...prevForm.postTechStack];
                              if (checked) {
                                if (!newTechStack.includes(name)) {
                                  newTechStack.push(name);
                                }
                              } else {
                                newTechStack = newTechStack.filter(skill => skill !== name);
                              }
                              return { ...prevForm, postTechStack: newTechStack };
                            });
                          }}
                        />
                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
          <Button
            sx={{ width: "50%", margin: "2% auto", backgroundColor: 'black' }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default Create;
