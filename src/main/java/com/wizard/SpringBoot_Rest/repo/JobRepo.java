package com.wizard.SpringBoot_Rest.repo;

import com.wizard.SpringBoot_Rest.model.JobPost;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
public class JobRepo {
    // ArrayList to store JobPost objects
    private List<JobPost> jobs = new ArrayList<>(Arrays.asList(
            new JobPost(1, "Java Developer", "Must have good experience in core Java and advanced Java", 2,
                    List.of("Core Java", "J2EE", "Spring Boot", "Hibernate")),
            new JobPost(2, "Frontend Developer", "Experience in building responsive web applications using React", 3,
                    List.of("HTML", "CSS", "JavaScript", "React")),
            new JobPost(3, "Data Scientist", "Strong background in machine learning and data analysis", 4,
                    List.of("Python", "Machine Learning", "Data Analysis")),
            new JobPost(4, "Network Engineer", "Design and implement computer networks for efficient data communication", 5,
                    List.of("Networking", "Cisco", "Routing", "Switching")),
            new JobPost(5, "Mobile App Developer", "Experience in mobile app development for iOS and Android", 3,
                    List.of("iOS Development", "Android Development", "Mobile App"))
    ));

    // method to return all JobPosts
    public List<JobPost> getAllJobs() {
        return jobs;
    }

    // method to save a job post object into arrayList
    public void addJob(JobPost job) {
        jobs.add(job);
    }

    public JobPost getJob(int postID) {
        for(JobPost job: jobs){
            if(job.getPostId()== postID)
                return job;
        }
        return null;
    }

    public void updateJob(JobPost jobPost) {
        for (JobPost jobPost1: jobs){
            if(jobPost1.getPostId()==jobPost.getPostId()) {
                jobPost1.setPostDesc(jobPost.getPostDesc());
                jobPost1.setPostProfile(jobPost.getPostProfile());
                jobPost1.setReqExperience(jobPost.getReqExperience());
                jobPost1.setPostTechStack(jobPost.getPostTechStack());
            }
        }
    }

    public void deleteJob(int postID) {
        jobs.removeIf(jobPost -> jobPost.getPostId() == postID);
    }

    public List<JobPost> findByKeyword(String keyword) {
        List<JobPost> result = new ArrayList<>();
        for (JobPost job : jobs) {
            if (job.getPostProfile().toLowerCase().contains(keyword.toLowerCase()) ||
                job.getPostDesc().toLowerCase().contains(keyword.toLowerCase())) {
                result.add(job);
            }
        }
        return result;
    }
}
