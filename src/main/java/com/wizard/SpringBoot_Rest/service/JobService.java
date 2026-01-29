package com.wizard.SpringBoot_Rest.service;

import com.wizard.SpringBoot_Rest.model.JobPost;
import com.wizard.SpringBoot_Rest.repo.JobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class JobService {

    @Autowired
    public JobRepo repo;


    // method to add a jobPost
    public void addJob(JobPost jobPost) {
        repo.addJob(jobPost);
    }


    //method to return all JobPosts
    public List<JobPost> getAllJobs() {
        return repo.getAllJobs();
    }


    public JobPost getJob(int postID) {
        return repo.getJob(postID);
    }

    public void updatejob(JobPost jobPost) {
        repo.updateJob(jobPost);
    }

    public void deleteJob(int postID){
        repo.deleteJob(postID);
    }

    public void load() {
        // No-op: static data is already loaded in JobRepo
    }

    public List<JobPost> search(String keyword) {
        return repo.findByKeyword(keyword);
    }

    public List<JobPost> searchByKeyword(String keyword) {
        return repo.findByKeyword(keyword.toLowerCase());
    }
}
