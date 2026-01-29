package com.wizard.SpringBoot_Rest.controller;

import com.wizard.SpringBoot_Rest.model.JobPost;
import com.wizard.SpringBoot_Rest.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class JobRestController {

    @Autowired
    private JobService service;

    @GetMapping("/jobPosts")
    public List<JobPost> getalljobs(){
        return service.getAllJobs();
    }

    @GetMapping("/jobPost/{postID}")
    public JobPost getJob(@PathVariable("postID") int postID){
        return service.getJob(postID);
    }

    @GetMapping("/jobPost/keyword/{keyword}")
    public List<JobPost> srchBykeyword(@PathVariable("keyword") String keyword){
       return service.search(keyword);
    }

    @PostMapping("/jobPost")
    public JobPost addJob(@RequestBody JobPost jobPost){
        service.addJob(jobPost);
        return service.getJob(jobPost.getPostId());
    }

    @PutMapping("/jobPost")
    public JobPost updateJob(@RequestBody JobPost jobPost){
        Logger logger = LoggerFactory.getLogger(JobRestController.class);
        logger.info("Received update payload: {}", jobPost);
        service.updatejob(jobPost);
        return service.getJob(jobPost.getPostId());
    }

    @DeleteMapping("/jobPost/{postID}")
    public String deleteJob(@PathVariable("postID") int postID){
        service.deleteJob(postID);
        return "Deleted";
    }

    @GetMapping("/load")
    public String load(){
        service.load();
        return "succes";
    }

    @GetMapping("/jobPosts/keyword/{keyword}")
    public ResponseEntity<List<JobPost>> searchByKeyword(@PathVariable String keyword){
        return new ResponseEntity<>(service.searchByKeyword(keyword), HttpStatus.OK);
    }
}
